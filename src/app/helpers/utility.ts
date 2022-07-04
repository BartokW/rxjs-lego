import { ColoredPoint, Bounds } from '../models/colors';

export function hexToRgb(hex) {
  const hexInt = parseInt(hex.replace('#', ''), 16);
  const r = (hexInt >> 16) & 255;
  const g = (hexInt >> 8) & 255;
  const b = hexInt & 255;

  return [r, g, b];
}

export function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function createLinearScale(
  range: [number, number],
  domain: [number, number]
) {
  const [minRange, maxRange] = range;
  const [minDomain, maxDomain] = domain;
  const sizeOfRange = maxRange - minRange;
  const sizeOfDomain = maxDomain - minDomain;

  return (value: number) => {
    const positionInRange = (value - minRange) / sizeOfRange;

    return positionInRange * sizeOfDomain + minDomain;
  };
}

export function getBounds(points: ColoredPoint[]): Bounds {
  return points.reduce(
    (bounds, { x, y }) => {
      return {
        minX: Math.min(x, bounds.minX),
        minY: Math.min(y, bounds.minY),
        maxX: Math.max(x, bounds.maxX),
        maxY: Math.max(y, bounds.maxY),
      };
    },
    {
      minX: Infinity,
      minY: Infinity,
      maxX: -Infinity,
      maxY: -Infinity,
    } as Bounds
  );
}
