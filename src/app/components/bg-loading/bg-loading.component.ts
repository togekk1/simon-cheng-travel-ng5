import { Component, NgZone } from '@angular/core';
import { BgLoadingService } from '../bg-loading/bg-loading.service';
import { DatabaseService } from '../../services/database.service';
import { NgProgress } from 'ngx-progressbar';
import { AppService } from '../../app.service';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

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
    private appService: AppService,
    private zone: NgZone
  ) {
    this.loading();
  }
  loading() {
    this.zone.runOutsideAngular(() => {
      this.zone.run(() => {
        this.ngProgress.set(0);
        this.ngProgress.start();
      });
      const completedPercentage: Array<any> = [];
      let sum: number;
      this.databaseService.load_bg()
        .takeUntil(this.ngUnsubscribe)
        .subscribe((res: object) => {
          for (let i = 0; i < this.bgLoadingService.background.length; i++) {
            const xmlHTTP = new XMLHttpRequest();
            xmlHTTP.open('GET', (<any>this.bgLoadingService.background[i]).org, true);
            xmlHTTP.responseType = 'arraybuffer';
            xmlHTTP.onload = e => {
              const blob = new Blob([this.response]);
              const src = window.URL.createObjectURL(blob);
            };
            xmlHTTP.onprogress = e => {
              completedPercentage[i] = e.loaded / e.total * 100;
              sum =
                parseInt(completedPercentage.reduce((a, b) => a + b, 0), 10) /
                this.bgLoadingService.background.length;
              this.zone.run(() => {
                this.loading_percentage = sum.toFixed(0);
                this.appService.intro_show = completedPercentage[0] === 100;
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
    });
  }
}
