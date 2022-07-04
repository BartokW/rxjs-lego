import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from './material.module';

import { AppComponent } from './app.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MosaicImageComponent } from './components/mosaic-image.component';
import { CommonModule } from '@angular/common';
import { MosaicImagePieceComponent } from './components/mosaic-image-piece.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ImageCropperModule,
    MaterialExampleModule,
  ],
  declarations: [AppComponent, MosaicImageComponent, MosaicImagePieceComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
