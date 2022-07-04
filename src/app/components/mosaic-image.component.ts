import { Component, Input, HostBinding } from '@angular/core';
import { createLinearScale, getBounds } from '../helpers/utility';
import { BricklinkColor, ColoredPoint } from '../models/colors';

@Component({
  selector: 'app-mosaic-image',
  template: `
    <svg
      [attr.width]="width"
      [attr.height]="height"
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
    return this.width; // - this.margin * 2;
  }

  @HostBinding('style.height.px') get containerHeight() {
    return this.height; // - this.margin * 2;
  }

  @Input() width: number = 500;
  @Input() height: number = 500;

  @Input() set backgroundColor(color: BricklinkColor) {
    this.background = color;
  }

  @Input() set points(points: ColoredPoint[]) {
    const { width, height } = this;
    if (points) {
      const bounds = getBounds(points);
      const scaleX = createLinearScale([bounds.minX, bounds.maxX], [0, width]);
      const scaleY = createLinearScale([bounds.minY, bounds.maxY], [0, height]);
      this.pieceWidth = scaleX(1);
      this.pieceHeight = scaleY(1);
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
