import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
  intro_show: boolean;
  wasm: any;

  constructor() {
    // WASM
    const importObject = { imports: { imported_func: arg => console.log(arg) } };
    fetch('assets/optimized.wasm').then(response =>
      response.arrayBuffer()
    ).then(bytes =>
      WebAssembly.instantiate(bytes, importObject)
    ).then(results => {
      this.wasm = results.instance.exports;
    });
  }

}
