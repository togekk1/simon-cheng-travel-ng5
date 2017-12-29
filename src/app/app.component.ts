import {
  Component,
  Input,
  OnInit,
  HostListener,
  Inject,
  AnimationTransitionEvent
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
import { DOCUMENT } from "@angular/platform-browser";
import { WINDOW } from "./window.service";

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
export class AppComponent implements OnInit {
  disabled: Boolean;
  leave: Boolean;
  background: any;
  intro_bg: string;
  intro_hide: Boolean;
  data: Array<any> = [];
  scrolling_offset: number;

  constructor(
    public afDb: AngularFireDatabase,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window
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
    this.intro_bg =
      "url(" + this.background[this.background.length - 1].org + ")";
  }

  handleDone(event: AnimationTransitionEvent) {
    console.log(event.toState);
    if (event.toState === "void") this.intro_hide = true;
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.scrolling_offset = this.window.pageYOffset;
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
