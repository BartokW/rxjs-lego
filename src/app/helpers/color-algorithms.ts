import { BrickLinkColor } from '../models/colors';
import { hexToRgb, rgbToHex } from './utility';

export function getClosestColor(
  colors: BrickLinkColor[],
  red: number,
  green: number,
  blue: number
): BrickLinkColor {
  let distance = 99999999;
  let legoColor: BrickLinkColor;
  colors.forEach((element) => {
    if (element != null) {
      let existingHex = rgbToHex(red, green, blue);
      const newDistance = rgbDistance(
        { hex: existingHex, id: 0, name: 'Unknown', selected: false },
        element
      );

      if (newDistance < distance) {
        distance = newDistance;
        legoColor = element;
      }
    }
  });

  return legoColor;
}

export function rgbDistance(
  color1: BrickLinkColor,
  color2: BrickLinkColor
): number {
  let [r1, g1, b1] = hexToRgb(color1.hex);
  let [r2, g2, b2] = hexToRgb(color2.hex);
  return Math.sqrt(
    Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2)
  );
}
