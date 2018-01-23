import { Directive, AfterViewInit, ElementRef, NgZone } from "@angular/core";

@Directive({
  selector: "[appAutofocus]"
})
export class AutofocusDirective implements AfterViewInit {
  constructor(private el: ElementRef, private zone: NgZone) {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.el.nativeElement.focus();
    });
  }
}
