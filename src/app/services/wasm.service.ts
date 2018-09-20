declare var require: any;
import { Injectable, NgZone } from '@angular/core';
import { environment } from "../../environments/environment";
import wasmWorker from 'wasm-worker';

@Injectable()
export class WasmService {
  asc: any;

  constructor(
    private zone: NgZone
  ) {
    this.zone.runOutsideAngular(async (): Promise<any> => {
      const wasmCacheVersion = 9;
      const url = 'assets/optimized.wasm';
      const instance = await this.instantiateCachedURL(wasmCacheVersion, url);
      this.asc = instance;
    });
  }

  // 1. +++ instantiateCachedURL() +++ //

  // This library function fetches the wasm Module at 'url', instantiates it with
  // the given 'importObject', and returns a Promise resolving to the finished
  // wasm Instance. Additionally, the function attempts to cache the compiled wasm
  // Module in IndexedDB using 'url' as the key. The entire site's wasm cache (not
  // just the given URL) is versioned by dbVersion and any change in dbVersion on
  // any call to instantiateCachedURL() will conservatively clear out the entire
  // cache to avoid stale modules.
  async instantiateCachedURL(dbVersion, url) {
    const dbName = 'wasm-cache';
    const storeName = 'wasm-cache';
    const loader = require("../assemblyscript/lib/loader");

    if (environment.production) {
      // With all the Promise helper functions defined, we can now express the core
      // logic of an IndexedDB cache lookup. We start by trying to open a database.
      return this.openDatabase(dbName, dbVersion, storeName).then(db => {
        // Now see if we already have a compiled Module with key 'url' in 'db':
        return this.lookupInDatabase(db, storeName, url).then(module => {
          // We do! Instantiate it with the given import object.
          console.log(`Found ${url} in wasm cache`);
          return loader.instantiate(module);
        }, async errMsg => {
          // Nope! Compile from scratch and then store the compiled Module in 'db'
          // with key 'url' for next time.
          console.log(errMsg);
          const response = await fetch(url);
          const myModule = await WebAssembly.compileStreaming(response);
          const instance = await loader.instantiate(myModule);
          this.storeInDatabase(db, myModule, storeName, url);
          return instance;
        });
      },
        async errMsg => {
          // If opening the database failed (due to permissions or quota), fall back
          // to simply fetching and compiling the module and don't try to store the
          // results.
          console.log(errMsg);
          const response = await fetch(url);
          const myModule = await WebAssembly.compileStreaming(response);
          const instance = await loader.instantiate(myModule);
          return instance;
        });
    } else {
      console.log('Running in Development Mode. No wasm caching.');
      const memory = new WebAssembly.Memory({ initial: 256 });
      const myModule = await wasmWorker(url, {
        getImportObject: memory => ({
          memory,
          env: {
            abort(msg, file, line, column) {
              console.error("abort called at main.ts:" + line + ":" + column);
            }
          }
        })
      })
      const exports = myModule.exports;
      exports.memory_allocate = exports["memory.allocate"];
      exports.memory_fill = exports["memory.fill"];
      exports.memory_reset = exports["memory.reset"];
      exports.F64 = new Float64Array(memory.buffer);
      return exports;
    }
  }

  // This helper function Promise-ifies the operation of opening an IndexedDB
  // database and clearing out the cache when the version changes.
  openDatabase(dbName, dbVersion, storeName) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, dbVersion);
      request.onerror = reject.bind(null, 'Error opening wasm cache database');
      request.onsuccess = () => { resolve(request.result); };
      request.onupgradeneeded = event => {
        const db = request.result;
        if (db.objectStoreNames.contains(storeName)) {
          console.log(`Clearing out version ${event.oldVersion} wasm cache`);
          db.deleteObjectStore(storeName);
        }
        console.log(`Creating version ${event.newVersion} wasm cache`);
        db.createObjectStore(storeName);
      };
    });
  }

  // This helper function Promise-ifies the operation of looking up 'url' in the
  // given IDBDatabase.
  lookupInDatabase(db, storeName, url) {
    return new Promise((resolve, reject) => {
      const store = db.transaction([storeName]).objectStore(storeName);
      const request = store.get(url);
      request.onerror = reject.bind(null, `Error getting wasm module ${url}`);
      request.onsuccess = event => {
        if (request.result) {
          resolve(request.result);
        } else {
          reject(`Module ${url} was not found in wasm cache`);
        }
      };
    });
  }

  // This helper function fires off an async operation to store the given wasm
  // Module in the given IDBDatabase.
  storeInDatabase(db, module, storeName, url) {
    const store = db.transaction([storeName], 'readwrite').objectStore(storeName);
    try {
      const request = store.put(module, url);
      request.onerror = err => { console.log(`Failed to store in wasm cache: ${err}`); };
      request.onsuccess = err => { console.log(`Successfully stored ${url} in wasm cache`); };
    } catch {
      console.log('Your broswer doesn\'t support structured cloning of WebAssembly.Module. Open chrome://flags/#enable-webassembly to enable it.');
    }
  }
}
