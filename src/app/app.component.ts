import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  VERSION,
  ViewChild,
} from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { BehaviorSubject, combineLatest, fromEvent, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Image, InterpolationAlgorithm } from 'image-js';
import { ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  croppedImageDataSubject$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  mosaicImageDataURL$: Observable<string>;

  targetDimensions$: BehaviorSubject<[number, number]> = new BehaviorSubject<
    [number, number]
  >([32, 32]);

  ratio$: Observable<number>;

  constructor() {
    this.ratio$ = this.targetDimensions$.pipe(
      map(([x, y]: [number, number]) => {
        return x / y;
      })
    );

    var x = combineLatest([
      this.targetDimensions$,
      this.croppedImageDataSubject$,
    ]).pipe(
      // filter(([dimensions, image]: [[number, number], string]) => {
      //   return image !== null && image !== undefined && image !== '';
      // }),
      this.resizeImage(),
      map(([dimensions, image]: [[number, number], string]) => {
        return image;
      })
    );

    this.mosaicImageDataURL$ = x;
  }

  ngAfterViewInit(): void {}

  dimensionsChanged(val: any) {
    switch (val.target.value) {
      case '1':
        this.targetDimensions$.next([32, 32]);
        break;
      case '2':
        this.targetDimensions$.next([48, 48]);
        break;
      case '3':
        this.targetDimensions$.next([96, 48]);
        break;
      case '4':
        this.targetDimensions$.next([48, 96]);
        break;
      case '5':
        this.targetDimensions$.next([96, 96]);
        break;
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    console.log('cropped');
    this.croppedImageDataSubject$.next(event.base64);
  }

  resizeImage() {
    return function <T>(
      source: Observable<[[number, number], string]>
    ): Observable<[[number, number], string]> {
      var x = source.pipe(
        switchMap(async ([dimensions, image]: [[number, number], string]) => {
          let newImage: string = '';
          if (image.length > 0) {
            const cImage = await Image.load(image);
            const resized = cImage.resize({
              width: dimensions[0],
            });
            newImage = resized.toDataURL();
          }

          return [dimensions, newImage] as [[number, number], string];
        })
      );

      return x;
    };
  }
}
