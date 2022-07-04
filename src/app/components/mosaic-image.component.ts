import { Component, Input, HostBinding } from '@angular/core';
import { createLinearScale, getBounds } from '../helpers/utility';
import { BricklinkColor, ColoredPoint } from '../models/colors';

@Component({
  selector: 'app-mosaic-image',
  template: `
    <svg
      [attr.width]="imageWidth"
      [attr.height]="imageHeight"
      [style.left.px]="-margin"
      [style.top.px]="-margin"
      [style.background-color]="background.hex"
    >
      <svg:g
        app-mosaic-image-piece
        [width]="pieceWidth"
        [height]="pieceHeight"
        [points]="computedPoints"
        [isTile]="isTile"
        [isRound]="isRound"
      ></svg:g>
    </svg>
  `,
  styles: [
    `
      :host {
        position: relative;
        display: block;
      }

      svg {
        position: absolute;
      }
    `,
  ],
})
export class MosaicImageComponent {
  margin = 20;
  imageWidth = 500;
  imageHeight = 500;
  pieceWidth = 1;
  pieceHeight = 1;
  background: BricklinkColor = {
    name: 'Light Bluish Gray',
    hex: '#afb5c7',
    id: 86,
    selected: true,
  };
  computedPoints: ColoredPoint[];

  @Input() isTile: boolean;
  @Input() isRound: boolean;

  @HostBinding('style.width.px') get containerWidth() {
    return this.imageWidth - this.margin * 2;
  }

  @HostBinding('style.height.px') get containerHeight() {
    return this.imageHeight - this.margin * 2;
  }

  @Input() set width(width: number) {
    this.imageWidth = width;
  }
  @Input() set height(height: number) {
    this.imageHeight = height;
  }

  @Input() set backgroundColor(color: BricklinkColor) {
    this.background = color;
  }

  @Input() set points(points: ColoredPoint[]) {
    const { margin, imageWidth, imageHeight } = this;
    if (points) {
      const bounds = getBounds(points);
      const scaleX = createLinearScale(
        [bounds.minX, bounds.maxX],
        [margin, imageWidth - margin]
      );
      const scaleY = createLinearScale(
        [bounds.minY, bounds.maxY],
        [margin, imageHeight - margin]
      );
      this.pieceWidth = scaleX(1) / 2;
      this.pieceHeight = scaleY(1) / 2;
      this.computedPoints = points.map((point) => {
        return {
          color: point.color,
          x: scaleX(point.x),
          y: scaleY(point.y),
        };
      });
    } else {
      this.computedPoints = [];
    }
  }
}
