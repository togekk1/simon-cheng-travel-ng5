import { Directive, Input } from '@angular/core';


@Directive({
    selector: '[ngInit]'
})
export class NgInitDirective {
    @Input() ngInit;
    ngOnInit() {
        if (this.ngInit) {
            this.ngInit();
        }
    }
}