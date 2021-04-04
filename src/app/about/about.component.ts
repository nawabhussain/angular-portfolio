import {Component, OnInit, ViewChild} from '@angular/core';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})

export class AboutComponent implements OnInit {
  text = 'Yo, what is up';
  title = 'Olá, meu nome é Braian ';
  paragraph = 'Sou formado em Tecnologia em Análise e Desenvolvimento de Sistemas pela ' +
    'faculdade Anhanguera de Sorocaba, meu objetivo é me tornar desenvolvedor full-stack.';
  jobs = [
    'Software Developer',
    'Machine Learning Engineer',
    'Solution Architect'
  ];

  constructor() {
  }

  ngOnInit() {
  }
}
