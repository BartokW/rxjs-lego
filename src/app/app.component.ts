import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { BehaviorSubject, combineLatest, fromEvent, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Image } from 'image-js';
import { DimensionOption } from './models/dimension-option';
import {
  ALL_BRICKLINK_SOLID_COLORS,
  BricklinkColor,
  ColoredPoint,
} from './models/colors';
import { getClosestColor } from './helpers/color-algorthims';
import { hexToRgb } from './helpers/utility';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  startingImage =
    'https://raw.githubusercontent.com/BartokW/rxjs-lego/main/src/assets/angular.png';

  selectedDimension: DimensionOption;
  allDimensionOptions: DimensionOption[] = [
    { dimensions: [32, 32], label: '32 x 32' },
    { dimensions: [48, 48], label: '48 x 48' },
    { dimensions: [96, 48], label: '96 x 48' },
    { dimensions: [48, 96], label: '48 x 96' },
    { dimensions: [96, 96], label: '96 x 96' },
  ];
  allColors: BricklinkColor[] = ALL_BRICKLINK_SOLID_COLORS;

  croppedImageDataSubject$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  selectedColorsSubject$: BehaviorSubject<BricklinkColor[]>;

  resizedImageDataURL: string;
  mosaicImageDataURL$: Observable<string>;

  targetDimensions$: BehaviorSubject<[number, number]> = new BehaviorSubject<
    [number, number]
  >([32, 32]);

  ratio$: Observable<number>;

  constructor() {
    this.selectedDimension = this.allDimensionOptions[0];
    this.selectedColorsSubject$ = new BehaviorSubject<BricklinkColor[]>(
      this.allColors.filter((x) => x.selected)
    );
    this.ratio$ = this.targetDimensions$.pipe(
      map(([x, y]: [number, number]) => {
        return x / y;
      })
    );

    this.mosaicImageDataURL$ = combineLatest([
      this.targetDimensions$,
      this.croppedImageDataSubject$,
      this.selectedColorsSubject$,
    ]).pipe(
      this.resizeImage(),
      this.outputResized(),

      this.replaceColours(),
      map(
        ([dimensions, image, colors]: [
          [number, number],
          string,
          BricklinkColor[]
        ]) => {
          return image;
        }
      )
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
    return function <T>(
      source: Observable<[[number, number], string, BricklinkColor[]]>
    ): Observable<[[number, number], string, BricklinkColor[]]> {
      return source.pipe(
        switchMap(
          async ([dimensions, image, colors]: [
            [number, number],
            string,
            BricklinkColor[]
          ]) => {
            let newImage: string = '';
            if (image.length > 0) {
              const cImage = await Image.load(image);
              const resized = cImage.resize({
                width: dimensions[0],
              });
              newImage = resized.toDataURL();
            }
            return [dimensions, newImage, colors] as [
              [number, number],
              string,
              BricklinkColor[]
            ];
          }
        )
      );
    };
  }

  replaceColours() {
    return function <T>(
      source: Observable<[[number, number], string, BricklinkColor[]]>
    ): Observable<[[number, number], string, BricklinkColor[]]> {
      return source.pipe(
        switchMap(
          async ([dimensions, image, colors]: [
            [number, number],
            string,
            BricklinkColor[]
          ]) => {
            let newImage: string = '';
            if (image.length > 0) {
              const cImage = await Image.load(image);
              const points: ColoredPoint[] = [];
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
            return [dimensions, newImage, colors] as [
              [number, number],
              string,
              BricklinkColor[]
            ];
          }
        )
      );
    };
  }

  outputResized() {
    return tap(
      ([dimensions, image, colors]: [
        [number, number],
        string,
        BricklinkColor[]
      ]) => {
        if (image) {
          this.resizedImageDataURL = image;
        } else {
          this.resizedImageDataURL = '';
        }
      }
    );
  }
}
