import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {D3Service} from '../d3.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[zoomableOf]'
})
export class ZoomableDirective implements OnInit {
  @Input('zoomableOf') zoomableOf: ElementRef;

  constructor(private d3Service: D3Service, private element: ElementRef) {
  }

  ngOnInit() {
    // this.d3Service.applyZoomableBehaviour(this.zoomableOf, this.element.nativeElement);
  }
}
