import { Component, VERSION } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Image, InterpolationAlgorithm } from 'image-js';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  targetWidth = 48;
  targetHeight = 48;

  get ratio(): number {
    return this.targetWidth / this.targetHeight;
  }

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

  croppedImageDataSubject$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImageDataSubject$.next(event.base64);
  }
}
