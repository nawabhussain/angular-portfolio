import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-portfolio';
  public isNavOpen: boolean;
  public breakpoint: number;

  toggleSideNav(sidenav) {
    sidenav.toggle();
  }

  scroll(id, sidenav) {
    sidenav.toggle();
    const el = document.getElementById(id);
    el.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    this.isNavOpen = false;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    if (window.pageYOffset > 300) {
      const element = document.getElementsByClassName('nav')[0];
      if (element != null) {
        element.classList.add('nav--sticky');
      }
    } else {
      const element = document.getElementsByClassName('nav')[0];
      if (element != null) {
        element.classList.remove('nav--sticky');
      }
    }
  }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 768) ? 1 : 2;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 768) ? 1 : 2;
  }
}
