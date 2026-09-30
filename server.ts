import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config({ override: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Obsolete or deprecated models that are no longer available
const DEPRECATED_OR_DISCONTINUED_MODELS = new Set([
  'gemini-1.5-flash',
  'gemini-1.5-pro',
  'gemini-2.0-flash',
  'gemini-2.0-pro',
  'gemini-2.0-flash-thinking',
  'gemini-2.5-flash',
  'gemini-2.5-flash-preview',
  'gemini-pro',
]);

function resolveWorkingModel(model?: string): string {
  if (!model || DEPRECATED_OR_DISCONTINUED_MODELS.has(model.trim())) {
    return 'gemini-3.1-flash-lite';
  }
  return model.trim();
}

// Centralized model configuration
const CONFIGURED_MODEL = resolveWorkingModel(process.env.GEMINI_MODEL);

// Ordered candidate models for high resilience in case of transient spikes
const CANDIDATE_MODELS = Array.from(
  new Set([CONFIGURED_MODEL, 'gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-3.7-flash'])
);

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3005', 10);

  app.use(express.json({ limit: '15mb' }));

  let cachedStatus: { timestamp: number; data: any } | null = null;
  const STATUS_CACHE_TTL = 30000;

  // Status & developer diagnostic endpoint (never exposes API key)
  app.get('/api/gemini/status', async (req, res) => {
    const force = req.query.force === 'true';
    if (!force && cachedStatus && Date.now() - cachedStatus.timestamp < STATUS_CACHE_TTL) {
      res.json(cachedStatus.data);
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      const data = {
        connected: false,
        model: CONFIGURED_MODEL,
        backend: 'Connected',
        rag: 'Active',
        fallback: 'Available',
        message: 'No valid GEMINI_API_KEY detected. Fallback mode is active.',
      };
      cachedStatus = { timestamp: Date.now(), data };
      res.json(data);
      return;
    }

    try {
      // Test lightweight connectivity with fast candidate model
      await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: 'ping',
      });
      const data = {
        connected: true,
        model: CONFIGURED_MODEL,
        backend: 'Connected',
        rag: 'Active',
        fallback: 'Available',
        message: 'Gemini API connected and ready.',
      };
      cachedStatus = { timestamp: Date.now(), data };
      res.json(data);
    } catch (err: unknown) {
      // Try secondary candidate before declaring failed
      try {
        await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: 'ping',
        });
        const data = {
          connected: true,
          model: 'gemini-3.8-flash',
          backend: 'Connected',
          rag: 'Active',
          fallback: 'Available',
          message: 'Gemini API connected via secondary candidate model.',
        };
        cachedStatus = { timestamp: Date.now(), data };
        res.json(data);
      } catch (secondaryErr: unknown) {
        const errorMsg =
          secondaryErr instanceof Error
            ? secondaryErr.message
            : err instanceof Error
            ? err.message
            : 'Service unavailable';
        const data = {
          connected: false,
          model: CONFIGURED_MODEL,
          backend: 'Connected',
          rag: 'Active',
          fallback: 'Available',
          message: `Gemini unavailable (${errorMsg}). Fallback mode ready.`,
        };
        cachedStatus = { timestamp: Date.now(), data };
        res.json(data);
      }
    }
  });

  // Health endpoint
  app.get('/api/health', (_req, res) => {
    const hasKey = Boolean(
      process.env.GEMINI_API_KEY &&
        process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY' &&
        process.env.GEMINI_API_KEY.trim() !== ''
    );
    res.json({
      status: 'ok',
      service: 'KisanSaarthi AI Decision-Support Engine',
      geminiConfigured: hasKey,
      model: CONFIGURED_MODEL,
    });
  });

  // Multimodal Agricultural RAG + Decision-Support Endpoint
  app.post('/api/gemini/analyze', async (req, res) => {
    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({
        error: 'Gemini temporarily unavailable — showing grounded fallback guidance.',
        isFallback: true,
      });
      return;
    }

    const {
      question,
      profile,
      weather,
      soil,
      retrievedChunks,
      imageBase64,
      language,
      languageName,
    } = req.body;

    const ragContextString = Array.isArray(retrievedChunks)
      ? retrievedChunks
          .map(
            (
              c: {
                id: string;
                title: string;
                sourceOrg: string;
                advisoryContent: string;
                regenerativePractice: string;
              },
              idx: number
            ) =>
              `[Source ${idx + 1}: ${c.id} - ${c.title} (${c.sourceOrg})]\nAdvisory: ${
                c.advisoryContent
              }\nRegenerative Practice: ${c.regenerativePractice}`
          )
          .join('\n\n')
      : 'Standard ICAR Integrated Pest & Nutrient Management guidelines.';

    const languageInstruction =
      language === 'hi'
        ? 'CRITICAL LANGUAGE INSTRUCTION: The farmer speaks Hindi (हिन्दी). Respond in simple Hindi suitable for an Indian farmer. Avoid unnecessary technical terminology. You MUST write ALL response text fields (issue, observations, why, immediateActions, preventiveActions, weatherConsideration, regenerativeRecommendation, followUp, actionPlan tasks, and localizedSummary.selectedLangText) in clear, natural, farmer-friendly Hindi.'
        : language === 'ta'
        ? 'CRITICAL LANGUAGE INSTRUCTION: The farmer speaks Tamil (தமிழ்). Respond in simple Tamil suitable for an Indian farmer. Avoid unnecessary technical terminology. You MUST write ALL response text fields (issue, observations, why, immediateActions, preventiveActions, weatherConsideration, regenerativeRecommendation, followUp, actionPlan tasks, and localizedSummary.selectedLangText) in clear, natural, farmer-friendly Tamil.'
        : language === 'te'
        ? 'CRITICAL LANGUAGE INSTRUCTION: The farmer speaks Telugu (తెలుగు). Respond in simple Telugu suitable for an Indian farmer. Avoid unnecessary technical terminology. You MUST write ALL response text fields in clear, natural, farmer-friendly Telugu.'
        : language === 'kn'
        ? 'CRITICAL LANGUAGE INSTRUCTION: The farmer speaks Kannada (ಕನ್ನಡ). Respond in simple Kannada suitable for an Indian farmer. Avoid unnecessary technical terminology. You MUST write ALL response text fields in clear, natural, farmer-friendly Kannada.'
        : language === 'mr'
        ? 'CRITICAL LANGUAGE INSTRUCTION: The farmer speaks Marathi (मराठी). Respond in simple Marathi suitable for an Indian farmer. Avoid unnecessary technical terminology. You MUST write ALL response text fields in clear, natural, farmer-friendly Marathi.'
        : language === 'bn'
        ? 'CRITICAL LANGUAGE INSTRUCTION: The farmer speaks Bengali (বাংলা). Respond in simple Bengali suitable for an Indian farmer. Avoid unnecessary technical terminology. You MUST write ALL response text fields in clear, natural, farmer-friendly Bengali.'
        : 'Language target: English. Respond in clear, simple English suitable for an Indian farmer.';

    const systemPrompt = `You are KisanSaarthi AI, a trusted agricultural decision-support engine for Indian farmers.
Answer: "What should this farmer do NOW, and WHY?" by combining:
1. Farmer Profile & Location (${profile?.village || ''}, ${profile?.district || 'Vellore'}, ${profile?.state || 'Tamil Nadu'})
2. Weather Telemetry (Temp: ${weather?.temperature}°C, Rain Prob: ${weather?.rainProbability}%, Humidity: ${weather?.humidity}%)
3. Soil Context (Type: ${soil?.soilType}, pH: ${soil?.ph}, SOC: ${soil?.organicCarbon}%, Moisture: ${soil?.moisture}%)
4. Retrieved ICAR/TNAU/NMSA Agricultural Knowledge (RAG)
5. Crop Leaf Image Specimen (if attached)

SAFETY & ACCURACY RULES:
- Frame findings as advisory indications, never absolute clinical guarantees.
- Always provide immediate actions, preventive actions, weather considerations, and regenerative practices.
- ${languageInstruction}
- In localizedSummary, provide summaries in en, hi, ta, and selectedLangText.`;

    const userPrompt = `FARMER QUESTION: "${question || 'What should I do now for my crop?'}"
TARGET LANGUAGE: ${languageName || 'English'} (code: ${language || 'en'})

FARM PROFILE:
- Farmer: ${profile?.name || 'Farmer'}
- Location: ${profile?.village || ''}, ${profile?.district || 'Vellore'}, ${profile?.state || 'Tamil Nadu'}
- Crop: ${profile?.crop || 'Tomato'} (Variety: ${profile?.variety || 'Standard'}, Sown: ${profile?.sowingDate || 'Recent'})
- Farm Size: ${profile?.farmSize || 2} acres
- Irrigation: ${profile?.irrigationType || 'Drip'}

WEATHER TELEMETRY (${weather?.source || 'DEMO'}):
- Temperature: ${weather?.temperature}°C
- 24h Rain Probability: ${weather?.rainProbability}%
- Relative Humidity: ${weather?.humidity}%
- Wind: ${weather?.windSpeed} km/h
- Agro-Implication: ${weather?.farmingImplication}

SOIL PARAMETERS:
- Texture: ${soil?.soilType}, pH: ${soil?.ph}
- N-P-K: ${soil?.nitrogen}-${soil?.phosphorus}-${soil?.potassium} kg/ha
- Organic Carbon: ${soil?.organicCarbon}%, Moisture: ${soil?.moisture}%

RETRIEVED RAG KNOWLEDGE CHUNKS:
${ragContextString}

Provide structured agricultural guidance matching the exact JSON schema.`;

    const parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [];

    if (imageBase64 && typeof imageBase64 === 'string') {
      const cleanedBase64 = imageBase64.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, '');
      const mimeMatch = imageBase64.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,/);
      const mimeType = mimeMatch ? mimeMatch[1] : 'image/png';
      parts.push({
        inlineData: {
          mimeType,
          data: cleanedBase64,
        },
      });
    }

    parts.push({ text: userPrompt });

    // Attempt generation across candidate models in priority order
    let lastError: unknown = null;
    for (const modelToTry of CANDIDATE_MODELS) {
      try {
        const response = await ai.models.generateContent({
          model: modelToTry,
          contents: { parts },
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                cropDetected: { type: Type.STRING },
                issue: { type: Type.STRING },
                confidence: { type: Type.INTEGER },
                riskLevel: { type: Type.STRING },
                observations: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                why: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                immediateActions: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                preventiveActions: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                weatherConsideration: { type: Type.STRING },
                regenerativeRecommendation: { type: Type.STRING },
                followUp: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                sources: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                actionPlan: {
                  type: Type.OBJECT,
                  properties: {
                    today: { type: Type.ARRAY, items: { type: Type.STRING } },
                    thisWeek: { type: Type.ARRAY, items: { type: Type.STRING } },
                    nextTwoWeeks: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                  required: ['today', 'thisWeek', 'nextTwoWeeks'],
                },
                localizedSummary: {
                  type: Type.OBJECT,
                  properties: {
                    en: { type: Type.STRING },
                    hi: { type: Type.STRING },
                    ta: { type: Type.STRING },
                    selectedLangText: { type: Type.STRING },
                  },
                  required: ['en', 'hi', 'ta', 'selectedLangText'],
                },
              },
              required: [
                'issue',
                'confidence',
                'riskLevel',
                'observations',
                'why',
                'immediateActions',
                'preventiveActions',
                'weatherConsideration',
                'regenerativeRecommendation',
                'followUp',
                'sources',
              ],
            },
          },
        });

        const rawText = response.text;
        if (!rawText) {
          throw new Error('Empty response from model');
        }

        const parsed = JSON.parse(rawText.trim());
        res.json({
          ...parsed,
          modelUsed: modelToTry,
          isFallback: false,
        });
        return;
      } catch (err: unknown) {
        lastError = err;
        console.warn(`Model ${modelToTry} attempt failed, trying next candidate:`, err instanceof Error ? err.message : err);
      }
    }

    console.error('All Gemini model candidates exhausted:', lastError);
    res.status(503).json({
      error: 'Gemini temporarily unavailable — showing grounded fallback guidance.',
      details: lastError instanceof Error ? lastError.message : 'Service unavailable',
      isFallback: true,
    });
  });

  // Text-to-Speech Endpoint
  app.post('/api/gemini/tts', async (req, res) => {
    try {
      const ai = getGeminiClient();
      if (!ai) {
        res.status(503).json({ error: 'TTS fallback to browser speechSynthesis' });
        return;
      }

      const { text } = req.body;
      if (!text || typeof text !== 'string') {
        res.status(400).json({ error: 'Missing text for TTS' });
        return;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash-lite-tts',
        contents: [
          {
            role: 'user',
            parts: [{ text: text.slice(0, 450) }],
          },
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio =
        response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) {
        throw new Error('No audio data returned');
      }

      res.json({ audioBase64: base64Audio });
    } catch (error) {
      res.status(503).json({
        error: error instanceof Error ? error.message : 'TTS unavailable',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`KisanSaarthi AI server listening on http://localhost:${PORT} (Primary Model: ${CONFIGURED_MODEL})`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      const fallbackPort = PORT + 1;
      console.log(`Port ${PORT} is busy, retrying on http://localhost:${fallbackPort}...`);
      app.listen(fallbackPort, '0.0.0.0', () => {
        console.log(`KisanSaarthi AI server listening on http://localhost:${fallbackPort} (Primary Model: ${CONFIGURED_MODEL})`);
      });
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer();
