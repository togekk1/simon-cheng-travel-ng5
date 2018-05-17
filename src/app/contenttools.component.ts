import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';

declare var require: any;
// ContentToolsLib.import('/node_modules/ContentTools/build/content-tools.min.js').then(res => { console.log('OK'); });
const ContentToolsLib = require('../../node_modules/ContentTools/build/content-tools.js');

@Component({
  selector: 'app-content-tools',
  template:
    '<div #contenttools class="content-tools"><ng-content></ng-content></div>'
})
@NgModule({
  declarations: [ContentToolsComponent],
  exports: [ContentToolsComponent]
})
export class ContentToolsComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Output() save = new EventEmitter<Object>();
  @Input() editorState;
  @ViewChild('contenttools') element: ElementRef;
  editor = ContentToolsLib.EditorApp.get();
  not_first_time: boolean;

  constructor(private zone: NgZone) { }

  ngAfterViewInit() {
    const that = this;
    this.zone.runOutsideAngular(() => {
      this.editor.init('*[data-editable]', 'data-name');

      this.editor.addEventListener('saved', function (ev) {
        const regions = ev.detail().regions;
        if (Object.keys(regions).length === 0) {
          return;
        }
        that.save.emit(regions);
      });
    });

  }

  ngOnChanges() {
    this.zone.runOutsideAngular(() => {
      if (this.editorState && this.not_first_time) {
        // const domRegions = this.editor.domRegions();

        // console.log('doms', domRegions);

        this.editor.syncRegions('*[data-editable]', true);
        this.editorState = false;

      }
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      this.editor.destroy();
    });
  }


}
