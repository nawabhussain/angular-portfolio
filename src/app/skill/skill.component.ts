import {ChangeDetectorRef, Component, ElementRef, OnInit} from '@angular/core';
import {scrollAnimation} from '../shared/animations';
import {ScrollAnimationComponent} from '../shared/scroll-animation.component';
import {Link, Node} from '../d3';
import APP_CONFIG from '../app.config';
import {HttpClient} from '@angular/common/http';
import {skills} from '../../assets/json/skills';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
  animations: [
    scrollAnimation
  ]
})
export class SkillComponent extends ScrollAnimationComponent implements OnInit {
  public breakpoint: number;

  nodes: Node[] = [];
  links: Link[] = [];

  skillList: Node[] = [];
  linkList: Link[] = [];

  constructor(el: ElementRef, cdRef: ChangeDetectorRef, private http: HttpClient) {
    super(el, cdRef);
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 768) ? 1 : 2;

    this.getSkills();
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 768) ? 1 : 2;
  }

  private getSkills() {

    const groupBy = key => array =>
      array.reduce((objectsByKeyValue, obj) => {
        const value = obj[key];
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
      }, {});

    const groupByParent = groupBy('parent');
    APP_CONFIG.N = skills.length;
    skills.forEach(element => {
      const node = new Node(element.id);
      node.setData(element.index, element.parent, element.linkCount);
      this.nodes.push(node);
    });

    const groups = groupByParent(this.nodes);
    const rootKeys = Object.keys(groups);
    this.nodes.forEach(e => {
      if (rootKeys.indexOf(String(e.index)) > -1) {

        const nodesForParent = groups[e.index];
        if (nodesForParent != null) {
          nodesForParent.forEach(node => {
            this.links.push(new Link(e, node));
          });
        }
      }
    });
    this.skillList = this.nodes;
    this.linkList = this.links;
  }
}
