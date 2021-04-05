import {Component, Input} from '@angular/core';
import {Link} from '../../../models';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[linkVisual]',
  template: `
    <svg:line
      class="link"
      [id]="link.target.stringIndex"
      [attr.x1]="link.source.x"
      [attr.y1]="link.source.y"
      [attr.x2]="link.target.x"
      [attr.y2]="link.target.y"
    ></svg:line>
  `,
  styleUrls: ['./link-visual.component.css']
})
export class LinkVisualComponent {
  @Input('linkVisual') link: Link;
}
