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

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  startingImage =
    'https://raw.githubusercontent.com/BartokW/rxjs-lego/main/src/assets/angular.png';

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
      this.resizeImage(),
      this.replaceColours(),
      map(([dimensions, image]: [[number, number], string]) => {
        return image;
      })
    );

    this.mosaicImageDataURL$ = x;
  }

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
    this.croppedImageDataSubject$.next(event.base64);
  }

  resizeImage() {
    return function <T>(
      source: Observable<[[number, number], string]>
    ): Observable<[[number, number], string]> {
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
          return [dimensions, newImage] as [[number, number], string];
        })
      );
    };
  }

  replaceColours() {
    return function <T>(source: Observable<T>): Observable<T> {
      return source;
    };
  }
}
