import {
  Component,
  AfterViewChecked,
  NgZone,
  ViewChild,
  ElementRef,
  HostListener,
  Inject
} from '@angular/core';
import {
  trigger,
  style,
  transition,
  animate,
  state
} from '@angular/animations';
import { DOCUMENT, DomSanitizer } from '@angular/platform-browser';
import { AppService } from '../../app.service';
import { BgLoadingService } from '../bg-loading/bg-loading.service';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.less'],
  animations: [
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
export class JournalComponent implements AfterViewChecked {
  content_top: number;
  index: number;
  scrolling_offset = 0;
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
  editing: boolean;
  hide_content: boolean;
  text_hide: boolean;
  item: object;

  post: Object;
  editorState = false;
  scroll_hint_top: number;
  prologue_box_top: number;
  fadein: Float64Array = new Float64Array(5);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private sanitizer: DomSanitizer,
    private zone: NgZone,
    public databaseService: DatabaseService,
    public appService: AppService,
    public bgLoadingService: BgLoadingService
  ) {
    this.document.documentElement.scrollTop = 0;
  }

  pin_track(index) {
    return index;
  }

  item_trackby(item: object): string {
    return (<any>item).id;
  }

  @HostListener('scroll', [])
  scrollevent() {
    this.zone.runOutsideAngular(() => {
      this.scrolling_offset =
        this.content_top - this.switch[0].getBoundingClientRect().top;

      this.pin_trigger.forEach((pin, index) => {
        this.pin_opacity[index] = this.appService.wasm.render_trigger(pin.getBoundingClientRect().top);
      });

      this.scroll_hint_top = this.appService.wasm.render_scroll_hint(this.scrolling_offset);
      this.prologue_box_top = this.appService.wasm.render_prologue_box(this.scrolling_offset);


      // for (let i = 0; i < 4; i++) {
      //   this.fadein[i] = this.appService.wasm.render_fadein(this.scrolling_offset, i + 1);
      // }
      // this.fadein[4] = this.appService.wasm.render_fadein(this.scrolling_offset, 8);

    });
  }

  get_bg_opacity(i: number): number {
    return this.zone.runOutsideAngular((): number => {
      if (!!this.switch) {
        const this_switch = this.switch[this.bgLoadingService.background.length - i - 1];
        if (!!this_switch) {
          const opacity: number = this.appService.wasm.render_bg(this_switch.getBoundingClientRect().top);
          this.b[i] = opacity;
          this.bg_selected = this.b.findIndex(j => j > 0);
          this.bg_selected = this.bg_selected === -1 ? this.b.length : this.bg_selected;
          return opacity;
        }
      }
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
}
