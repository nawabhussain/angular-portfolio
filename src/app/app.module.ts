import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {HeaderComponent} from './header/header.component';
import {PortfolioComponent} from './portfolio/portfolio.component';
import {SkillComponent} from './skill/skill.component';
import {HttpClientModule} from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {NgxTypedJsModule} from 'ngx-typed-js';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {ChartsModule} from 'ng2-charts';
import {MatChipsModule} from '@angular/material/chips';
import {D3Service, DraggableDirective, ZoomableDirective} from './d3';
import {GraphComponent} from './d3/visuals/graph/graph.component';
import {LinkVisualComponent, NodeVisualComponent} from './d3/visuals/shared';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    HeaderComponent,
    PortfolioComponent,
    SkillComponent,
    GraphComponent,
    NodeVisualComponent,
    LinkVisualComponent,
    DraggableDirective,
    ZoomableDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    NgxTypedJsModule,
    MatCardModule,
    MatGridListModule,
    ChartsModule,
    MatChipsModule
  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
