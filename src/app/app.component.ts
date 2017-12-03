import { Component, Input, OnInit } from '@angular/core';
import { trigger, style, transition, animate, state } from '@angular/animations';
import { Options } from 'selenium-webdriver';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

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
  background: any;
  intro_bg: string;

  constructor(public afDb: AngularFireDatabase) {
    this.disabled = true;
    afDb.list('background').valueChanges().subscribe(res => {
      this.background = res;
      this.render_bg();
    });
  }

  ngOnInit() {

    // const completedPercentage = [];
    // let sum;

    // for (let i = 0; i < items.length; i++) {

    //   const xmlHTTP = new XMLHttpRequest();
    //   xmlHTTP.open('GET', items[i], true);
    //   xmlHTTP.responseType = 'arraybuffer';
    //   xmlHTTP.onload = e => {
    //     let blob = new Blob([this.response]);
    //     let src = window.URL.createObjectURL(blob);
    //   };
    //   xmlHTTP.onprogress = e => {
    //     completedPercentage[i] = parseInt((e.loaded / e.total) * 100);
    //     sum = parseInt(completedPercentage.reduce((a, b) => a + b, 0) /
    //       items.length);
    //     this.loading_percentage = sum;

    //     if (sum === 100) {
    //       // this.intro_hidden = false;
    //       // const loading_animation = this.$$('.loading').animate({ opacity: [1, 0] }, { duration: 1000, fill: 'forwards', delay: 2000 })
    //       // loading_animation.onfinish = () => {
    //       //   this.loading_hidden = true;
    //       // };

    //       console.log('Loading complete')
    //     };

    //   };
    //   xmlHTTP.onloadstart = () => {
    //     completedPercentage[i] = 0;
    //   };
    //   xmlHTTP.send();

    // }
  }

  render_bg() {
    this.intro_bg = "url(" + this.background[this.background.length - 1].org + ")";
  }
}
