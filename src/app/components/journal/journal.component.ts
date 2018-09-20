import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, Inject, Input, NgZone, Output } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { AppService } from '../../app.service';
import { DatabaseService } from '../../services/database.service';
import { WasmService } from '../../services/wasm.service';
import { BgLoadingService } from '../bg-loading/bg-loading.service';

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
export class JournalComponent {
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
  pass_show: boolean;
  editing: boolean;
  hide_content: boolean;
  text_hide: boolean;
  item: object;
  post: Object;
  editorState: boolean;

  fadein_arr: Int32Array;
  pin_arr: Int32Array;
  bg_arr: Int32Array;
  arr: Float64Array;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private zone: NgZone,
    public databaseService: DatabaseService,
    public wasmService: WasmService,
    public bgLoadingService: BgLoadingService,
    private appService: AppService
  ) {
    this.zone.runOutsideAngular(() => {
      this.arr = this.wasmService.asc.F64;
      this.fadein_arr = new Int32Array(5);
      for (let i = 0; i < 5; i++)
        this.fadein_arr[i] = this.wasmService.asc.memory_allocate(1);
    })
  }

  get_opacity() {
    if (!!this.switch && !!this.switch.length) {
      this.wasmService.asc.render_fadein(this.appService.content_top, this.switch[0].getBoundingClientRect().top, this.fadein_arr[0]);
      return this.arr[this.fadein_arr[0] >>> 3];
    }
  }

  pin_track(index) {
    return index;
  }

  item_trackby(item: object): string {
    return (<any>item).id;
  }

  @HostListener('scroll', [])
  scrollevent() { }

  get_bg_opacity() {
    this.zone.runOutsideAngular(() => {
      if (!!this.switch && !!this.switch.length) {
        for (let i = 0; i < this.switch.length; i++) {
          this.arr[this.bg_arr[i] >>> 3] = this.switch[i].getBoundingClientRect().top;
        }
        this.wasmService.asc.render_bg(this.bg_arr[0], this.switch.length);
        this.bg_selected = this.bg_arr.findIndex(j => this.arr[j >>> 3] > 0);
        this.bg_selected = this.bg_selected === -1 ? this.switch.length : this.bg_selected;
      }
    });
  }

  get_pin_opacity() {
    this.zone.runOutsideAngular(() => {
      this.pin_trigger.forEach((pin, index) => {
        this.arr[this.pin_arr[index] >>> 3] = pin.getBoundingClientRect().top;
      });
      this.wasmService.asc.render_trigger(this.pin_arr[0], this.pin_trigger.length);
    })
  }

  get_value(ptr: number) {
    return this.arr[ptr >>> 3];
  }


  get_bg_value(i: number) {
    const index = this.bgLoadingService.background.length - i - 1;
    if (index < this.switch.length)
      return this.arr[this.bg_arr[index] >>> 3];
    if (index === this.switch.length)
      return 1;
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
            this.pin_arr = new Int32Array(this.pin_trigger.length);
            for (let i = 0; i < this.pin_trigger.length; i++)
              this.pin_arr[i] = this.wasmService.asc.memory_allocate(1);
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
    this.bg_arr = new Int32Array(this.switch.length);
    for (let i = 0; i < this.switch.length; i++)
      this.bg_arr[i] = this.wasmService.asc.memory_allocate(1);
  }
}
