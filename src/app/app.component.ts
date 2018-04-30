import {
  Component,
  AnimationTransitionEvent,
  AfterViewInit,
  NgZone,
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
import { AppService } from './app.service';
import { WasmService } from './services/wasm.service';
import { BgLoadingService } from './components/bg-loading/bg-loading.service';
import { DatabaseService } from './services/database.service';

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
    });
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

}
