import {
  Component,
  Input,
  OnInit,
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

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less", "../assets/fonts/stylesheet.css"],
  animations: [
    trigger("bg_intro", [
      state("on", style({ opacity: 1, transform: "translateX(-10px)" })),
      transition(":enter", animate("2s 1s ease-out")),
      transition(
        ":leave",
        animate(
          ".8s ease-in",
          style({ opacity: 0, transform: "translateX(-20px)" })
        )
      )
    ]),
    trigger("pre", [
      state("on", style({ opacity: 1, transform: "translateY(0)" })),
      transition(":enter", animate("1s 4s cubic-bezier(0, .5, .5, 1)")),
      transition(
        ":leave",
        animate(
          ".7s ease-in",
          style({ opacity: 0, transform: "translateY(-10px)" })
        )
      )
    ]),
    trigger("name", [
      state("on", style({ opacity: 1, transform: "translateY(0)" })),
      transition(":enter", animate("1s 5s cubic-bezier(0, .5, .5, 1)")),
      transition(
        ":leave",
        animate(
          ".5s ease-in",
          style({ opacity: 0, transform: "translateY(-10px)" })
        )
      )
    ]),
    trigger("enter", [
      state("on", style({ opacity: 1, transform: "translateX(0)" })),
      transition(":enter", animate("300ms 7s cubic-bezier(0, .5, .5, 1)")),
      transition(
        ":leave",
        animate(
          ".3s ease-in",
          style({ opacity: 0, transform: "translateX(-5px)" })
        )
      )
    ]),
    trigger("text", [
      state("on", style({ opacity: 1 })),
      transition(":enter", animate("1s linear")),
      transition(":leave", animate("2s linear", style({ opacity: 0 })))
    ])
  ]
})
export class AppComponent implements OnInit, AfterViewChecked {
  disabled: Boolean;
  leave: Boolean;
  background: any;
  intro_bg: string;
  intro_hide: Boolean;
  data: Array<any> = [];
  scrolling_offset: number;
  pin_point: any;
  pin_trigger: any;
  triggers: string;
  pin_top: number;
  a: number;

  constructor(
    public afDb: AngularFireDatabase,
    private sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.disabled = true;
    this.intro_hide = false;
    this.document.documentElement.scrollTop = 0;
    // const self = this;
    afDb
      .list("background")
      .valueChanges()
      .subscribe(res => {
        // console.log(res);
        this.background = res;
        this.intro_bg = this.background.pop();
        this.background.reverse();
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
    this.intro_bg = "url(" + this.intro_bg.org + ")";
  }

  tap_content() { }

  handleDone(event: AnimationTransitionEvent) {
    console.log(event.toState);
    if (event.toState === "void") this.intro_hide = true;
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.scrolling_offset = window.pageYOffset;
    // const pin_top = this.pin.nativeElement.getBoundingClientRect();
    // if (pin_top < 0) console.log("OK");
    this.pin_trigger.forEach(pin => {
      this.pin_top = pin.getBoundingClientRect().top
    });
    // console.log(1 - (this.pin_top) / 200)
    this.a = this.pin_top > -200 ? 1 - this.pin_top / 200 : 4 - this.pin_top / -200
    console.log(this.a)
  }

  ngAfterViewChecked() {
    this.pin_point = document.querySelectorAll(".pin_point");
    this.pin_trigger = document.querySelectorAll(".pin_trigger");
    if (!!this.pin_point && !!this.pin_trigger) {
      this.pin_point.forEach(el => {
        // console.log(el.innerHTML)
        this.triggers = el.innerHTML

        el.style.color = "#FFFFFF";
        el.style.gridColumn = "2 / 3";
        el.style.alignSelf = "center";
        el.style.zIndex = "0"
        // el.style.opacity = "0";
      });
      this.pin_trigger.forEach(el => {
        el.style.height = "1100px"
      });
    }
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
}
