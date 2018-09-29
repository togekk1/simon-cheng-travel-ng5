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

  fadein_first: number;
  fadein_first_ptr: number;
  pin_first: number;
  pin_first_ptr: number;
  bg_first: number;
  bg_first_ptr: number;
  F64: Float64Array = this.wasmService.asc.F64;
  // arr: Float64Array;

  scroll_hint_opacity: number;
  prologue_box_opacity: number;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private zone: NgZone,
    public databaseService: DatabaseService,
    public wasmService: WasmService,
    public bgLoadingService: BgLoadingService,
    private appService: AppService
  ) {
    this.zone.runOutsideAngular(() => {
      let fadein_first: number;
      const allocate = this.wasmService.asc.memory.allocate;

      fadein_first = allocate(1);
      for (let i = 0; i < 4; i++) allocate(1);

      this.fadein_first = fadein_first >>> 3;
      this.fadein_first_ptr = fadein_first;
    })
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

      const asc = this.wasmService.asc;

      // get pin opacity
      const F64 = this.F64, pin_trigger = this.pin_trigger, pin_first = this.pin_first;
      if (pin_trigger) {
        pin_trigger.forEach((pin, index) => {
          F64[pin_first + index] = pin.getBoundingClientRect().top;
        });
        asc.render_trigger(this.pin_first_ptr, pin_trigger.length);
      }

      const _switch = this.switch;
      if (!!_switch && !!_switch.length) {

        // Get fadein opacity
        asc.render_fadein(this.appService.content_top, _switch[0].getBoundingClientRect().top, this.fadein_first_ptr);

        // Get backgroud opacity
        const F64 = this.F64, bg_first = this.bg_first;
        let bg_selected: number;
        for (let i = 0; i < _switch.length; i++) {
          F64[bg_first + i] = _switch[i].getBoundingClientRect().top;
          if (F64[bg_first + i] > 0 && !bg_selected) bg_selected = i;
        }
        asc.render_bg(this.bg_first_ptr, _switch.length + 1);
        this.bg_selected = bg_selected === -1 ? _switch.length : bg_selected;

        const content_top = this.appService.content_top, switch_top = _switch[0].getBoundingClientRect().top;

        // Get scroll hint opacity
        this.scroll_hint_opacity = asc.render_scroll_hint(content_top, switch_top);

        // Get prologue box opacity
        this.prologue_box_opacity = asc.render_prologue_box(content_top, switch_top);
      }
    });
  }

  render_content(last: boolean, i: number, item: object): void {
    return this.zone.runOutsideAngular(() => {
      let content_root;
      const allocate = this.wasmService.asc.memory.allocate,

        render_switch = () => {
          const _switch = document.querySelectorAll('.switch'),
            appService = this.appService
          if (!appService.content_top)
            appService.content_top = _switch[0].getBoundingClientRect().top;
          const bg_first_ptr = allocate(1);
          for (let i = 0; i < _switch.length - 1; i++) allocate(1);
          allocate(1);
          this.bg_first_ptr = bg_first_ptr;
          this.bg_first = bg_first_ptr >>> 3;
          this.switch = _switch;
        }

      if (!this.authorized) {
        content_root = document.getElementById('content' + i);
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
            const triggers = this.triggers;
            Array.from(pin_point).forEach(el => {
              triggers.push(el.innerHTML);
              el.remove();
            });
            this.triggers = triggers;

            Array.from(pin_trigger).forEach(el => {
              (<any>el).style.height = '1100px';
            });
          }

          content_root.appendChild(frag);

          if (last) {
            const pin_trigger = document.querySelectorAll('.pin_trigger'),
              pin_first_ptr = allocate(1);
            for (let i = 0; i < pin_trigger.length - 1; i++) allocate(1);
            this.pin_first_ptr = pin_first_ptr;
            this.pin_first = pin_first_ptr >>> 3;
            this.pin_trigger = pin_trigger;
            render_switch();
          }
        }
      } else {
        content_root = document.getElementById('edit' + i);
        if (!!content_root) {
          (<any>item).unbind = true;
          last && render_switch();
        }
      }
    });
  }


}
