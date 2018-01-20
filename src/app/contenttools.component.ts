declare var require: any;
// ContentToolsLib.import('/node_modules/ContentTools/build/content-tools.min.js').then(res => { console.log('OK'); });
const ContentToolsLib = require('../../node_modules/ContentTools/build/content-tools.min.js');

import {
    NgModule, ViewChild, EventEmitter, AfterViewInit,
    ElementRef, Component, Output, Input, OnDestroy, OnChanges
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { log } from 'util';

@Component({
    selector: 'app-content-tools',
    template: '<div #contenttools class="content-tools"><ng-content></ng-content></div>',
})

@NgModule({
    declarations: [ContentToolsComponent],
    exports: [ContentToolsComponent]
})

export class ContentToolsComponent implements AfterViewInit, OnDestroy {
    @Output() save = new EventEmitter<Object>();
    // @Input() editorState;
    @ViewChild('contenttools') element: ElementRef;
    editor = ContentToolsLib.EditorApp.get();

    ngAfterViewInit() {
        this.editor.init('*[data-editable]', 'data-name');
        const that = this;

        this.editor.addEventListener('saved', function (ev) {
            const regions = ev.detail().regions;
            if (Object.keys(regions).length === 0) {
                return;
            }
            that.save.emit(regions);
        });

        // this.editor.addEventListener('start', function (ev) {
        //     const self = this;
        //     function autoSave() {
        //         self.save(true);
        //     };
        //     this.autoSaveTimer = setInterval(autoSave, 5 * 1000);
        // });
    }

    // ngOnChanges() {
    //     if (this.editorState) {
    //         const state = this.editor.getState();
    //         const domRegions = this.editor.domRegions();

    //         console.log('state', state);
    //         console.log('doms', domRegions);

    //         this.editor.syncRegions('*[data-editable]', true);
    //         this.editorState = false;
    //     }
    // }

    ngOnDestroy() {
        this.editor.destroy();
    }

    show_console(e) {
        console.log(e);
    }
}