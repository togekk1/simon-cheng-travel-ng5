import { Component, Input, OnInit } from '@angular/core';
import { trigger, style, transition, animate, state } from '@angular/animations';
import { Options } from 'selenium-webdriver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less', '../assets/fonts/stylesheet.css'],
  animations: [
    trigger('pre', [
      state('on', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', animate('1s 4s cubic-bezier(0, .5, .5, 1)')),
      transition(':leave', animate('.7s ease-in', style({ opacity: 0, transform: 'translateY(-10px)' })))
    ]),
    trigger('name', [
      state('on', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', animate('1s 5s cubic-bezier(0, .5, .5, 1)')),
      transition(':leave', animate('.5s ease-in', style({ opacity: 0, transform: 'translateY(-10px)' })))
    ]),
    trigger('enter', [
      state('on', style({ opacity: 1, transform: 'translateX(0)' })),
      transition(':enter', animate('300ms 7s cubic-bezier(0, .5, .5, 1)')),
      transition(':leave', animate('.3s ease-in', style({ opacity: 0, transform: 'translateX(-5px)' })))
    ])
  ]
})
export class AppComponent implements OnInit {
  disabled: Boolean;
  leave: Boolean;

  constructor() {
    this.disabled = true;
  }
  ngOnInit() {
    // let animation = { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0)'] };
    // let ease = { easing: 'cubic-bezier(0, .5, .5, 1)', fill: 'forwards' };
    // document.querySelector('.pre').animate(animation, Object.assign({ duration: 1000, delay: 4000 }, ease));
    // document.querySelector('.name').animate(animation, Object.assign({ duration: 1000, delay: 5000 }, ease));
    // const enter_animation = document.querySelector('.enter').animate({ opacity: [0, 1], transform: ['translateX(5px)', 'translateX(0)'] },
    //   Object.assign({ duration: 300, delay: 7000 }, ease));
    // enter_animation.onfinish = () => {
    //   this.disabled = false;
    // };
  }
}
