import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from '../environments/environment';

import { AppService } from './app.service';
import { BgLoadingService } from './components/bg-loading/bg-loading.service';
import { DatabaseService } from './services/database.service';
import { WasmService } from './services/wasm.service';

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
    ])
  ]
})

export class AppComponent implements AfterViewInit {
  loading_hidden: boolean;
  title_show: string;
  content_page_show: boolean;
  disabled = true;
  leave: boolean;
  password_group: FormGroup;
  authorized: boolean;
  pass_show: boolean;
  prod: boolean;

  constructor(
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    public wasmService: WasmService,
    public appService: AppService,
    private bgLoadingService: BgLoadingService,
    public databaseService: DatabaseService
  ) {
    this.zone.runOutsideAngular(() => {
      this.password_group = new FormGroup({
        password: new FormControl()
      });
      this.prod = environment.production;
    });
  }

  authorize() {
    this.zone.runOutsideAngular(() => {
      if (this.password_group.value.password === this.databaseService.password) {
        if (this.content_page_show) {
          this.refresh(true);
        } else {
          this.authorized = true;
          console.log('Enter editing mode');
        }
      }
    })
  }

  refresh(authorized) {
    this.zone.runOutsideAngular(() => {
      this.databaseService.refresh = false;
      this.content_page_show = false;
      this.wasmService.asc.memory.reset();
      window.setTimeout(() => {
        this.authorized = authorized;
        this.content_page_show = true;
        authorized && console.log('Enter editing mode');
        !authorized && console.log('Return to view mode');
      }, 1);
    })
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

}
