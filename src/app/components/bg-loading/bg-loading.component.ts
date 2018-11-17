import { Component, NgZone } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppService } from '../../app.service';
import { DatabaseService } from '../../services/database.service';
import { WasmService } from '../../services/wasm.service';
import { BgLoadingService } from '../bg-loading/bg-loading.service';

@Component({
  selector: 'app-bg-loading',
  templateUrl: './bg-loading.component.html',
  styleUrls: ['./bg-loading.component.less']
})
export class BgLoadingComponent {
  loading_percentage = '0';
  response: object;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private bgLoadingService: BgLoadingService,
    private databaseService: DatabaseService,
    private ngProgress: NgProgress,
    private wasmService: WasmService,
    private appService: AppService,
    private zone: NgZone
  ) {
    this.zone.runOutsideAngular(() => {
      const progress = ngProgress.ref();
      progress.set(0);
      progress.start();
      const completedPercentage: Array<any> = [];
      let sum: number;
      this.databaseService.load_bg()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((res: object) => {
          for (let i = 0; i < this.bgLoadingService.background.length; i++) {
            const xmlHTTP = new XMLHttpRequest();
            xmlHTTP.open('GET', (<any>this.bgLoadingService.background[i]).org, true);
            xmlHTTP.responseType = 'arraybuffer';
            // xmlHTTP.onload = e => {
            //   const blob = new Blob([this.response]);
            //   const src = window.URL.createObjectURL(blob);
            // };
            xmlHTTP.onprogress = e => {
              completedPercentage[i] = e.loaded / e.total * 100;
              sum =
                parseInt(completedPercentage.reduce((a, b) => a + b, 0), 10) /
                this.bgLoadingService.background.length;
              this.zone.run(() => {
                this.loading_percentage = sum.toFixed(0);
                this.appService.intro_show = completedPercentage[0] === 100;
                if (sum === 100) {
                  progress.complete();
                }
              });
            };
            xmlHTTP.onloadstart = () => {
              completedPercentage[i] = 0;
            };
            xmlHTTP.send();
          }
        });
    });
  }
}
