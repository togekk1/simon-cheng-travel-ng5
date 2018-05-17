import { Directive, EventEmitter, OnInit, Output } from '@angular/core';


@Directive({
    selector: '[ngInit]'
})
export class NgInitDirective implements OnInit {
    @Output() init = new EventEmitter()
    ngOnInit() { this.init.emit(null); }
}