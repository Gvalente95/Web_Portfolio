import type { Blob, Point } from "./type";

function fieldValue(x: number, y: number, blobs: Blob[], time: number) {
  let value = 0;

  for (const b of blobs) {
    const bx = b.x + Math.sin(time * b.speed + b.phase) * b.range;
    const by = b.y + Math.cos(time * b.speed + b.phase) * b.range;

    const dx = x - bx;
    const dy = y - by;
    const d2 = dx * dx + dy * dy;

    value += (b.r * b.r) / Math.max(d2, 1);
  }

  return value;
}

function interp(a: Point, b: Point, va: number, vb: number, threshold: number): Point {
  const t = (threshold - va) / (vb - va || 0.0001);

  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
  };
}

// export function marchingSquaresPath(width: number, height: number, blobs: Blob[], time: number) {
//   const cell = 32;
//   const threshold = 1;
//   let d = "";

//   for (let y = 0; y < height; y += cell) {
//     for (let x = 0; x < width; x += cell) {
//       const p0 = { x, y };
//       const p1 = { x: x + cell, y };
//       const p2 = { x: x + cell, y: y + cell };
//       const p3 = { x, y: y + cell };

//       const v0 = fieldValue(p0.x, p0.y, blobs, time);
//       const v1 = fieldValue(p1.x, p1.y, blobs, time);
//       const v2 = fieldValue(p2.x, p2.y, blobs, time);
//       const v3 = fieldValue(p3.x, p3.y, blobs, time);

//       const points: Point[] = [];

//       if (v0 >= threshold !== v1 >= threshold) points.push(interp(p0, p1, v0, v1, threshold));
//       if (v1 >= threshold !== v2 >= threshold) points.push(interp(p1, p2, v1, v2, threshold));
//       if (v2 >= threshold !== v3 >= threshold) points.push(interp(p2, p3, v2, v3, threshold));
//       if (v3 >= threshold !== v0 >= threshold) points.push(interp(p3, p0, v3, v0, threshold));

//       if (points.length === 2) {
//         d += `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} `;
//       } else if (points.length === 4) {
//         d += `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} `;
//         d += `M ${points[2].x} ${points[2].y} L ${points[3].x} ${points[3].y} `;
//       }
//     }
//   }

//   return d;
// }

export function marchingSquaresPath(width: number, height: number, blobs: Blob[], time: number, scrollY: number) {
  const cell = 32;
  const threshold = 1;
  const margin = 400;

  const viewTop = Math.max(0, scrollY - margin);
  const viewBottom = Math.min(height, scrollY + window.innerHeight + margin);

  let d = "";

  for (let y = viewTop; y < viewBottom; y += cell) {
    for (let x = 0; x < width; x += cell) {
      const p0 = { x, y };
      const p1 = { x: x + cell, y };
      const p2 = { x: x + cell, y: y + cell };
      const p3 = { x, y: y + cell };

      const v0 = fieldValue(p0.x, p0.y, blobs, time);
      const v1 = fieldValue(p1.x, p1.y, blobs, time);
      const v2 = fieldValue(p2.x, p2.y, blobs, time);
      const v3 = fieldValue(p3.x, p3.y, blobs, time);

      const points: Point[] = [];

      if (v0 >= threshold !== v1 >= threshold) points.push(interp(p0, p1, v0, v1, threshold));
      if (v1 >= threshold !== v2 >= threshold) points.push(interp(p1, p2, v1, v2, threshold));
      if (v2 >= threshold !== v3 >= threshold) points.push(interp(p2, p3, v2, v3, threshold));
      if (v3 >= threshold !== v0 >= threshold) points.push(interp(p3, p0, v3, v0, threshold));

      if (points.length === 2) {
        d += `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} `;
      } else if (points.length === 4) {
        d += `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} `;
        d += `M ${points[2].x} ${points[2].y} L ${points[3].x} ${points[3].y} `;
      }
    }
  }

  return d;
}
