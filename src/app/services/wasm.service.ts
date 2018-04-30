import { Injectable, NgZone } from '@angular/core';

@Injectable()
export class WasmService {
  asc: any;

  constructor(
    private zone: NgZone
  ) {
    this.zone.runOutsideAngular(async (): Promise<any> => {
      const wasmCacheVersion = 1;
      const instance = await this.instantiateCachedURL(wasmCacheVersion, 'assets/optimized.wasm');
      this.asc = instance.exports;
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
  instantiateCachedURL(dbVersion, url) {
    const dbName = 'wasm-cache';
    const storeName = 'wasm-cache';

    // With all the Promise helper functions defined, we can now express the core
    // logic of an IndexedDB cache lookup. We start by trying to open a database.
    return this.openDatabase(dbName, dbVersion, storeName).then(db => {
      // Now see if we already have a compiled Module with key 'url' in 'db':
      return this.lookupInDatabase(db, storeName, url).then(module => {
        // We do! Instantiate it with the given import object.
        console.log(`Found ${url} in wasm cache`);
        return WebAssembly.instantiate(module);
      }, errMsg => {
        // Nope! Compile from scratch and then store the compiled Module in 'db'
        // with key 'url' for next time.
        console.log(errMsg);
        return WebAssembly.instantiateStreaming(fetch(url)).then(results => {
          this.storeInDatabase(db, results.module, storeName, url);
          return results.instance;
        });
      });
    },
      errMsg => {
        // If opening the database failed (due to permissions or quota), fall back
        // to simply fetching and compiling the module and don't try to store the
        // results.
        console.log(errMsg);
        return WebAssembly.instantiateStreaming(fetch(url)).then(results => {
          return results.instance;
        });
      });
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
    const request = store.put(module, url);
    request.onerror = err => { console.log(`Failed to store in wasm cache: ${err}`); };
    request.onsuccess = err => { console.log(`Successfully stored ${url} in wasm cache`); };
  }
}
