declare var require: any;
import { Injectable, NgZone } from '@angular/core';

@Injectable()
export class WasmService {
  asc: any;

  constructor(
    private zone: NgZone
  ) {
    this.zone.runOutsideAngular(async (): Promise<any> => {
      const loader = require("../../../node_modules/assemblyscript/lib/loader");
      const instance = await loader.instantiateStreaming(await fetch('assets/optimized.wasm'));
      this.asc = instance;
    });
  }
}
