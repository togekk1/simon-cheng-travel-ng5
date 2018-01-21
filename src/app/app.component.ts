import {
  Component,
  ViewChild,
  ElementRef,
  HostListener,
  Inject,
  AnimationTransitionEvent,
  AfterViewChecked
} from "@angular/core";
import {
  trigger,
  style,
  transition,
  animate,
  state
} from "@angular/animations";
import { FormGroup, FormControl } from "@angular/forms";
import { Options } from "selenium-webdriver";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";
// import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import * as firebase from "firebase/app";
import { DOCUMENT, DomSanitizer } from "@angular/platform-browser";
import { NgProgress } from "ngx-progressbar";
import { log } from "util";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less", "../assets/fonts/stylesheet.css"],
  animations: [
    trigger("bg_intro", [
      state("on", style({ opacity: 1, transform: "translateX(-1%)" })),
      transition(":enter", animate("2s ease-out")),
      transition(
        ":leave",
        animate(
          ".8s ease-in",
          style({ opacity: 0, transform: "translateX(-2%)" })
        )
      )
    ]),
    trigger("pre", [
      state("on", style({ opacity: 1, transform: "translateY(0)" })),
      transition(":enter", animate("1s 2s cubic-bezier(0, .5, .5, 1)")),
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
      transition(":enter", animate("1s 3s cubic-bezier(0, .5, .5, 1)")),
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
      transition(":enter", animate("300ms 5s cubic-bezier(0, .5, .5, 1)")),
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
    ]),
    trigger("hide_content", [
      state("on", style({ opacity: 0.1 })),
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
  loading_percentage: string;
  disabled: boolean;
  leave: boolean;
  background: Array<any>;
  intro_bg_all: any;
  intro_bg: string;
  data: Object;
  content_top: number;
  scrolling_offset: number;
  pin_point: any;
  pin_trigger: any;
  pin_trigger_new: any;
  triggers: Array<any> = [];
  switch_top: number;
  pin_opacity: Array<any> = [];
  b: Array<any> = [];
  bg_selected = 0;
  switch: any;
  hidden: any;
  switch_unbind: boolean;
  trigger_unbind: boolean;
  hidden_unbind: boolean;
  editorContent: Array<any> = [];
  authorized: boolean;
  editor_show: Array<any> = [];
  pass_show: boolean;
  password_group: FormGroup;
  editing: boolean;
  editor_unbind: Array<any> = [];
  data_db: any;
  db_org: any;
  password: string;
  editor_show_new: boolean;
  editorContent_new: string;
  post: Object;
  editorState = false;

  constructor(
    public afDb: AngularFirestore,
    private sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: Document,
    public ngProgress: NgProgress,
  ) {
    this.password_group = new FormGroup({
      password: new FormControl()
    });
    this.loading_percentage = "0";
    this.disabled = true;
    this.document.documentElement.scrollTop = 0;
    this.ngProgress.set(0);

    afDb
      .doc("travel/background")
      .valueChanges()
      .subscribe((res: any) => {
        this.background = res.background;
        this.intro_bg_all = this.background.shift();
        this.background.reverse();
        this.intro_bg = "url(" + this.intro_bg_all.org + ")";
        this.loading();
      });

    afDb
      .doc("travel/password")
      .valueChanges()
      .subscribe((res: any) => {
        this.password = res.password;
      });

    this.data_db = afDb.collection("travel/data/australia", ref =>
      ref.orderBy("timestamp")
    );

    this.data = this.data_db.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  loading() {
    this.ngProgress.start();

    const completedPercentage: Array<any> = [];
    let sum: number;
    for (let i = 0; i < this.background.length; i++) {
      const xmlHTTP = new XMLHttpRequest();
      xmlHTTP.open("GET", this.background[i].org, true);
      xmlHTTP.responseType = "arraybuffer";
      xmlHTTP.onload = e => {
        const blob = new Blob([this.response]);
        const src = window.URL.createObjectURL(blob);
      };
      xmlHTTP.onprogress = e => {
        completedPercentage[i] = e.loaded / e.total * 100;
        sum =
          parseInt(completedPercentage.reduce((a, b) => a + b, 0)) /
          this.background.length;
        this.loading_percentage = sum.toFixed(0);
        this.intro_show = completedPercentage[0] === 100;
        if (sum === 100) {
          this.ngProgress.done();
        }
      };
      xmlHTTP.onloadstart = () => {
        completedPercentage[i] = 0;
      };
      xmlHTTP.send();
    }
  }

  // editor_init(item, i) {
  //   this.editor_unbind[i] = true;
  //   this.editorContent[i] = item.en;
  // }

  add_data(content) {
    const content_new = content.content_new;
    if (!!content_new) {
      this.data_db.add({ en: content_new, timestamp: new Date() });
      this.editorContent_new = null;
    }
  }

  update_data(content, item, id) {
    const content_new = eval('content.content' + id);
    if (!!content_new) {
      this.data_db.doc(item.id).set({ en: content_new, timestamp: item.timestamp });
    }
  }

  delete_data(item) {
    this.data_db.doc(item.id).delete();
  }


  @HostListener("scroll", [])
  scrollevent() {
    this.scrolling_offset =
      this.content_top - this.switch[0].getBoundingClientRect().top;
    for (let i = 0; i < this.switch.length; i++) {
      this.b[i] = this.switch[i].getBoundingClientRect().top / 300;
    }
    this.bg_selected = this.b.findIndex(i => i > 0);
    this.bg_selected === -1 && (this.bg_selected = this.b.length);

    this.pin_trigger.forEach((pin, index) => {
      const a = pin.getBoundingClientRect().top;
      const b = a > -200 ? 1 - a / 200 : 4 - a / -200;
      this.pin_opacity[index] = b >= 0 ? b : 0;
    });
  }

  ngAfterViewChecked() {
    this.pin_point = document.querySelectorAll('.pin_point');
    this.pin_trigger = document.querySelectorAll('.pin_trigger');
    this.switch = document.querySelectorAll('.switch');
    this.hidden = document.querySelectorAll('.hidden');

    if (!!this.switch.length && !this.switch_unbind) {
      this.switch_unbind = true;
      this.content_top = this.switch[0].getBoundingClientRect().top;
    }

    if (
      !!this.pin_point.length &&
      !!this.pin_trigger.length &&
      !this.trigger_unbind &&
      !this.authorized
    ) {
      this.trigger_unbind = true;

      this.triggers = Array.prototype.map.call(this.pin_point, el => {
        const a = el.innerHTML;
        el.remove();
        return a;
      });

      this.pin_trigger.forEach(el => {
        el.style.height = '1100px';
      });
    }

    if (!!this.hidden.length && !this.hidden_unbind && !this.authorized) {
      this.hidden_unbind = true;
      this.hidden.forEach(el => {
        el.style.opacity = '0';
      });
    }
  }
}
