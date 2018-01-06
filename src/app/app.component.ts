import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  HostListener,
  Inject,
  AnimationTransitionEvent,
  Directive,
  AfterViewChecked
} from "@angular/core";
import {
  trigger,
  style,
  transition,
  animate,
  state
} from "@angular/animations";
import { Options } from "selenium-webdriver";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import * as firebase from "firebase/app";
import { DOCUMENT, DomSanitizer } from "@angular/platform-browser";
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less", "../assets/fonts/stylesheet.css"],
  animations: [
    trigger("bg_intro", [
      state("on", style({ opacity: 1, transform: "translateX(-1%)" })),
      transition(":enter", animate("2s ease-out")),
      transition(":leave", animate(".8s ease-in", style({ opacity: 0, transform: "translateX(-2%)" })))
    ]),
    trigger("pre", [
      state("on", style({ opacity: 1, transform: "translateY(0)" })),
      transition(":enter", animate("1s 2s cubic-bezier(0, .5, .5, 1)")),
      transition(":leave", animate(".7s ease-in", style({ opacity: 0, transform: "translateY(-10px)" })))
    ]),
    trigger("name", [
      state("on", style({ opacity: 1, transform: "translateY(0)" })),
      transition(":enter", animate("1s 3s cubic-bezier(0, .5, .5, 1)")),
      transition(":leave", animate(".5s ease-in", style({ opacity: 0, transform: "translateY(-10px)" })))
    ]),
    trigger("enter", [
      state("on", style({ opacity: 1, transform: "translateX(0)" })),
      transition(":enter", animate("300ms 5s cubic-bezier(0, .5, .5, 1)")),
      transition(":leave", animate(".3s ease-in", style({ opacity: 0, transform: "translateX(-5px)" })))
    ]),
    trigger("text", [
      state("on", style({ opacity: 1 })),
      transition(":enter", animate("1s linear")),
      transition(":leave", animate("2s linear", style({ opacity: 0 })))
    ]),
    trigger("hide_content", [
      state("on", style({ opacity: .1 })),
      transition(":enter", animate("400ms linear")),
      transition(":leave", animate("400ms linear", style({ opacity: 1 })))
    ]),
    trigger("hide_filter", [
      state("on", style({ opacity: 0 })),
      transition(":enter", animate("400ms linear")),
      transition(":leave", animate("400ms linear", style({ opacity: 1 })))
    ])
  ]
})
export class AppComponent implements AfterViewChecked {
  loading_hidden: boolean;
  title_show: string;
  intro_show: boolean;
  content_page_show: boolean;
  response: any;
  loading_percentage: number;
  disabled: boolean;
  leave: boolean;
  background: any;
  intro_bg_all: any;
  intro_bg: string;
  data: Array<any> = [];
  content_top: number;
  scrolling_offset: number;
  pin_point: any;
  pin_trigger: any;
  triggers: string;
  pin_top: number;
  switch_top: number;
  a: number;
  b: Array<any> = [];
  switch: any;
  switch_unbind: boolean;
  trigger_unbind: boolean;

  constructor(
    public afDb: AngularFireDatabase,
    private sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: Document,
    public ngProgress: NgProgress
  ) {
    this.loading_percentage = 0
    this.disabled = true;
    this.a = 0
    this.document.documentElement.scrollTop = 0;
    // const self = this;
    this.ngProgress.set(0);

    afDb
      .list("background")
      .valueChanges()
      .subscribe(res => {
        // console.log(res);
        this.background = res;
        this.intro_bg_all = this.background.pop();
        this.background.reverse();
        this.loading();
        this.render_bg();
      });
    afDb
      .list("data/en/data")
      .valueChanges()
      .subscribe(res => {
        res.forEach(data => {
          this.data.push(data);
        });
        // this.render_page();
      });
  }

  render_bg() {
    this.intro_bg = "url(" + this.intro_bg_all.org + ")";
  }

  // tap_content() { }

  @HostListener("scroll", [])
  scrollevent() {
    this.scrolling_offset = this.content_top - this.switch[0].getBoundingClientRect().top;
    for (let i = 0; i < this.switch.length; i++) {
      this.b[i] = this.switch[i].getBoundingClientRect().top / 300;
    }

    // const pin_top = this.pin.nativeElement.getBoundingClientRect();
    // if (pin_top < 0) console.log("OK");

    this.pin_trigger.forEach(pin => {
      this.pin_top = pin.getBoundingClientRect().top;
    });

    // console.log(this.switch[0].getBoundingClientRect().top < 300)

    // console.log(1 - (this.pin_top) / 200)
    this.a = this.pin_top > -200 ? 1 - this.pin_top / 200 : 4 - this.pin_top / -200;
  }

  ngAfterViewChecked() {
    this.pin_point = document.querySelectorAll(".pin_point");
    this.pin_trigger = document.querySelectorAll(".pin_trigger");
    this.switch = document.querySelectorAll(".switch");

    if (!!this.switch.length && !this.switch_unbind) {
      this.switch_unbind = true;
      this.content_top = this.switch[0].getBoundingClientRect().top;
    }

    if (!!this.pin_point && !!this.pin_trigger && !this.trigger_unbind) {
      this.trigger_unbind = true;
      this.pin_point.forEach(el => {
        if (el.parentNode.className !== "bg_container fill") {
          this.triggers = el.innerHTML
          el.remove()
        } else {
          el.style.color = "#FFFFFF";
          el.style.gridColumn = "2 / 3";
          el.style.alignSelf = "center";
          el.style.zIndex = "0";
        }
      });
      this.pin_trigger.forEach(el => {
        el.style.height = "1100px"
      });
    }
  }

  show_console(e) {
    console.log(e)
  }

  loading() {
    this.ngProgress.start();

    const completedPercentage: Array<any> = [];
    let sum: number;
    for (let i = 0; i < this.background.length; i++) {
      const xmlHTTP = new XMLHttpRequest();
      xmlHTTP.open('GET', this.background[i].org, true);
      xmlHTTP.responseType = 'arraybuffer';
      xmlHTTP.onload = e => {
        const blob = new Blob([this.response]);
        const src = window.URL.createObjectURL(blob);
      };
      xmlHTTP.onprogress = e => {

        completedPercentage[i] = e.loaded / e.total * 100;
        sum = parseInt(completedPercentage.reduce((a, b) => a + b, 0)) / this.background.length;
        this.loading_percentage = sum;
        if (sum === 100) {
          this.ngProgress.done();

          // const loading_animation = this.$$('.loading').animate({ opacity: [1, 0] }, { duration: 1000, fill: 'forwards', delay: 2000 })
          // loading_animation.onfinish = () => {
          this.intro_show = true;
          // };
          // console.log('Loading complete')
        };
      };
      xmlHTTP.onloadstart = () => {
        completedPercentage[i] = 0;
      };
      xmlHTTP.send();
    }

    // this.ngProgress.start();


    // console.log(this.background[0].org)
    // this.http.get(this.background[0].org).subscribe(res){
    //   /** request completed */
    //   console.log('OK')
    //   this.ngProgress.done();
    // }

  }

}
