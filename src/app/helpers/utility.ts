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
