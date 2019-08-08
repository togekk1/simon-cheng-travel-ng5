/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const response = `worker response to ${data}`;
  postMessage(response);
});


// interface 型態宣告
interface wasm {
  start: Function;
  __allocString: Function;
  __getString: Function;
}

interface response {
  error?: string;
  message?: string;
  path?: string;
  status?: number;
  timestamp?: string;
}

export default function wasmWorker(_args: any) {

  // ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
  // ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
  // █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
  // ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
  // ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
  // ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
  //                          函                        數

  // HTTP請求
  const http_get = async (url: string): Promise<object> => {

    return (await fetch(url, {
      credentials: "same-origin"
    })).json();
  }

  // 傳遞「驗證失敗/登出導回SSO頁面用的網址」給主線程
  const redirect = ((msg: string, hostname: string) => {
    const hostname_sso = hostname.replace(
      /management.*?(?=\.|-develop|-stage|$)/gi,
      'sso'
    );

    postMessage({
      status: 401,
      url: `https://${hostname_sso}/web/signOut.html?redirectUri=https://${hostname_sso}/web/signIn.html?redirectUri=https://${hostname}${msg ? `&failMessage=${msg}.` : null}`
    });
  })

  // AssemblyScript函數庫（很長，請收合起來）
  const loader = (() => {
    const exports: any = {};
    // Runtime header offsets
    const ID_OFFSET = -8;
    const SIZE_OFFSET = -4;

    // Runtime ids
    const ARRAYBUFFER_ID = 0;
    const STRING_ID = 1;

    // Runtime type information
    const ARRAYBUFFERVIEW = 1 << 0;
    const ARRAY = 1 << 1;
    const VAL_ALIGN = 1 << 5;
    const VAL_SIGNED = 1 << 10;
    const VAL_FLOAT = 1 << 11;
    const VAL_MANAGED = 1 << 13;

    // Array(BufferView) layout
    const ARRAYBUFFERVIEW_BUFFER_OFFSET = 0;
    const ARRAYBUFFERVIEW_DATASTART_OFFSET = 4;
    const ARRAYBUFFERVIEW_DATALENGTH_OFFSET = 8;
    const ARRAYBUFFERVIEW_SIZE = 12;
    const ARRAY_LENGTH_OFFSET = 12;
    const ARRAY_SIZE = 16;

    const BIGINT = typeof BigUint64Array !== "undefined";
    const THIS = Symbol();
    const CHUNKSIZE = 1024;

    /** Gets a string from an U32 and an U16 view on a memory. */
    function getStringImpl(U32: any, U16: any, ref: any) {
      var length = U32[(ref + SIZE_OFFSET) >>> 2] >>> 1;
      var offset = ref >>> 1;
      if (length <= CHUNKSIZE) return String.fromCharCode.apply(String, U16.subarray(offset, offset + length));
      const parts = [];
      do {
        const last = U16[offset + CHUNKSIZE - 1];
        const size = last >= 0xD800 && last < 0xDC00 ? CHUNKSIZE - 1 : CHUNKSIZE;
        parts.push(String.fromCharCode.apply(String, U16.subarray(offset, offset += size)));
        length -= size;
      } while (length > CHUNKSIZE);
      return parts.join("") + String.fromCharCode.apply(String, U16.subarray(offset, offset + length));
    }

    /** Prepares the base module prior to instantiation. */
    function preInstantiate(imports: any) {
      const baseModule: any = {};

      function getString(memory: any, ref: any) {
        if (!memory) return "<yet unknown>";
        const buffer = memory.buffer;
        return getStringImpl(new Uint32Array(buffer), new Uint16Array(buffer), ref);
      }

      // add common imports used by stdlib for convenience
      const env = (imports.env = imports.env || {});
      env.abort = env.abort || function abort(mesg: any, file: any, line: any, colm: any) {
        const memory = baseModule.memory || env.memory; // prefer exported, otherwise try imported
        throw Error("abort: " + getString(memory, mesg) + " at " + getString(memory, file) + ":" + line + ":" + colm);
      }
      env.trace = env.trace || function trace(mesg: any, n: any) {
        const memory = baseModule.memory || env.memory;
        console.log("trace: " + getString(memory, mesg) + (n ? " " : "") + Array.prototype.slice.call(arguments, 2, 2 + n).join(", "));
      }
      imports.Math = imports.Math || Math;
      imports.Date = imports.Date || Date;

      return baseModule;
    }

    /** Prepares the final module once instantiation is complete. */
    function postInstantiate(baseModule: any, instance: any) {
      const rawExports = instance.exports;
      const memory = rawExports.memory;
      const table = rawExports.table;
      const alloc = rawExports["__alloc"];
      const retain = rawExports["__retain"];
      const rttiBase = rawExports["__rtti_base"] || ~0; // oob if not present

      // Provide views for all sorts of basic values
      let buffer: any, I8: any, U8: any, I16: any, U16: any, I32: any, U32: any, F32: any, F64: any, I64: any, U64: any;

      /** Updates memory views if memory has grown meanwhile. */
      function checkMem() {
        // see: https://github.com/WebAssembly/design/issues/1210
        if (buffer !== memory.buffer) {
          buffer = memory.buffer;
          I8 = new Int8Array(buffer);
          U8 = new Uint8Array(buffer);
          I16 = new Int16Array(buffer);
          U16 = new Uint16Array(buffer);
          I32 = new Int32Array(buffer);
          U32 = new Uint32Array(buffer);
          if (BIGINT) {
            I64 = new BigInt64Array(buffer);
            U64 = new BigUint64Array(buffer);
          }
          F32 = new Float32Array(buffer);
          F64 = new Float64Array(buffer);
        }
      }
      checkMem();

      /** Gets the runtime type info for the given id. */
      function getInfo(id: number) {
        const count = U32[rttiBase >>> 2];
        if ((id >>>= 0) >= count) throw Error("invalid id: " + id);
        return U32[(rttiBase + 4 >>> 2) + id * 2];
      }

      /** Gets the runtime base id for the given id. */
      function getBase(id: number) {
        const count = U32[rttiBase >>> 2];
        if ((id >>>= 0) >= count) throw Error("invalid id: " + id);
        return U32[(rttiBase + 4 >>> 2) + id * 2 + 1];
      }

      /** Gets the runtime alignment of a collection's values or keys. */
      function getAlign(which: number, info: number) {
        return 31 - Math.clz32((info / which) & 31); // -1 if none
      }

      /** Allocates a new string in the module's memory and returns its retained pointer. */
      function __allocString(str: string) {
        const length = str.length;
        const ref = alloc(length << 1, STRING_ID);
        checkMem();
        for (let i = 0, j = ref >>> 1; i < length; ++i) U16[j + i] = str.charCodeAt(i);
        return ref;
      }

      baseModule.__allocString = __allocString;

      /** Reads a string from the module's memory by its pointer. */
      function __getString(ref: number) {
        checkMem();
        const id = U32[ref + ID_OFFSET >>> 2];
        if (id !== STRING_ID) throw Error("not a string: " + ref);
        return getStringImpl(U32, U16, ref);
      }

      baseModule.__getString = __getString;

      /** Gets the view matching the specified alignment, signedness and floatness. */
      function getView(align: number, signed: number, float: number) {
        if (float) {
          switch (align) {
            case 2: return F32;
            case 3: return F64;
          }
        } else {
          switch (align) {
            case 0: return signed ? I8 : U8;
            case 1: return signed ? I16 : U16;
            case 2: return signed ? I32 : U32;
            case 3: return signed ? I64 : U64;
          }
        }
        throw Error("unsupported align: " + align);
      }

      /** Allocates a new array in the module's memory and returns its retained pointer. */
      function __allocArray(id: number, values: any) {
        const info = getInfo(id);
        if (!(info & (ARRAYBUFFERVIEW | ARRAY))) throw Error("not an array: " + id + " @ " + info);
        const align = getAlign(VAL_ALIGN, info);
        const length = values.length;
        const buf = alloc(length << align, ARRAYBUFFER_ID);
        const arr = alloc(info & ARRAY ? ARRAY_SIZE : ARRAYBUFFERVIEW_SIZE, id);
        checkMem();
        U32[arr + ARRAYBUFFERVIEW_BUFFER_OFFSET >>> 2] = retain(buf);
        U32[arr + ARRAYBUFFERVIEW_DATASTART_OFFSET >>> 2] = buf;
        U32[arr + ARRAYBUFFERVIEW_DATALENGTH_OFFSET >>> 2] = length << align;
        if (info & ARRAY) U32[arr + ARRAY_LENGTH_OFFSET >>> 2] = length;
        const view = getView(align, info & VAL_SIGNED, info & VAL_FLOAT);
        for (let i = 0; i < length; ++i) view[(buf >> align) + i] = values[i];
        if (info & VAL_MANAGED) for (let i = 0; i < length; ++i) retain(values[i]);
        return arr;
      }

      baseModule.__allocArray = __allocArray;

      /** Gets a view on the values of an array in the module's memory. */
      function __getArrayView(arr: number) {
        checkMem();
        const id = U32[arr + ID_OFFSET >>> 2];
        const info = getInfo(id);
        if (!(info & ARRAYBUFFERVIEW)) throw Error("not an array: " + id);
        const align = getAlign(VAL_ALIGN, info);
        var buf = U32[arr + ARRAYBUFFERVIEW_DATASTART_OFFSET >>> 2];
        const length = info & ARRAY
          ? U32[arr + ARRAY_LENGTH_OFFSET >>> 2]
          : U32[buf + SIZE_OFFSET >>> 2] >>> align;
        return getView(align, info & VAL_SIGNED, info & VAL_FLOAT)
          .slice(buf >>>= align, buf + length);
      }

      baseModule.__getArrayView = __getArrayView;

      /** Reads (copies) the values of an array from the module's memory. */
      function __getArray(arr: number) {
        return Array.from(__getArrayView(arr));
      }

      baseModule.__getArray = __getArray;

      /** Tests whether an object is an instance of the class represented by the specified base id. */
      function __instanceof(ref: number, baseId: number) {
        var id = U32[(ref + ID_OFFSET) >>> 2];
        if (id <= U32[rttiBase >>> 2]) {
          do if (id === baseId) return true;
          while (id === getBase(id));
        }
        return false;
      }

      baseModule.__instanceof = __instanceof;

      // Pull basic exports to baseModule so code in preInstantiate can use them
      baseModule.memory = baseModule.memory || memory;
      baseModule.table = baseModule.table || table;

      // Demangle exports and provide the usual utility on the prototype
      return demangle(rawExports, Object.defineProperties(baseModule, {
        I8: { get: function () { checkMem(); return I8; } },
        U8: { get: function () { checkMem(); return U8; } },
        I16: { get: function () { checkMem(); return I16; } },
        U16: { get: function () { checkMem(); return U16; } },
        I32: { get: function () { checkMem(); return I32; } },
        U32: { get: function () { checkMem(); return U32; } },
        I64: { get: function () { checkMem(); return I64; } },
        U64: { get: function () { checkMem(); return U64; } },
        F32: { get: function () { checkMem(); return F32; } },
        F64: { get: function () { checkMem(); return F64; } }
      }));
    }

    /** Wraps a WebAssembly function while also taking care of variable arguments. */
    function wrapFunction(fn: any, setargc: any) {
      var wrap: any = (...args: any) => {
        setargc(args.length);
        return fn(...args);
      }
      wrap.original = fn;
      return wrap;
    }

    /** Instantiates an AssemblyScript module using the specified imports. */
    function instantiate(module: any, imports: any) {
      return postInstantiate(
        preInstantiate(imports || (imports = {})),
        new WebAssembly.Instance(module, imports)
      );
    }

    exports.instantiate = instantiate;

    /** Instantiates an AssemblyScript module from a buffer using the specified imports. */
    function instantiateBuffer(buffer: any, imports: any) {
      return instantiate(new WebAssembly.Module(buffer), imports);
    }

    exports.instantiateBuffer = instantiateBuffer;

    /** Instantiates an AssemblyScript module from a response using the specified imports. */
    function instantiateStreaming(response: any, imports: any) {
      return WebAssembly.instantiateStreaming(response, imports).then((exports: any) => {
        return postInstantiate(preInstantiate(imports || (imports = {})), exports.instance);
      })
    }

    exports.instantiateStreaming = instantiateStreaming;

    /** Demangles an AssemblyScript module's exports to a friendly object structure. */
    function demangle(exports: any, baseModule: any) {
      var module = baseModule ? Object.create(baseModule) : {};
      var setargc = exports["__setargc"] || function () { };
      function hasOwnProperty(elem: any, prop: any) {
        return Object.prototype.hasOwnProperty.call(elem, prop);
      }
      for (let internalName in exports) {
        if (!hasOwnProperty(exports, internalName)) continue;
        let elem = exports[internalName];
        let parts = internalName.split(".");
        let curr = module;
        while (parts.length > 1) {
          let part = parts.shift();
          if (part) {
            if (!hasOwnProperty(curr, part)) curr[part] = {};
            curr = curr[part];
          }
        }
        let name = parts[0];
        let hash = name.indexOf("#");
        if (hash >= 0) {
          let className = name.substring(0, hash);
          let classElem = curr[className];
          if (typeof classElem === "undefined" || !classElem.prototype) {
            let ctor: any = function (...args: any) {
              return ctor.wrap(ctor.prototype.constructor(0, ...args));
            };
            ctor.prototype = {
              valueOf: function valueOf() {
                return this[THIS];
              }
            };
            ctor.wrap = function (thisValue: any) {
              return Object.create(ctor.prototype, { [THIS]: { value: thisValue, writable: false } });
            };
            if (classElem) Object.getOwnPropertyNames(classElem).forEach(name =>
              // @ts-ignore
              Object.defineProperty(ctor, name, Object.getOwnPropertyDescriptor(classElem, name))
            );
            curr[className] = ctor;
          }
          name = name.substring(hash + 1);
          curr = curr[className].prototype;
          if (/^(get|set):/.test(name)) {
            if (!hasOwnProperty(curr, name = name.substring(4))) {
              let getter = exports[internalName.replace("set:", "get:")];
              let setter = exports[internalName.replace("get:", "set:")];
              Object.defineProperty(curr, name, {
                get: function () { return getter(this[THIS]); },
                set: function (value) { setter(this[THIS], value); },
                enumerable: true
              });
            }
          } else {
            if (name === 'constructor') {
              curr[name] = wrapFunction(elem, setargc);
            } else { // for methods
              Object.defineProperty(curr, name, {
                value: function (...args: any) {
                  setargc(args.length);
                  return elem(this[THIS], ...args);
                }
              });
            }
          }
        } else {
          if (/^(get|set):/.test(name)) {
            if (!hasOwnProperty(curr, name = name.substring(4))) {
              Object.defineProperty(curr, name, {
                get: exports[internalName.replace("set:", "get:")],
                set: exports[internalName.replace("get:", "set:")],
                enumerable: true
              });
            }
          } else if (typeof elem === "function") {
            curr[name] = wrapFunction(elem, setargc);
          } else {
            curr[name] = elem;
          }
        }
      }

      return module;
    }

    exports.demangle = demangle;
    return exports;
  })();

  // 宣告接收到訊息時要做的事
  onmessage = async (event: MessageEvent) => {
    // 因為 web worker 不能直接獲取網域名稱，須從主線程傳過來
    const action: string = event.data[0];
    const hostname: string = event.data[1];

    // ███╗   ███╗ █████╗ ██╗███╗   ██╗
    // ████╗ ████║██╔══██╗██║████╗  ██║
    // ██╔████╔██║███████║██║██╔██╗ ██║
    // ██║╚██╔╝██║██╔══██║██║██║╚██╗██║
    // ██║ ╚═╝ ██║██║  ██║██║██║ ╚████║
    // ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝
    // 主             程             式

    switch (action) {
      case 'init':
        // 載入 Webassembly
        try {
          // 宣告匯入內容
          let wasm: wasm;
          const imports: object = {
            env: {
              memory: new WebAssembly.Memory({ initial: 10 }),
              abort: (_filename: string, line: number, column: number) => {
                throw new Error("abort called at " + line + ":" + column);
              },
              logi: (i: number): void => {
                console.log(i);
              },
              log: (ptr: number): void => {
                console.log(wasm.__getString(ptr));
              }
            }
          }

          // 載入 Webassembly
          const response = await fetch(`https://${hostname}/optimized.wasm`);
          // 初始化 Webassembly
          const instance: wasm = await loader.instantiateStreaming(response, imports);
          wasm = instance;    // 將 instance 代入 wasm 變數給大家使用
        }
        // 載入或初始化失敗
        catch (err) {
          console.error('No webassembly...:(');
        }

        // 驗證 SSO Token
        http_get(`https://${hostname}/v2.0/users/me`).then((response: response): void => {
          if (response.message && response.status === 401) redirect(response.message, hostname);      // 如果回傳401錯誤，即驗證失敗，導回SSO頁面
          else postMessage(response);     // 將結果回傳給主線程
        }).catch((err: string) => console.error(err));
        break;
    }
  }
}
