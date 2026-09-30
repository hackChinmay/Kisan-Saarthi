export type DemoSpecimenType = 'tomato-early-blight' | 'rice-leaf-blast' | 'tomato-healthy';

export interface GeneratedSpecimen {
  id: DemoSpecimenType;
  title: string;
  crop: 'Tomato' | 'Rice';
  subtitle: string;
  dataUrl: string;
  defaultQuestion: string;
}

export function generateBotanicalLeafSpecimen(type: DemoSpecimenType): GeneratedSpecimen {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 480;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return {
      id: type,
      title: 'Tomato Leaf Specimen',
      crop: 'Tomato',
      subtitle: 'Botanical diagnostic reference',
      dataUrl: '',
      defaultQuestion: 'My tomato leaves are developing brown spots. What should I do?',
    };
  }

  // Soil / Field blurred background
  const bgGrad = ctx.createLinearGradient(0, 0, 640, 480);
  bgGrad.addColorStop(0, '#29231E');
  bgGrad.addColorStop(0.5, '#383028');
  bgGrad.addColorStop(1, '#1F2921');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 640, 480);

  // Subtle organic mulch texture strokes in background
  ctx.strokeStyle = 'rgba(194, 168, 120, 0.14)';
  ctx.lineWidth = 3;
  for (let i = 0; i < 38; i++) {
    ctx.beginPath();
    const x = (i * 73) % 640;
    const y = (i * 59) % 480;
    ctx.moveTo(x, y);
    ctx.lineTo(x + 45 - (i % 30), y + 18 + (i % 25));
    ctx.stroke();
  }

  if (type === 'tomato-early-blight' || type === 'tomato-healthy') {
    ctx.save();
    ctx.translate(320, 245);
    ctx.rotate(-0.12);

    const leafGrad = ctx.createRadialGradient(-20, -20, 20, 0, 0, 220);
    leafGrad.addColorStop(0, '#3B7A3E');
    leafGrad.addColorStop(0.7, '#2D6330');
    leafGrad.addColorStop(1, type === 'tomato-early-blight' ? '#5E5B27' : '#224F25');

    ctx.fillStyle = leafGrad;
    ctx.beginPath();
    ctx.moveTo(-210, 10);
    ctx.bezierCurveTo(-160, -95, -60, -145, 40, -125);
    ctx.bezierCurveTo(130, -110, 195, -50, 225, 0);
    ctx.bezierCurveTo(190, 60, 125, 115, 35, 130);
    ctx.bezierCurveTo(-65, 140, -160, 95, -210, 10);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#1E4620';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.strokeStyle = '#659B5E';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(-205, 10);
    ctx.quadraticCurveTo(0, -4, 218, 0);
    ctx.stroke();

    ctx.lineWidth = 1.8;
    const veinOffsets = [-130, -75, -20, 35, 90, 140];
    veinOffsets.forEach((vx, idx) => {
      ctx.beginPath();
      ctx.moveTo(vx, 0);
      ctx.quadraticCurveTo(vx + 25, -45, vx + 55, -88 + idx * 5);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(vx + 10, 2);
      ctx.quadraticCurveTo(vx + 30, 45, vx + 55, 88 - idx * 5);
      ctx.stroke();
    });

    if (type === 'tomato-early-blight') {
      const lesions = [
        { x: -65, y: -42, r: 28 },
        { x: 45, y: 38, r: 34 },
        { x: 115, y: -28, r: 24 },
        { x: -15, y: 58, r: 21 },
        { x: 155, y: 22, r: 19 },
        { x: -125, y: 28, r: 22 },
      ];

      lesions.forEach((lesion) => {
        const haloGrad = ctx.createRadialGradient(
          lesion.x,
          lesion.y,
          lesion.r * 0.3,
          lesion.x,
          lesion.y,
          lesion.r * 1.65
        );
        haloGrad.addColorStop(0, 'rgba(217, 182, 48, 0.92)');
        haloGrad.addColorStop(0.6, 'rgba(196, 164, 45, 0.55)');
        haloGrad.addColorStop(1, 'rgba(59, 122, 62, 0)');
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(lesion.x, lesion.y, lesion.r * 1.65, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#4A2C18';
        ctx.beginPath();
        ctx.ellipse(lesion.x, lesion.y, lesion.r, lesion.r * 0.84, 0.25, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#2A160B';
        ctx.lineWidth = 1.6;
        [0.75, 0.5, 0.28].forEach((scale) => {
          ctx.beginPath();
          ctx.ellipse(
            lesion.x,
            lesion.y,
            lesion.r * scale,
            lesion.r * 0.84 * scale,
            0.25,
            0,
            Math.PI * 2
          );
          ctx.stroke();
        });
      });
    }

    ctx.restore();
  } else {
    ctx.save();
    ctx.translate(320, 240);
    ctx.rotate(-0.22);

    const bladeGrad = ctx.createLinearGradient(-280, 0, 280, 0);
    bladeGrad.addColorStop(0, '#3A7D32');
    bladeGrad.addColorStop(0.5, '#4A8E3B');
    bladeGrad.addColorStop(1, '#6C8432');

    ctx.fillStyle = bladeGrad;
    ctx.beginPath();
    ctx.moveTo(-280, 0);
    ctx.quadraticCurveTo(0, -68, 285, -4);
    ctx.quadraticCurveTo(0, 68, -280, 0);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(162, 210, 138, 0.55)';
    ctx.lineWidth = 1.5;
    [-22, -11, 0, 11, 22].forEach((vy) => {
      ctx.beginPath();
      ctx.moveTo(-260, vy * 0.3);
      ctx.quadraticCurveTo(0, vy, 265, vy * 0.2);
      ctx.stroke();
    });

    const spindles = [
      { x: -95, y: -8, w: 42, h: 14 },
      { x: 15, y: 12, w: 50, h: 16 },
      { x: 115, y: -6, w: 38, h: 13 },
      { x: -20, y: -18, w: 32, h: 11 },
    ];

    spindles.forEach((sp) => {
      ctx.fillStyle = '#6E2C14';
      ctx.beginPath();
      ctx.moveTo(sp.x - sp.w, sp.y);
      ctx.quadraticCurveTo(sp.x, sp.y - sp.h * 1.4, sp.x + sp.w, sp.y);
      ctx.quadraticCurveTo(sp.x, sp.y + sp.h * 1.4, sp.x - sp.w, sp.y);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#D4CFC7';
      ctx.beginPath();
      ctx.moveTo(sp.x - sp.w * 0.58, sp.y);
      ctx.quadraticCurveTo(sp.x, sp.y - sp.h * 0.75, sp.x + sp.w * 0.58, sp.y);
      ctx.quadraticCurveTo(sp.x, sp.y + sp.h * 0.75, sp.x - sp.w * 0.58, sp.y);
      ctx.closePath();
      ctx.fill();
    });

    ctx.restore();
  }

  ctx.fillStyle = 'rgba(17, 28, 20, 0.82)';
  ctx.fillRect(0, 434, 640, 46);
  ctx.fillStyle = '#E2E8F0';
  ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';

  if (type === 'tomato-early-blight') {
    ctx.fillText(
      'SPECIMEN: Solanum lycopersicum (Tomato) · Concentric brown target lesions + yellow halo',
      16,
      461
    );
    return {
      id: type,
      title: 'Tomato Leaf — Brown Spots (Early Blight Demo)',
      crop: 'Tomato',
      subtitle: 'Concentric target lesions with yellow chlorotic halo',
      dataUrl: canvas.toDataURL('image/png'),
      defaultQuestion: 'My tomato leaves are developing brown spots. What should I do?',
    };
  } else if (type === 'rice-leaf-blast') {
    ctx.fillText(
      'SPECIMEN: Oryza sativa (Rice) · Spindle-shaped lesions with grayish centers',
      16,
      461
    );
    return {
      id: type,
      title: 'Rice Leaf — Spindle Lesions (Leaf Blast Demo)',
      crop: 'Rice',
      subtitle: 'Diamond-shaped lesions with gray centers & brown margins',
      dataUrl: canvas.toDataURL('image/png'),
      defaultQuestion: 'My paddy leaves have spindle-shaped brown spots with gray centers. What should I do now?',
    };
  } else {
    ctx.fillText(
      'SPECIMEN: Solanum lycopersicum (Tomato) · Healthy turgid green leaflet canopy',
      16,
      461
    );
    return {
      id: type,
      title: 'Tomato Leaf — Healthy Canopy Check',
      crop: 'Tomato',
      subtitle: 'No foliar necrosis · Preventive & regenerative planning',
      dataUrl: canvas.toDataURL('image/png'),
      defaultQuestion: 'What should I do this week to maintain crop health and improve water efficiency?',
    };
  }
}
