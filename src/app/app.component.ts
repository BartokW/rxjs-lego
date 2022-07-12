import { Component } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { BehaviorSubject, combineLatest, fromEvent, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Image } from 'image-js';
import { DimensionOption } from './models/dimension-option';
import {
  ALL_BRICKLINK_SOLID_COLORS,
  BrickLinkColor,
  ColoredPoint,
} from './models/colors';
import { getClosestColor } from './helpers/color-algorithms';
import { hexToRgb } from './helpers/utility';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  startingImage =
    'https://raw.githubusercontent.com/BartokW/rxjs-lego/main/src/assets/angular.png';
  // startingImage =
  //   'https://raw.githubusercontent.com/BartokW/rxjs-lego/main/src/assets/lego.svg';

  selectedDimension: DimensionOption;
  allDimensionOptions: DimensionOption[] = [
    { dimensions: [32, 32], label: '32 x 32' },
    { dimensions: [48, 48], label: '48 x 48' },
    { dimensions: [64, 32], label: '64 x 32' },
    { dimensions: [32, 64], label: '32 x 64' },
    { dimensions: [64, 64], label: '64 x 64' },
  ];
  allColors: BrickLinkColor[] = ALL_BRICKLINK_SOLID_COLORS;

  croppedImageDataSubject$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  selectedColorsSubject$: BehaviorSubject<BrickLinkColor[]>;
  placeholderPoints$: BehaviorSubject<ColoredPoint[]> = new BehaviorSubject<
    ColoredPoint[]
  >([]);

  resizedImageDataURL$: Observable<string>;
  mosaicImageDataURL$: Observable<string>;
  mosaicPoints$: Observable<ColoredPoint[]>;
  mosaicWidth: number = 500;
  mosaicHeight$: Observable<number>;
  isTile = false;
  isRound = false;
  backgroundColor: BrickLinkColor = {
    name: 'Light Bluish Gray',
    hex: '#afb5c7',
    id: 86,
    selected: false,
  };

  targetDimensions$: BehaviorSubject<[number, number]> = new BehaviorSubject<
    [number, number]
  >([32, 32]);

  ratio$: Observable<number>;

  constructor() {
    this.selectedDimension = this.allDimensionOptions[0];
    this.selectedColorsSubject$ = new BehaviorSubject<BrickLinkColor[]>(
      this.allColors.filter((x) => x.selected)
    );
    this.ratio$ = this.targetDimensions$.pipe(
      map(([x, y]: [number, number]) => {
        return x / y;
      })
    );

    this.mosaicHeight$ = this.targetDimensions$.pipe(
      map(([x, y]: [number, number]) => {
        return (this.mosaicWidth * y) / x;
      })
    );

    //Step 1 Resize cropped image
    this.resizedImageDataURL$ = combineLatest([
      this.targetDimensions$,
      this.croppedImageDataSubject$,
    ]).pipe(this.resizeImage());

    //Step 2 Do colour replacement
    let mosaicData$ = combineLatest([
      this.resizedImageDataURL$,
      this.selectedColorsSubject$,
    ]).pipe(this.replaceColours());

    // Extract the Color Replaced Image
    this.mosaicImageDataURL$ = mosaicData$.pipe(
      map(([image, points]: [string, ColoredPoint[]]) => {
        return image;
      })
    );

    // Extract the Coloured points for generating the mosaic image
    this.mosaicPoints$ = mosaicData$.pipe(
      map(([image, points]: [string, ColoredPoint[]]) => {
        return points;
      })
    );
  }

  dimensionsChanged(val: DimensionOption) {
    this.targetDimensions$.next(val.dimensions);
  }

  colorsChanged() {
    this.selectedColorsSubject$.next(this.allColors.filter((x) => x.selected));
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImageDataSubject$.next(event.base64);
  }

  resizeImage() {
    return function (
      source: Observable<[[number, number], string]>
    ): Observable<string> {
      return source.pipe(
        switchMap(async ([dimensions, image]: [[number, number], string]) => {
          let newImage: string = '';
          if (image.length > 0) {
            const cImage = await Image.load(image);
            const resized = cImage.resize({
              width: dimensions[0],
            });
            newImage = resized.toDataURL();
          }
          return newImage;
        })
      );
    };
  }

  replaceColours() {
    return function <T>(
      source: Observable<[string, BrickLinkColor[]]>
    ): Observable<[string, ColoredPoint[]]> {
      return source.pipe(
        switchMap(async ([image, colors]: [string, BrickLinkColor[]]) => {
          const points: ColoredPoint[] = [];
          let newImage: string = '';
          if (image.length > 0) {
            const cImage = await Image.load(image);
            for (let y = 0; y < cImage.height; y++) {
              for (let x = 0; x < cImage.width; x++) {
                const color = cImage.getPixelXY(x, y);
                const newColor = getClosestColor(
                  colors,
                  color[0],
                  color[1],
                  color[2]
                );

                points.push({ x, y, color: newColor });
                let [r, g, b] = hexToRgb(newColor.hex);
                cImage.setPixelXY(x, y, [r, g, b, 255]);
              }
            }

            newImage = cImage.toDataURL();
          }
          return [newImage, points] as [string, ColoredPoint[]];
        })
      );
    };
  }
}
