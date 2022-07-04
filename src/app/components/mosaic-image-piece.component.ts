import { Component, Input } from '@angular/core';
import { ColoredPoint } from '../models/colors';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'svg:g[app-mosaic-image-piece]',
  template: `
    <ng-container *ngIf="isRound">
      <svg:circle
        *ngFor="let point of points"
        [attr.cx]="point.x + width / 2"
        [attr.cy]="point.y + height / 2"
        [attr.r]="width / 2"
        [attr.fill]="point.color.hex"
      />
    </ng-container>
    <<ng-container *ngIf="!isRound">
      <svg:rect
        *ngFor="let point of points"
        [attr.x]="point.x"
        [attr.y]="point.y"
        [attr.width]="width"
        [attr.height]="height"
        [attr.fill]="point.color.hex"
      />
    </ng-container>
    <ng-container *ngIf="!isTile">
      <svg:circle
        *ngFor="let point of points"
        [attr.cx]="point.x + width / 2"
        [attr.cy]="point.y + height / 2"
        [attr.r]="(width * 0.61) / 2"
        fill="none"
        stroke="grey"
      />
    </ng-container>
  `,
})
export class MosaicImagePieceComponent {
  @Input() points: ColoredPoint[];
  @Input() width: number;
  @Input() height: number;
  @Input() isTile: boolean;
  @Input() isRound: boolean;

  // stud 61% of total width
}
