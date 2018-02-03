import { Directive, EventEmitter, Output, OnInit } from '@angular/core';


@Directive({
    selector: '[ngInit]'
})
export class NgInitDirective implements OnInit {
    @Output() init = new EventEmitter()
    ngOnInit() { this.init.emit(null); }
}