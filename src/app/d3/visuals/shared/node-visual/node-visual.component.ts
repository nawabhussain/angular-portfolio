import {Component, Input} from '@angular/core';
import {Node} from '../../../models';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[nodeVisual]',
  template: `
    <svg:g  [attr.transform]="'translate(' + node.x + ',' + node.y + ')'">
      <svg:circle
        class="node"
        [id]="node.stringIndex"
        [attr.fill]="node.color"
        cx="0"
        cy="0"
        [attr.r]="node.r">
      </svg:circle>
      <svg:text
        class="node-name"
        [id]="node.stringIndex"
        [attr.font-size]="node.fontSize">
        {{node.id}}
      </svg:text>
    </svg:g>
  `,
  styleUrls: ['./node-visual.component.css']
})
export class NodeVisualComponent {
  @Input('nodeVisual') node: Node;
}
