declare var require: any;

import {
  Component,
  ViewChild,
  ElementRef,
  HostListener,
  Inject,
  AnimationTransitionEvent,
  AfterViewChecked,
  AfterViewInit,
  NgZone,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import {
  trigger,
  style,
  transition,
  animate,
  state
} from '@angular/animations';
import { FormGroup, FormControl } from '@angular/forms';
import { Options } from 'selenium-webdriver';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { DOCUMENT, DomSanitizer } from '@angular/platform-browser';
import { NgProgress } from 'ngx-progressbar';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less', '../assets/fonts/stylesheet.css'],
  animations: [
    trigger('bg_intro', [
      state('on', style({ opacity: 1, transform: 'translateX(-1%)' })),
      transition(':enter', animate('2s ease-out')),
      transition(
        ':leave',
        animate(
          '.8s ease-in',
          style({ opacity: 0, transform: 'translateX(-2%)' })
        )
      )
    ]),
    trigger('pre', [
      state('on', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', animate('1s 2s cubic-bezier(0, .5, .5, 1)')),
      transition(
        ':leave',
        animate(
          '.7s ease-in',
          style({ opacity: 0, transform: 'translateY(-10px)' })
        )
      )
    ]),
    trigger('name', [
      state('on', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', animate('1s 3s cubic-bezier(0, .5, .5, 1)')),
      transition(
        ':leave',
        animate(
          '.5s ease-in',
          style({ opacity: 0, transform: 'translateY(-10px)' })
        )
      )
    ]),
    trigger('enter', [
      state('on', style({ opacity: 1, transform: 'translateX(0)' })),
      transition(':enter', animate('300ms 5s cubic-bezier(0, .5, .5, 1)')),
      transition(
        ':leave',
        animate(
          '.3s ease-in',
          style({ opacity: 0, transform: 'translateX(-5px)' })
        )
      )
    ]),
    trigger('text', [
      state('on', style({ opacity: 1 })),
      transition(':enter', animate('1s linear')),
      transition(':leave', animate('2s linear', style({ opacity: 0 })))
    ]),
    trigger('hide_content', [
      state('on', style({ opacity: 0.1 })),
      transition(':enter', animate('400ms linear')),
      transition(':leave', animate('400ms linear', style({ opacity: 1 })))
    ]),
    trigger('hide_filter', [
      state('on', style({ opacity: 0 })),
      transition(':enter', animate('400ms linear')),
      transition(':leave', animate('400ms linear', style({ opacity: 1 })))
    ])
  ]
})
export class AppComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  db: AngularFirestore;
  loading_hidden: boolean;
  title_show: string;
  intro_show: boolean;
  content_page_show: boolean;
  response: any;
  loading_percentage = '0';
  disabled = true;
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
  triggers: Array<any> = new Array();
  switch_top: number;
  pin_opacity: Float64Array = new Float64Array(5);
  b: Array<any> = [];
  bg_selected = 0;
  switch: any;
  hidden: any;
  switch_unbind: boolean;
  pin_unbind: boolean;
  trigger_unbind: boolean;
  hidden_unbind: boolean;
  editorContent: Array<any> = [];
  authorized: boolean;
  pass_show: boolean;
  password_group: FormGroup;
  editing: boolean;
  data_db: any;
  db_org: any;
  password: string;
  editorContent_new: string;
  post: Object;
  editorState = false;
  wasm: any;
  scroll_hint_top: number;
  prologue_box_top: number;
  fadein: Float64Array = new Float64Array(5);
  private ngUnsubscribe: Subject<any> = new Subject();
  new_hide: boolean;

  constructor(
    public afDb: AngularFirestore,
    private sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: Document,
    public ngProgress: NgProgress,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {

    this.zone.runOutsideAngular(() => {

      // WASM
      const importObject = { imports: { imported_func: arg => console.log(arg) } };
      fetch('assets/webassembly.wasm').then(response =>
        response.arrayBuffer()
      ).then(bytes =>
        WebAssembly.instantiate(bytes, importObject)
      ).then(results => {
        this.wasm = results.instance.exports;
      });

      this.password_group = new FormGroup({
        password: new FormControl()
      });
      this.document.documentElement.scrollTop = 0;
      this.scrolling_offset = 0;
      this.ngProgress.set(0);
      afDb
        .doc('travel/background')
        .valueChanges()
        .takeUntil(this.ngUnsubscribe)
        .subscribe((res: any) => {
          this.background = res.background;
          this.intro_bg_all = this.background.shift();
          this.background.reverse();
          this.intro_bg = 'url(' + this.intro_bg_all.org + ')';
          this.loading();
        });

      afDb
        .doc('travel/password')
        .valueChanges()
        .takeUntil(this.ngUnsubscribe)
        .subscribe((res: any) => {
          this.password = res.password;
        });

      this.data_db = afDb.collection('travel/data/australia', ref =>
        ref.orderBy('timestamp')
      );

      this.data = this.data_db.snapshotChanges().map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data();
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      });
    });
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  loading() {
    this.ngProgress.start();

    this.zone.runOutsideAngular(() => {
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
          sum =
            parseInt(completedPercentage.reduce((a, b) => a + b, 0)) /
            this.background.length;
          this.zone.run(() => {
            this.loading_percentage = sum.toFixed(0);
            this.intro_show = completedPercentage[0] === 100;
            if (sum === 100) {
              this.ngProgress.done();
            }
          });
        };
        xmlHTTP.onloadstart = () => {
          completedPercentage[i] = 0;
        };
        xmlHTTP.send();
      }
    });
  }

  update_data(content, item, id) {
    this.new_hide = true;
    this.zone.runOutsideAngular(() => {
      if (item !== 'new') {
        const content_new = eval('content.content' + id);
        if (!!content_new) {
          this.data_db
            .doc(item.id)
            .set({ en: content_new, timestamp: item.timestamp })
            .then(res => this.zone.run(() => this.new_hide = false));
        } else {
          this.zone.run(() => this.new_hide = false);
        }
      } else {
        const content_new = content.content_new;
        if (!!content_new && content_new !== '') {
          this.data_db
            .add({ en: content_new, timestamp: new Date() })
            .then(res => {
              this.editorContent_new = null;
              this.zone.run(() => this.new_hide = false);
            });
        } else {
          this.zone.run(() => this.new_hide = false);
        }
      }
    });
  }

  delete_data(item) {
    this.zone.runOutsideAngular(() => {
      this.new_hide = true;
      this.data_db.doc(item.id)
        .delete()
        .then(res => {
          this.zone.run(() => this.new_hide = false);
        });
    });
  }

  pin_track(index) {
    return index;
  }

  @HostListener('scroll', [])
  scrollevent() {
    this.zone.runOutsideAngular(() => {
      this.scrolling_offset =
        this.content_top - this.switch[0].getBoundingClientRect().top;

      for (let i = 0; i < this.switch.length; i++) {
        this.b[i] = this.switch[i].getBoundingClientRect().top / 300;
      }
      this.bg_selected = this.b.findIndex(i => i > 0);
      this.bg_selected = this.bg_selected === -1 ? this.b.length : this.bg_selected;

      this.pin_trigger.forEach((pin, index) => {
        // console.log(pin.getBoundingClientRect().top);
        this.pin_opacity[index] = this.wasm.render_trigger(pin.getBoundingClientRect().top);
      });

      this.scroll_hint_top = this.wasm.render_scroll_hint(this.scrolling_offset);
      this.prologue_box_top = this.wasm.render_prologue_box(this.scrolling_offset);

      for (let i = 0; i < 4; i++) {
        this.fadein[i] = this.wasm.render_fadein(this.scrolling_offset, i + 1);
      }
      this.fadein[4] = this.wasm.render_fadein(this.scrolling_offset, 8);
    });
  }

  ngAfterViewChecked() {
    this.zone.runOutsideAngular(() => {
      this.pin_point = document.querySelectorAll('.pin_point');
      this.pin_trigger = document.querySelectorAll('.pin_trigger');
      this.switch = document.querySelectorAll('.switch');
      this.hidden = document.querySelectorAll('.hidden');

      if (!!this.switch.length && !this.switch_unbind) {
        this.switch_unbind = true;
        this.content_top = this.switch[0].getBoundingClientRect().top;
      }

      if (!!this.pin_trigger.length && !this.pin_unbind) {
        this.pin_unbind = true;
        this.pin_opacity = new Float64Array(this.pin_trigger.length);
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
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    });
  }
}
