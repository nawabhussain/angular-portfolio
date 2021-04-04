import APP_CONFIG from '../../app.config';
import * as d3 from 'd3';

export class Node implements d3.SimulationNodeDatum {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
  parent?: number;

  id: string;
  linkCount = 0;

  constructor(id) {
    this.id = id;
  }

  setData(index, parent, linkCount) {
    this.index = index;
    this.parent = parent;
    this.linkCount = linkCount;
  }

  normal = () => {
    return Math.sqrt(this.linkCount / APP_CONFIG.N);
  }

  get r() {
    return 30 * this.normal() + 10;
  }

  get fontSize() {
    return (10 * this.normal() + 10) + 'px';
  }

  get color() {
    if (this.index < 5) {
      const index = this.index + 1;
      return APP_CONFIG.SPECTRUM[index];
    } else {
      const index = this.parent;
      return APP_CONFIG.SPECTRUM[index];
    }

  }
}
