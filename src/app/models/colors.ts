export interface ColoredPoint {
  x: number;
  y: number;
  color: BrickLinkColor;
}

export interface BrickLinkColor {
  name: string;
  hex: string;
  id: number;
  selected: boolean;
}

export interface Bounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export const ALL_BRICKLINK_SOLID_COLORS: BrickLinkColor[] = [
  {
    name: 'White',
    hex: '#ffffff',
    id: 1,
    selected: true,
  },
  {
    name: 'Very Light Gray',
    hex: '#e8e8e8',
    id: 49,
    selected: false,
  },
  {
    name: 'Very Light Bluish Gray',
    hex: '#e4e8e8',
    id: 99,
    selected: false,
  },
  {
    name: 'Light Bluish Gray',
    hex: '#afb5c7',
    id: 86,
    selected: true,
  },
  {
    name: 'Light Gray',
    hex: '#9c9c9c',
    id: 9,
    selected: false,
  },
  {
    name: 'Dark Gray',
    hex: '#6b5a5a',
    id: 10,
    selected: false,
  },
  {
    name: 'Dark Bluish Gray',
    hex: '#595d60',
    id: 85,
    selected: true,
  },
  {
    name: 'Black',
    hex: '#212121',
    id: 11,
    selected: true,
  },
  {
    name: 'Dark Red',
    hex: '#6a0e15',
    id: 59,
    selected: false,
  },
  {
    name: 'Red',
    hex: '#b30006',
    id: 5,
    selected: true,
  },
  {
    name: 'Rust',
    hex: '#b52c20',
    id: 27,
    selected: false,
  },
  {
    name: 'Coral',
    hex: '#f88379',
    id: 220,
    selected: true,
  },
  {
    name: 'Salmon',
    hex: '#f45c40',
    id: 25,
    selected: false,
  },
  {
    name: 'Light Salmon',
    hex: '#ffdedc',
    id: 26,
    selected: false,
  },
  {
    name: 'Sand Red',
    hex: '#8c6b6b',
    id: 58,
    selected: false,
  },
  {
    name: 'Reddish Brown',
    hex: '#89351d',
    id: 88,
    selected: false,
  },
  {
    name: 'Brown',
    hex: '#532115',
    id: 8,
    selected: false,
  },
  {
    name: 'Dark Brown',
    hex: '#330000',
    id: 120,
    selected: false,
  },
  {
    name: 'Dark Tan',
    hex: '#907450',
    id: 69,
    selected: false,
  },
  {
    name: 'Tan',
    hex: '#dec69c',
    id: 2,
    selected: true,
  },
  {
    name: 'Light Nougat',
    hex: '#feccb0',
    id: 90,
    selected: false,
  },
  {
    name: 'Nougat',
    hex: '#ffaf7d',
    id: 28,
    selected: false,
  },
  {
    name: 'Medium Nougat',
    hex: '#e3a05b',
    id: 150,
    selected: false,
  },
  {
    name: 'Dark Nougat',
    hex: '#e78b3e',
    id: 225,
    selected: false,
  },
  {
    name: 'Medium Brown',
    hex: '#a16c42',
    id: 91,
    selected: false,
  },
  {
    name: 'Fabuland Brown',
    hex: '#b3694e',
    id: 106,
    selected: false,
  },
  {
    name: 'Fabuland Orange',
    hex: '#ef9121',
    id: 160,
    selected: false,
  },
  {
    name: 'Earth Orange',
    hex: '#e6881d',
    id: 29,
    selected: false,
  },
  {
    name: 'Dark Orange',
    hex: '#b35408',
    id: 68,
    selected: false,
  },
  {
    name: 'Neon Orange',
    hex: '#fa5947',
    id: 165,
    selected: false,
  },
  {
    name: 'Orange',
    hex: '#ff7e14',
    id: 4,
    selected: true,
  },
  {
    name: 'Medium Orange',
    hex: '#ffa531',
    id: 31,
    selected: false,
  },
  {
    name: 'Bright Light Orange',
    hex: '#f7ba30',
    id: 110,
    selected: false,
  },
  {
    name: 'Light Orange',
    hex: '#f7ad63',
    id: 32,
    selected: false,
  },
  {
    name: 'Very Light Orange',
    hex: '#e6c05d',
    id: 96,
    selected: false,
  },
  {
    name: 'Dark Yellow',
    hex: '#dd982e',
    id: 161,
    selected: false,
  },
  {
    name: 'Yellow',
    hex: '#f7d117',
    id: 3,
    selected: true,
  },
  {
    name: 'Bright Light Yellow',
    hex: '#f3e055',
    id: 103,
    selected: false,
  },
  {
    name: 'Light Yellow',
    hex: '#ffe383',
    id: 33,
    selected: false,
  },
  {
    name: 'Light Lime',
    hex: '#ebee8f',
    id: 35,
    selected: false,
  },
  {
    name: 'Yellowish Green',
    hex: '#dfeea5',
    id: 158,
    selected: false,
  },
  {
    name: 'Neon Green',
    hex: '#bcef66',
    id: 166,
    selected: false,
  },
  {
    name: 'Medium Lime',
    hex: '#bdc618',
    id: 76,
    selected: false,
  },
  {
    name: 'Lime',
    hex: '#a6ca55',
    id: 34,
    selected: false,
  },
  {
    name: 'Olive Green',
    hex: '#7c9051',
    id: 155,
    selected: false,
  },
  {
    name: 'Dark Green',
    hex: '#2e5543',
    id: 80,
    selected: false,
  },
  {
    name: 'Green',
    hex: '#00642e',
    id: 6,
    selected: true,
  },
  {
    name: 'Bright Green',
    hex: '#10cb31',
    id: 36,
    selected: false,
  },
  {
    name: 'Medium Green',
    hex: '#62f58e',
    id: 37,
    selected: false,
  },
  {
    name: 'Light Green',
    hex: '#a5dbb5',
    id: 38,
    selected: false,
  },
  {
    name: 'Sand Green',
    hex: '#76a290',
    id: 48,
    selected: false,
  },
  {
    name: 'Dark Turquoise',
    hex: '#008a80',
    id: 39,
    selected: false,
  },
  {
    name: 'Light Turquoise',
    hex: '#31b5ca',
    id: 40,
    selected: false,
  },
  {
    name: 'Aqua',
    hex: '#b5d3d6',
    id: 41,
    selected: false,
  },
  {
    name: 'Light Aqua',
    hex: '#ccffff',
    id: 152,
    selected: false,
  },
  {
    name: 'Dark Blue',
    hex: '#143044',
    id: 63,
    selected: false,
  },
  {
    name: 'Blue',
    hex: '#0057a6',
    id: 7,
    selected: true,
  },
  {
    name: 'Dark Azure',
    hex: '#3399ff',
    id: 153,
    selected: false,
  },
  {
    name: 'Medium Azure',
    hex: '#42c0fb',
    id: 156,
    selected: false,
  },
  {
    name: 'Medium Blue',
    hex: '#61afff',
    id: 42,
    selected: false,
  },
  {
    name: 'Maersk Blue',
    hex: '#6badd6',
    id: 72,
    selected: false,
  },
  {
    name: 'Bright Light Blue',
    hex: '#9fc3e9',
    id: 105,
    selected: false,
  },
  {
    name: 'Light Blue',
    hex: '#b4d2e3',
    id: 62,
    selected: false,
  },
  {
    name: 'Sky Blue',
    hex: '#7dbfdd',
    id: 87,
    selected: false,
  },
  {
    name: 'Sand Blue',
    hex: '#5a7184',
    id: 55,
    selected: false,
  },
  {
    name: 'Blue-Violet',
    hex: '#506cef',
    id: 97,
    selected: false,
  },
  {
    name: 'Dark Blue-Violet',
    hex: '#2032b0',
    id: 109,
    selected: false,
  },
  {
    name: 'Violet',
    hex: '#3448a4',
    id: 43,
    selected: false,
  },
  {
    name: 'Medium Violet',
    hex: '#9391e4',
    id: 73,
    selected: false,
  },
  {
    name: 'Light Violet',
    hex: '#c9cae2',
    id: 44,
    selected: false,
  },
  {
    name: 'Dark Purple',
    hex: '#5f2683',
    id: 89,
    selected: false,
  },
  {
    name: 'Purple',
    hex: '#a5499c',
    id: 24,
    selected: true,
  },
  {
    name: 'Light Purple',
    hex: '#da70d6',
    id: 93,
    selected: false,
  },
  {
    name: 'Medium Lavender',
    hex: '#885e9e',
    id: 157,
    selected: false,
  },
  {
    name: 'Clikits Lavender',
    hex: '#e0aad9',
    id: 227,
    selected: false,
  },
  {
    name: 'Lavender',
    hex: '#b18cbf',
    id: 154,
    selected: false,
  },
  {
    name: 'Sand Purple',
    hex: '#b57da5',
    id: 54,
    selected: false,
  },
  {
    name: 'Magenta',
    hex: '#b52952',
    id: 71,
    selected: false,
  },
  {
    name: 'Dark Pink',
    hex: '#c87080',
    id: 47,
    selected: false,
  },
  {
    name: 'Medium Dark Pink',
    hex: '#f785b1',
    id: 94,
    selected: false,
  },
  {
    name: 'Bright Pink',
    hex: '#ffbbff',
    id: 104,
    selected: false,
  },
  {
    name: 'Pink',
    hex: '#ffc0cb',
    id: 23,
    selected: false,
  },
  {
    name: 'Light Pink',
    hex: '#ffe1ff',
    id: 56,
    selected: false,
  },
  // add in some pearl colors to support specific sets,
  // but avoid the other pearl colors for now since they
  // may weirdly replace similar solid non pearl
  {
    name: 'Pearl Gold',
    hex: '#e79500',
    id: 115,
    selected: false,
  },
  {
    name: 'Pearl Dark Gray',
    hex: '#666660',
    id: 77,
    selected: false,
  },
  {
    name: 'Flat Silver',
    hex: '#898788',
    id: 95,
    selected: false,
  },
];
