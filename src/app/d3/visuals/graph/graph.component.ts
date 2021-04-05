import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {ForceDirectedGraph} from '../../models';
import {D3Service} from '../../d3.service';
import * as d3 from 'd3';
import { element } from 'protractor';

@Component({
  selector: 'app-graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card class="w-100 align-self-center center-text p-0 mb-3 dark-container mat-elevation-z0">
      <svg #svg [attr.width]="config.width" [attr.height]="config.height" class="w-100 mat-content-center">
        <g [zoomableOf]="svg">
          <g [linkVisual]="link" *ngFor="let link of links"></g>
          <g [nodeVisual]="node" *ngFor="let node of nodes"
             [draggableNode]="node" [draggableInGraph]="graph" (click)="toggleNode(node)"></g>
        </g>
      </svg>
    </mat-card>
  `,
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit {
  @Input('nodes') nodes;
  @Input('links') links;
  @Input('groups') groups;

  graph: ForceDirectedGraph;
  // tslint:disable-next-line:variable-name
  public config: { width, height } = {width: 600, height: 600};

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initSimulation(this.options);
  }


  constructor(private d3Service: D3Service, private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    /** Receiving an initialized simulated graph from our custom d3 service */
    this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);

    /** Binding change detection check on each tick
     * This along with an onPush change detection strategy should enforce checking only when relevant!
     * This improves scripting computation duration in a couple of tests I've made, consistently.
     * Also, it makes sense to avoid unnecessary checks when we are dealing only with simulations data binding.
     */
    this.graph.ticker.subscribe((d) => {
      this.ref.markForCheck();
    });
  }

  ngAfterViewInit() {
    this.graph.initSimulation(this.options);
  }

  // Toggle children on click.
  toggleNode(node) {
    if(node.index!=0){
      const n = this.groups[node.index];
      if(n){
        const active   = n.active ? false : true; // toggle whether node is active
        const newOpacity = active ? 0 : 1;

        // Extract node's name and the names of its neighbors
        // const index     = n.index;
        const neighbors  = n.neighbourhood;

        // Hide the neighbors and their links
        for (var i = 0; i < neighbors.length; i++){
              d3.select("circle#" + neighbors[i].stringIndex).style("opacity", newOpacity);
              d3.select("text#" + neighbors[i].stringIndex).style("opacity", newOpacity);
              d3.selectAll("line#" + neighbors[i].stringIndex).style("opacity", newOpacity);
        }
        // Update whether or not the node is active
        n.active = active;
      }
    }
  }

  get options() {
    return this.config = {
      width: 0.9 * window.innerWidth,
      height: 0.9 * window.innerHeight
    };
  }
}
