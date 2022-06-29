import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [BrowserModule, FormsModule, ImageCropperModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
