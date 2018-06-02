import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, Inject, NgZone, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { DOCUMENT, DomSanitizer } from '@angular/platform-browser';

import { DatabaseService } from '../../services/database.service';
import { WasmService } from '../../services/wasm.service';
import { BgLoadingService } from '../bg-loading/bg-loading.service';
import { AppService } from '../../app.service';

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
    ]),
    trigger('text', [
      state('on', style({ opacity: 1 })),
      transition(':enter', animate('1s linear')),
      transition(':leave', animate('2s linear', style({ opacity: 0 })))
    ])
  ]
})
export class JournalComponent implements OnDestroy {
  @Input() authorized: boolean;
  @Output() refresh: EventEmitter<void> = new EventEmitter();
  content_top: number;
  index: number;
  pin_point: any;
  pin_trigger: any;
  pin_trigger_new: any;
  triggers: Array<string> = new Array();
  switch_top: number;
  opacity_arr: Array<any> = [];
  bg_selected = 0;
  switch: any;
  hidden: any;
  switch_unbind: boolean;
  pin_unbind: boolean;
  trigger_unbind: boolean;
  hidden_unbind: boolean;
  editorContent: Array<any> = [];
  // authorized: boolean;
  pass_show: boolean;
  editing: boolean;
  hide_content: boolean;
  text_hide: boolean;
  item: object;
  post: Object;
  editorState: boolean;

  top_arr: number;
  pin_arr: number;
  top_arr_offset: number = 17;
  pin_arr_offset: number = 27;
  arr: Float64Array;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    // private sanitizer: DomSanitizer,
    private zone: NgZone,
    public databaseService: DatabaseService,
    public wasmService: WasmService,
    public bgLoadingService: BgLoadingService,
    private appService: AppService
  ) {
    this.zone.runOutsideAngular(() => {
      // this.document.documentElement.scrollTop = 0;
      this.arr = this.wasmService.asc.F64;
      this.top_arr = this.wasmService.asc.new_array();
    })
  }

  get_opacity() {
    if (!!this.switch && !!this.switch.length) {
      this.wasmService.asc.render_fadein(this.appService.content_top, this.switch[0].getBoundingClientRect().top, this.top_arr);
      return this.arr[this.top_arr_offset];
    }
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
      if (!!this.switch && !!this.switch.length) {
        for (let i = 0; i < this.switch.length; i++) {
          this.opacity_arr[i] = this.wasmService.asc.render_bg(this.switch[i].getBoundingClientRect().top);
        }

        console.log(this.switch);

        this.bg_selected = this.opacity_arr.findIndex(j => j > 0);
        this.bg_selected = this.bg_selected === -1 ? this.opacity_arr.length : this.bg_selected;
      }
    });
  }

  get_pin_opacity() {
    this.zone.runOutsideAngular(() => {
      this.pin_trigger.forEach((pin, index) => {
        this.arr[this.pin_arr_offset + index] = pin.getBoundingClientRect().top;
      });
      this.wasmService.asc.render_trigger(this.pin_arr);
      return this.arr[this.pin_arr_offset];
    })
  }

  get_scroll_hint_opacity() {
    if (!!this.switch && !!this.switch.length)
      return this.wasmService.asc.render_scroll_hint(this.appService.content_top, this.switch[0].getBoundingClientRect().top);
  }

  get_prologue_box_opacity() {
    if (!!this.switch && !!this.switch.length)
      return this.wasmService.asc.render_prologue_box(this.appService.content_top, this.switch[0].getBoundingClientRect().top);
  }

  render_content(last: boolean, i: number, item: object): void {
    return this.zone.runOutsideAngular(() => {
      if (!this.authorized) {
        const content_root = document.getElementById('content' + i);
        if (!!content_root) {
          (<any>item).unbind = true;
          const content = document.createElement('div');
          content.innerHTML = (<any>item).en;
          const frag = document.createDocumentFragment();
          frag.appendChild(content);
          const pin_point = frag.querySelectorAll('.pin_point');
          const pin_trigger = frag.querySelectorAll('.pin_trigger');
          const hidden = frag.querySelectorAll('.hidden');

          // Hidden Paragraphs
          if (!!hidden.length && !this.hidden_unbind) {
            this.hidden_unbind = true;
            Array.from(hidden).forEach(el => {
              (<any>el).style.opacity = '0';
            });
          }

          // Pin Triggers
          if (
            !!pin_point.length &&
            !!pin_trigger.length &&
            !this.trigger_unbind
          ) {
            Array.from(pin_point).forEach(el => {
              this.triggers.push(el.innerHTML);
              el.remove();
            });

            Array.from(pin_trigger).forEach(el => {
              (<any>el).style.height = '1100px';
            });
          }

          content_root.appendChild(frag);

          if (last) {
            this.pin_trigger = document.querySelectorAll('.pin_trigger');
            this.pin_arr = this.wasmService.asc.new_pin_array(this.pin_trigger.length);
            this.render_switch();
          }
        }
      } else {
        const content_root = document.getElementById('edit' + i);
        if (!!content_root) {
          (<any>item).unbind = true;
          last && this.render_switch();
        }
      }
    });
  }

  render_switch() {
    this.switch = document.querySelectorAll('.switch');
    if (!this.appService.content_top)
      this.appService.content_top = this.switch[0].getBoundingClientRect().top;
  }

  ngOnDestroy() {
    this.wasmService.asc.reset_memory();
  }
}
