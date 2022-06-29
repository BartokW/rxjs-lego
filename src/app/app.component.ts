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
import { map, switchMap, tap } from 'rxjs/operators';
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

  name = 'Angular ' + VERSION.major;

  targetWidth = 48;
  targetHeight = 48;

  get ratio(): number {
    return this.targetWidth / this.targetHeight;
  }

  constructor() {
    var x = combineLatest([this.croppedImageDataSubject$]).pipe();
  }

  ngAfterViewInit(): void {}

  dimensionsChanged(val: any) {
    switch (val.target.value) {
      case '1':
        this.targetWidth = this.targetHeight = 32;
        break;
      case '2':
        this.targetWidth = this.targetHeight = 48;
        break;
      case '3':
        this.targetWidth = 96;
        this.targetHeight = 48;
        break;
      case '4':
        this.targetWidth = 48;
        this.targetHeight = 96;
        break;
      case '5':
        this.targetWidth = this.targetHeight = 96;
        break;
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImageDataSubject$.next(event.base64);
  }
}
