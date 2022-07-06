import { BrickLinkColor, ColoredPoint } from './colors';

export interface DimensionOption {
  dimensions: [number, number];
  label: string;
}

export interface MosaicFlowType
  extends Array<number[] | string | BrickLinkColor[] | ColoredPoint[]> {
  0: [number, number];
  1: string;
  2: BrickLinkColor[];
  3: ColoredPoint[];
}
