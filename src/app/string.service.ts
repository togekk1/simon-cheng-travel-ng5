declare var require;

import { Injectable, NgZone } from '@angular/core';

@Injectable()
export class WASMService {
  mod: any;
  MyCode: any;

  constructor(private zone: NgZone) {
    this.zone.runOutsideAngular(() => {
      this.MyCode = require('./arrayindexof.service.js');
      this.MyCode().then(Module => {
        this.mod = Module;
      });
    });
  }

  send_string(string) {
    return this.zone.runOutsideAngular(() => {

      let stringOnWasmHeap;

      const lengthBytes = this.mod.lengthBytesUTF8(string) + 1; // get string length in bytes
      stringOnWasmHeap = this.mod.getMemory(lengthBytes); // get memory address in wasm heap
      this.mod.stringToUTF8(string, stringOnWasmHeap, lengthBytes + 1); // use 'stringToUTF8' funciton to write string in wasm heap

      return stringOnWasmHeap;

    });
  }


  arrayIndexOf(obj_arr, value) {
    return this.zone.runOutsideAngular(() => {

      let id;

      const obj = JSON.stringify(obj_arr);
      const obj_heap = this.send_string(obj);
      const str_heap = this.send_string(value);
      id = this.mod._arrayIndexOf(obj_heap, str_heap, obj_arr.length, Object.keys(obj_arr[0]).length);

      return id;

    });
  }

}
