(module
 (type $v (func))
 (type $iv (func (param i32)))
 (type $ii (func (param i32) (result i32)))
 (type $iiF (func (param i32 i32) (result f64)))
 (type $iiiiv (func (param i32 i32 i32 i32)))
 (type $iiFv (func (param i32 i32 f64)))
 (type $FFF (func (param f64 f64) (result f64)))
 (type $FFiv (func (param f64 f64 i32)))
 (type $FF (func (param f64) (result f64)))
 (type $iiii (func (param i32 i32 i32) (result i32)))
 (type $i (func (result i32)))
 (type $iii (func (param i32 i32) (result i32)))
 (type $iiiv (func (param i32 i32 i32)))
 (import "env" "abort" (func $~lib/env/abort (param i32 i32 i32 i32)))
 (global $~lib/allocator/arena/startOffset (mut i32) (i32.const 0))
 (global $~lib/allocator/arena/offset (mut i32) (i32.const 0))
 (global $HEAP_BASE i32 (i32.const 128))
 (memory $0 1)
 (data (i32.const 8) "\1b\00\00\00~\00l\00i\00b\00/\00i\00n\00t\00e\00r\00n\00a\00l\00/\00t\00y\00p\00e\00d\00a\00r\00r\00a\00y\00.\00t\00s")
 (data (i32.const 68) "\1c\00\00\00~\00l\00i\00b\00/\00i\00n\00t\00e\00r\00n\00a\00l\00/\00a\00r\00r\00a\00y\00b\00u\00f\00f\00e\00r\00.\00t\00s")
 (export "reset_memory" (func $~lib/allocator/arena/reset_memory))
 (export "render_trigger" (func $assembly/index/render_trigger))
 (export "render_scroll_hint" (func $assembly/index/render_scroll_hint))
 (export "render_prologue_box" (func $assembly/index/render_prologue_box))
 (export "render_fadein" (func $assembly/index/render_fadein))
 (export "render_bg" (func $assembly/index/render_bg))
 (export "bg_show" (func $assembly/index/bg_show))
 (export "new_array" (func $assembly/index/new_array))
 (export "new_pin_array" (func $assembly/index/new_pin_array))
 (export "memory" (memory $0))
 (start $start)
 (func $~lib/allocator/arena/reset_memory (; 1 ;) (type $v)
  ;;@ ~lib/allocator/arena.ts:43:37
  (set_global $~lib/allocator/arena/offset
   ;;@ ~lib/allocator/arena.ts:44:11
   (get_global $~lib/allocator/arena/startOffset)
  )
 )
 (func $~lib/internal/typedarray/TypedArray<f64,f64>#__get (; 2 ;) (type $iiF) (param $0 i32) (param $1 i32) (result f64)
  (local $2 i32)
  ;;@ ~lib/internal/typedarray.ts:35:4
  (if
   ;;@ ~lib/internal/typedarray.ts:35:8
   (i32.ge_u
    (get_local $1)
    ;;@ ~lib/internal/typedarray.ts:34:24
    (i32.shr_u
     (i32.sub
      ;;@ ~lib/internal/typedarray.ts:34:25
      (i32.load offset=8
       (get_local $0)
      )
      ;;@ ~lib/internal/typedarray.ts:33:4
      (tee_local $2
       ;;@ ~lib/internal/typedarray.ts:33:21
       (i32.load offset=4
        (get_local $0)
       )
      )
     )
     ;;@ ~lib/internal/typedarray.ts:34:59
     (i32.const 3)
    )
   )
   ;;@ ~lib/internal/typedarray.ts:35:42
   (block
    (call $~lib/env/abort
     (i32.const 0)
     (i32.const 8)
     (i32.const 35)
     (i32.const 42)
    )
    (unreachable)
   )
  )
  ;;@ ~lib/internal/arraybuffer.ts:74:9
  (f64.load offset=8
   ;;@ ~lib/internal/arraybuffer.ts:74:20
   (i32.add
    (i32.add
     ;;@ ~lib/internal/typedarray.ts:36:37
     (i32.load
      (get_local $0)
     )
     ;;@ ~lib/internal/arraybuffer.ts:74:48
     (get_local $2)
    )
    ;;@ ~lib/internal/arraybuffer.ts:74:68
    (i32.shl
     ;;@ ~lib/internal/arraybuffer.ts:74:69
     (get_local $1)
     ;;@ ~lib/internal/arraybuffer.ts:74:85
     (i32.const 3)
    )
   )
  )
 )
 (func $~lib/internal/typedarray/TypedArray<f64,f64>#__set (; 3 ;) (type $iiFv) (param $0 i32) (param $1 i32) (param $2 f64)
  (local $3 i32)
  ;;@ ~lib/internal/typedarray.ts:48:4
  (if
   ;;@ ~lib/internal/typedarray.ts:48:8
   (i32.ge_u
    (get_local $1)
    ;;@ ~lib/internal/typedarray.ts:47:24
    (i32.shr_u
     (i32.sub
      ;;@ ~lib/internal/typedarray.ts:47:25
      (i32.load offset=8
       (get_local $0)
      )
      ;;@ ~lib/internal/typedarray.ts:46:4
      (tee_local $3
       ;;@ ~lib/internal/typedarray.ts:46:21
       (i32.load offset=4
        (get_local $0)
       )
      )
     )
     ;;@ ~lib/internal/typedarray.ts:47:59
     (i32.const 3)
    )
   )
   ;;@ ~lib/internal/typedarray.ts:48:42
   (block
    (call $~lib/env/abort
     (i32.const 0)
     (i32.const 8)
     (i32.const 48)
     (i32.const 42)
    )
    (unreachable)
   )
  )
  ;;@ ~lib/internal/arraybuffer.ts:79:2
  (f64.store offset=8
   ;;@ ~lib/internal/arraybuffer.ts:79:11
   (i32.add
    (i32.add
     ;;@ ~lib/internal/typedarray.ts:49:31
     (i32.load
      (get_local $0)
     )
     ;;@ ~lib/internal/arraybuffer.ts:79:39
     (get_local $3)
    )
    ;;@ ~lib/internal/arraybuffer.ts:79:59
    (i32.shl
     ;;@ ~lib/internal/arraybuffer.ts:79:60
     (get_local $1)
     ;;@ ~lib/internal/arraybuffer.ts:79:76
     (i32.const 3)
    )
   )
   ;;@ ~lib/internal/arraybuffer.ts:79:91
   (get_local $2)
  )
 )
 (func $assembly/index/render_trigger (; 4 ;) (type $iv) (param $0 i32)
  (local $1 i32)
  ;;@ assembly/index.ts:4:56
  (block $break|0
   (loop $repeat|0
    (br_if $break|0
     ;;@ assembly/index.ts:5:18
     (i32.ge_s
      (get_local $1)
      (i32.shr_s
       (i32.sub
        (i32.load offset=8
         ;;@ assembly/index.ts:5:22
         (get_local $0)
        )
        (i32.load offset=4
         (get_local $0)
        )
       )
       (i32.const 3)
      )
     )
    )
    ;;@ assembly/index.ts:6:4
    (if
     ;;@ assembly/index.ts:6:8
     (f64.gt
      (call $~lib/internal/typedarray/TypedArray<f64,f64>#__get
       (get_local $0)
       ;;@ assembly/index.ts:6:12
       (get_local $1)
      )
      ;;@ assembly/index.ts:6:17
      (f64.const -200)
     )
     ;;@ assembly/index.ts:6:23
     (call $~lib/internal/typedarray/TypedArray<f64,f64>#__set
      ;;@ assembly/index.ts:7:6
      (get_local $0)
      ;;@ assembly/index.ts:7:10
      (get_local $1)
      ;;@ assembly/index.ts:7:15
      (f64.sub
       (f64.const 1)
       ;;@ assembly/index.ts:7:19
       (f64.div
        (call $~lib/internal/typedarray/TypedArray<f64,f64>#__get
         (get_local $0)
         ;;@ assembly/index.ts:7:23
         (get_local $1)
        )
        ;;@ assembly/index.ts:7:28
        (f64.const 200)
       )
      )
     )
     ;;@ assembly/index.ts:8:11
     (call $~lib/internal/typedarray/TypedArray<f64,f64>#__set
      ;;@ assembly/index.ts:9:6
      (get_local $0)
      ;;@ assembly/index.ts:9:10
      (get_local $1)
      ;;@ assembly/index.ts:9:15
      (f64.sub
       (f64.const 4)
       ;;@ assembly/index.ts:9:19
       (f64.div
        (call $~lib/internal/typedarray/TypedArray<f64,f64>#__get
         (get_local $0)
         ;;@ assembly/index.ts:9:23
         (get_local $1)
        )
        ;;@ assembly/index.ts:9:28
        (f64.const -200)
       )
      )
     )
    )
    ;;@ assembly/index.ts:12:4
    (if
     ;;@ assembly/index.ts:12:8
     (f64.lt
      (call $~lib/internal/typedarray/TypedArray<f64,f64>#__get
       (get_local $0)
       ;;@ assembly/index.ts:12:12
       (get_local $1)
      )
      ;;@ assembly/index.ts:12:17
      (f64.const 0)
     )
     ;;@ assembly/index.ts:12:20
     (call $~lib/internal/typedarray/TypedArray<f64,f64>#__set
      (get_local $0)
      ;;@ assembly/index.ts:12:24
      (get_local $1)
      ;;@ assembly/index.ts:12:29
      (f64.const 0)
     )
    )
    ;;@ assembly/index.ts:5:34
    (set_local $1
     (i32.add
      (get_local $1)
      (i32.const 1)
     )
    )
    (br $repeat|0)
   )
  )
 )
 (func $assembly/index/render_scroll_hint (; 5 ;) (type $FFF) (param $0 f64) (param $1 f64) (result f64)
  (local $2 f64)
  (select
   (select
    ;;@ assembly/index.ts:17:2
    (tee_local $2
     ;;@ assembly/index.ts:17:17
     (f64.sub
      (f64.const 1)
      ;;@ assembly/index.ts:17:21
      (f64.div
       (f64.sub
        ;;@ assembly/index.ts:17:22
        (get_local $0)
        ;;@ assembly/index.ts:17:36
        (get_local $1)
       )
       ;;@ assembly/index.ts:17:50
       (f64.const 100)
      )
     )
    )
    ;;@ assembly/index.ts:22:13
    (f64.const 1)
    ;;@ assembly/index.ts:19:8
    (f64.le
     (get_local $2)
     ;;@ assembly/index.ts:19:13
     (f64.const 1)
    )
   )
   ;;@ assembly/index.ts:25:11
   (f64.const 0)
   ;;@ assembly/index.ts:18:6
   (f64.ge
    (get_local $2)
    ;;@ assembly/index.ts:18:11
    (f64.const 0)
   )
  )
 )
 (func $assembly/index/render_prologue_box (; 6 ;) (type $FFF) (param $0 f64) (param $1 f64) (result f64)
  (local $2 f64)
  (select
   (select
    ;;@ assembly/index.ts:30:2
    (tee_local $2
     ;;@ assembly/index.ts:30:17
     (f64.div
      (f64.sub
       ;;@ assembly/index.ts:30:18
       (f64.const 7500)
       ;;@ assembly/index.ts:30:25
       (f64.sub
        ;;@ assembly/index.ts:30:26
        (get_local $0)
        ;;@ assembly/index.ts:30:40
        (get_local $1)
       )
      )
      ;;@ assembly/index.ts:30:55
      (f64.const 300)
     )
    )
    ;;@ assembly/index.ts:35:13
    (f64.const 1)
    ;;@ assembly/index.ts:32:8
    (f64.le
     (get_local $2)
     ;;@ assembly/index.ts:32:13
     (f64.const 1)
    )
   )
   ;;@ assembly/index.ts:38:11
   (f64.const 0)
   ;;@ assembly/index.ts:31:6
   (f64.ge
    (get_local $2)
    ;;@ assembly/index.ts:31:11
    (f64.const 0)
   )
  )
 )
 (func $assembly/index/render_fadein (; 7 ;) (type $FFiv) (param $0 f64) (param $1 f64) (param $2 i32)
  (local $3 i32)
  ;;@ assembly/index.ts:43:2
  (block $break|0
   (loop $repeat|0
    (br_if $break|0
     ;;@ assembly/index.ts:43:18
     (i32.ge_s
      (get_local $3)
      ;;@ assembly/index.ts:43:22
      (i32.const 4)
     )
    )
    ;;@ assembly/index.ts:44:4
    (call $~lib/internal/typedarray/TypedArray<f64,f64>#__set
     (get_local $2)
     ;;@ assembly/index.ts:44:8
     (get_local $3)
     ;;@ assembly/index.ts:44:13
     (f64.sub
      (f64.div
       (f64.sub
        ;;@ assembly/index.ts:44:14
        (get_local $0)
        ;;@ assembly/index.ts:44:28
        (get_local $1)
       )
       ;;@ assembly/index.ts:44:42
       (f64.const 700)
      )
      (f64.convert_s/i32
       ;;@ assembly/index.ts:44:48
       (i32.add
        ;;@ assembly/index.ts:44:49
        (get_local $3)
        ;;@ assembly/index.ts:44:53
        (i32.const 1)
       )
      )
     )
    )
    ;;@ assembly/index.ts:45:4
    (if
     ;;@ assembly/index.ts:45:8
     (f64.gt
      (call $~lib/internal/typedarray/TypedArray<f64,f64>#__get
       (get_local $2)
       ;;@ assembly/index.ts:45:12
       (get_local $3)
      )
      ;;@ assembly/index.ts:45:17
      (f64.const 1)
     )
     ;;@ assembly/index.ts:45:20
     (call $~lib/internal/typedarray/TypedArray<f64,f64>#__set
      (get_local $2)
      ;;@ assembly/index.ts:45:24
      (get_local $3)
      ;;@ assembly/index.ts:45:29
      (f64.const 1)
     )
     ;;@ assembly/index.ts:46:9
     (if
      ;;@ assembly/index.ts:46:13
      (f64.lt
       (call $~lib/internal/typedarray/TypedArray<f64,f64>#__get
        (get_local $2)
        ;;@ assembly/index.ts:46:17
        (get_local $3)
       )
       ;;@ assembly/index.ts:46:22
       (f64.const 0)
      )
      ;;@ assembly/index.ts:46:25
      (call $~lib/internal/typedarray/TypedArray<f64,f64>#__set
       (get_local $2)
       ;;@ assembly/index.ts:46:29
       (get_local $3)
       ;;@ assembly/index.ts:46:34
       (f64.const 0)
      )
     )
    )
    ;;@ assembly/index.ts:43:25
    (set_local $3
     (i32.add
      (get_local $3)
      (i32.const 1)
     )
    )
    (br $repeat|0)
   )
  )
  ;;@ assembly/index.ts:48:2
  (call $~lib/internal/typedarray/TypedArray<f64,f64>#__set
   (get_local $2)
   ;;@ assembly/index.ts:48:6
   (i32.const 4)
   ;;@ assembly/index.ts:48:11
   (f64.sub
    (f64.div
     (f64.sub
      ;;@ assembly/index.ts:48:12
      (get_local $0)
      ;;@ assembly/index.ts:48:26
      (get_local $1)
     )
     ;;@ assembly/index.ts:48:40
     (f64.const 700)
    )
    ;;@ assembly/index.ts:48:46
    (f64.const 8)
   )
  )
  ;;@ assembly/index.ts:49:2
  (if
   ;;@ assembly/index.ts:49:6
   (f64.gt
    (call $~lib/internal/typedarray/TypedArray<f64,f64>#__get
     (get_local $2)
     ;;@ assembly/index.ts:49:10
     (i32.const 4)
    )
    ;;@ assembly/index.ts:49:15
    (f64.const 1)
   )
   ;;@ assembly/index.ts:49:18
   (call $~lib/internal/typedarray/TypedArray<f64,f64>#__set
    (get_local $2)
    ;;@ assembly/index.ts:49:22
    (i32.const 4)
    ;;@ assembly/index.ts:49:27
    (f64.const 1)
   )
   ;;@ assembly/index.ts:50:7
   (if
    ;;@ assembly/index.ts:50:11
    (f64.lt
     (call $~lib/internal/typedarray/TypedArray<f64,f64>#__get
      (get_local $2)
      ;;@ assembly/index.ts:50:15
      (i32.const 4)
     )
     ;;@ assembly/index.ts:50:20
     (f64.const 0)
    )
    ;;@ assembly/index.ts:50:23
    (call $~lib/internal/typedarray/TypedArray<f64,f64>#__set
     (get_local $2)
     ;;@ assembly/index.ts:50:27
     (i32.const 4)
     ;;@ assembly/index.ts:50:32
     (f64.const 0)
    )
   )
  )
 )
 (func $assembly/index/render_bg (; 8 ;) (type $FF) (param $0 f64) (result f64)
  (local $1 f64)
  (select
   (select
    ;;@ assembly/index.ts:54:2
    (tee_local $1
     ;;@ assembly/index.ts:54:18
     (f64.div
      (get_local $0)
      ;;@ assembly/index.ts:54:24
      (f64.const 300)
     )
    )
    ;;@ assembly/index.ts:59:13
    (f64.const 1)
    ;;@ assembly/index.ts:56:8
    (f64.le
     (get_local $1)
     ;;@ assembly/index.ts:56:19
     (f64.const 1)
    )
   )
   ;;@ assembly/index.ts:62:11
   (f64.const 0)
   ;;@ assembly/index.ts:55:6
   (f64.ge
    (get_local $1)
    ;;@ assembly/index.ts:55:17
    (f64.const 0)
   )
  )
 )
 (func $assembly/index/bg_show (; 9 ;) (type $iiii) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  ;;@ assembly/index.ts:67:9
  (if (result i32)
   (tee_local $3
    (i32.ge_s
     (i32.sub
      (i32.sub
       (get_local $1)
       ;;@ assembly/index.ts:67:15
       (get_local $0)
      )
      ;;@ assembly/index.ts:67:19
      (i32.const 1)
     )
     ;;@ assembly/index.ts:67:24
     (i32.sub
      (get_local $2)
      ;;@ assembly/index.ts:67:38
      (i32.const 1)
     )
    )
   )
   ;;@ assembly/index.ts:67:43
   (i32.le_s
    (i32.sub
     (i32.sub
      (get_local $1)
      ;;@ assembly/index.ts:67:49
      (get_local $0)
     )
     ;;@ assembly/index.ts:67:53
     (i32.const 1)
    )
    ;;@ assembly/index.ts:67:58
    (i32.add
     (get_local $2)
     ;;@ assembly/index.ts:67:72
     (i32.const 1)
    )
   )
   (get_local $3)
  )
 )
 (func $~lib/allocator/arena/allocate_memory (; 10 ;) (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  ;;@ ~lib/allocator/arena.ts:17:2
  (if
   ;;@ ~lib/allocator/arena.ts:17:6
   (get_local $0)
   ;;@ ~lib/allocator/arena.ts:17:12
   (block
    ;;@ ~lib/allocator/arena.ts:18:4
    (if
     ;;@ ~lib/allocator/arena.ts:18:8
     (i32.gt_u
      (get_local $0)
      ;;@ ~lib/allocator/arena.ts:18:15
      (i32.const 1073741824)
     )
     ;;@ ~lib/allocator/arena.ts:18:28
     (unreachable)
    )
    ;;@ ~lib/allocator/arena.ts:22:4
    (if
     ;;@ ~lib/allocator/arena.ts:22:8
     (i32.gt_u
      ;;@ ~lib/allocator/arena.ts:20:4
      (tee_local $0
       ;;@ ~lib/allocator/arena.ts:20:17
       (i32.and
        (i32.add
         ;;@ ~lib/allocator/arena.ts:20:18
         (i32.add
          ;;@ ~lib/allocator/arena.ts:19:4
          (tee_local $1
           ;;@ ~lib/allocator/arena.ts:19:14
           (get_global $~lib/allocator/arena/offset)
          )
          ;;@ ~lib/allocator/arena.ts:20:24
          (get_local $0)
         )
         ;;@ ~lib/allocator/arena.ts:20:31
         (i32.const 7)
        )
        (i32.const -8)
       )
      )
      ;;@ ~lib/allocator/arena.ts:22:17
      (i32.shl
       ;;@ ~lib/allocator/arena.ts:21:4
       (tee_local $2
        ;;@ ~lib/allocator/arena.ts:21:22
        (current_memory)
       )
       ;;@ ~lib/allocator/arena.ts:22:39
       (i32.const 16)
      )
     )
     ;;@ ~lib/allocator/arena.ts:25:6
     (if
      ;;@ ~lib/allocator/arena.ts:25:10
      (i32.lt_s
       (grow_memory
        ;;@ ~lib/allocator/arena.ts:24:24
        (select
         ;;@ ~lib/allocator/arena.ts:24:28
         (get_local $2)
         (tee_local $4
          ;;@ ~lib/allocator/arena.ts:23:6
          (tee_local $3
           ;;@ ~lib/allocator/arena.ts:23:24
           (i32.shr_u
            (i32.and
             ;;@ ~lib/allocator/arena.ts:23:25
             (i32.add
              ;;@ ~lib/allocator/arena.ts:23:26
              (i32.sub
               (get_local $0)
               ;;@ ~lib/allocator/arena.ts:23:35
               (get_local $1)
              )
              ;;@ ~lib/allocator/arena.ts:23:41
              (i32.const 65535)
             )
             (i32.const -65536)
            )
            ;;@ ~lib/allocator/arena.ts:23:64
            (i32.const 16)
           )
          )
         )
         (i32.gt_s
          (get_local $2)
          (get_local $4)
         )
        )
       )
       ;;@ ~lib/allocator/arena.ts:25:37
       (i32.const 0)
      )
      ;;@ ~lib/allocator/arena.ts:25:40
      (if
       ;;@ ~lib/allocator/arena.ts:26:12
       (i32.lt_s
        (grow_memory
         ;;@ ~lib/allocator/arena.ts:26:24
         (get_local $3)
        )
        ;;@ ~lib/allocator/arena.ts:26:39
        (i32.const 0)
       )
       ;;@ ~lib/allocator/arena.ts:26:42
       (unreachable)
      )
     )
    )
    ;;@ ~lib/allocator/arena.ts:31:4
    (set_global $~lib/allocator/arena/offset
     ;;@ ~lib/allocator/arena.ts:31:13
     (get_local $0)
    )
    ;;@ ~lib/allocator/arena.ts:32:11
    (return
     (get_local $1)
    )
   )
  )
  ;;@ ~lib/allocator/arena.ts:34:9
  (i32.const 0)
 )
 (func $~lib/internal/arraybuffer/allocUnsafe (; 11 ;) (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  ;;@ ~lib/internal/arraybuffer.ts:22:2
  (if
   ;;@ ~lib/internal/arraybuffer.ts:22:9
   (i32.gt_u
    (get_local $0)
    ;;@ ~lib/internal/arraybuffer.ts:22:28
    (i32.const 1073741816)
   )
   (block
    (call $~lib/env/abort
     (i32.const 0)
     (i32.const 68)
     (i32.const 22)
     (i32.const 2)
    )
    (unreachable)
   )
  )
  ;;@ ~lib/internal/arraybuffer.ts:24:2
  (i32.store
   ;;@ ~lib/internal/arraybuffer.ts:23:2
   (tee_local $1
    ;;@ ~lib/internal/arraybuffer.ts:23:15
    (call $~lib/allocator/arena/allocate_memory
     (i32.shl
      (i32.const 1)
      (i32.sub
       (i32.const 32)
       (i32.clz
        (i32.add
         ;;@ ~lib/internal/arraybuffer.ts:23:43
         (get_local $0)
         (i32.const 7)
        )
       )
      )
     )
    )
   )
   ;;@ ~lib/internal/arraybuffer.ts:24:21
   (get_local $0)
  )
  ;;@ ~lib/internal/arraybuffer.ts:25:9
  (get_local $1)
 )
 (func $~lib/memory/set_memory (; 12 ;) (type $iiiv) (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i64)
  (local $4 i32)
  ;;@ ~lib/memory.ts:196:2
  (if
   ;;@ ~lib/memory.ts:196:6
   (i32.eqz
    ;;@ ~lib/memory.ts:196:7
    (get_local $2)
   )
   ;;@ ~lib/memory.ts:196:10
   (return)
  )
  ;;@ ~lib/memory.ts:197:2
  (i32.store8
   ;;@ ~lib/memory.ts:197:12
   (get_local $0)
   ;;@ ~lib/memory.ts:197:18
   (get_local $1)
  )
  ;;@ ~lib/memory.ts:198:2
  (i32.store8
   ;;@ ~lib/memory.ts:198:12
   (i32.sub
    (i32.add
     (get_local $0)
     ;;@ ~lib/memory.ts:198:19
     (get_local $2)
    )
    ;;@ ~lib/memory.ts:198:23
    (i32.const 1)
   )
   ;;@ ~lib/memory.ts:198:26
   (get_local $1)
  )
  ;;@ ~lib/memory.ts:199:2
  (if
   ;;@ ~lib/memory.ts:199:6
   (i32.le_u
    (get_local $2)
    ;;@ ~lib/memory.ts:199:11
    (i32.const 2)
   )
   ;;@ ~lib/memory.ts:199:14
   (return)
  )
  ;;@ ~lib/memory.ts:201:2
  (i32.store8
   ;;@ ~lib/memory.ts:201:12
   (i32.add
    (get_local $0)
    ;;@ ~lib/memory.ts:201:19
    (i32.const 1)
   )
   ;;@ ~lib/memory.ts:201:22
   (get_local $1)
  )
  ;;@ ~lib/memory.ts:202:2
  (i32.store8
   ;;@ ~lib/memory.ts:202:12
   (i32.add
    (get_local $0)
    ;;@ ~lib/memory.ts:202:19
    (i32.const 2)
   )
   ;;@ ~lib/memory.ts:202:22
   (get_local $1)
  )
  ;;@ ~lib/memory.ts:203:2
  (i32.store8
   ;;@ ~lib/memory.ts:203:12
   (i32.sub
    (i32.add
     (get_local $0)
     ;;@ ~lib/memory.ts:203:19
     (get_local $2)
    )
    ;;@ ~lib/memory.ts:203:23
    (i32.const 2)
   )
   ;;@ ~lib/memory.ts:203:26
   (get_local $1)
  )
  ;;@ ~lib/memory.ts:204:2
  (i32.store8
   ;;@ ~lib/memory.ts:204:12
   (i32.sub
    (i32.add
     (get_local $0)
     ;;@ ~lib/memory.ts:204:19
     (get_local $2)
    )
    ;;@ ~lib/memory.ts:204:23
    (i32.const 3)
   )
   ;;@ ~lib/memory.ts:204:26
   (get_local $1)
  )
  ;;@ ~lib/memory.ts:205:2
  (if
   ;;@ ~lib/memory.ts:205:6
   (i32.le_u
    (get_local $2)
    ;;@ ~lib/memory.ts:205:11
    (i32.const 6)
   )
   ;;@ ~lib/memory.ts:205:14
   (return)
  )
  ;;@ ~lib/memory.ts:206:2
  (i32.store8
   ;;@ ~lib/memory.ts:206:12
   (i32.add
    (get_local $0)
    ;;@ ~lib/memory.ts:206:19
    (i32.const 3)
   )
   ;;@ ~lib/memory.ts:206:22
   (get_local $1)
  )
  ;;@ ~lib/memory.ts:207:2
  (i32.store8
   ;;@ ~lib/memory.ts:207:12
   (i32.sub
    (i32.add
     (get_local $0)
     ;;@ ~lib/memory.ts:207:19
     (get_local $2)
    )
    ;;@ ~lib/memory.ts:207:23
    (i32.const 4)
   )
   ;;@ ~lib/memory.ts:207:26
   (get_local $1)
  )
  ;;@ ~lib/memory.ts:208:2
  (if
   ;;@ ~lib/memory.ts:208:6
   (i32.le_u
    (get_local $2)
    ;;@ ~lib/memory.ts:208:11
    (i32.const 8)
   )
   ;;@ ~lib/memory.ts:208:14
   (return)
  )
  ;;@ ~lib/memory.ts:219:2
  (i32.store
   ;;@ ~lib/memory.ts:212:2
   (tee_local $0
    (i32.add
     (get_local $0)
     ;;@ ~lib/memory.ts:211:2
     (tee_local $4
      ;;@ ~lib/memory.ts:211:17
      (i32.and
       (i32.sub
        (i32.const 0)
        ;;@ ~lib/memory.ts:211:18
        (get_local $0)
       )
       ;;@ ~lib/memory.ts:211:25
       (i32.const 3)
      )
     )
    )
   )
   ;;@ ~lib/memory.ts:216:2
   (tee_local $1
    ;;@ ~lib/memory.ts:216:17
    (i32.mul
     (i32.and
      ;;@ ~lib/memory.ts:216:33
      (get_local $1)
      (i32.const 255)
     )
     (i32.const 16843009)
    )
   )
  )
  ;;@ ~lib/memory.ts:220:2
  (i32.store
   ;;@ ~lib/memory.ts:220:13
   (i32.sub
    (i32.add
     (get_local $0)
     ;;@ ~lib/memory.ts:214:2
     (tee_local $2
      (i32.and
       (i32.sub
        ;;@ ~lib/memory.ts:213:2
        (get_local $2)
        ;;@ ~lib/memory.ts:213:7
        (get_local $4)
       )
       ;;@ ~lib/memory.ts:214:7
       (i32.const -4)
      )
     )
    )
    ;;@ ~lib/memory.ts:220:24
    (i32.const 4)
   )
   ;;@ ~lib/memory.ts:220:27
   (get_local $1)
  )
  ;;@ ~lib/memory.ts:221:2
  (if
   ;;@ ~lib/memory.ts:221:6
   (i32.le_u
    (get_local $2)
    ;;@ ~lib/memory.ts:221:11
    (i32.const 8)
   )
   ;;@ ~lib/memory.ts:221:14
   (return)
  )
  ;;@ ~lib/memory.ts:222:2
  (i32.store
   ;;@ ~lib/memory.ts:222:13
   (i32.add
    (get_local $0)
    ;;@ ~lib/memory.ts:222:20
    (i32.const 4)
   )
   ;;@ ~lib/memory.ts:222:23
   (get_local $1)
  )
  ;;@ ~lib/memory.ts:223:2
  (i32.store
   ;;@ ~lib/memory.ts:223:13
   (i32.add
    (get_local $0)
    ;;@ ~lib/memory.ts:223:20
    (i32.const 8)
   )
   ;;@ ~lib/memory.ts:223:23
   (get_local $1)
  )
  ;;@ ~lib/memory.ts:224:2
  (i32.store
   ;;@ ~lib/memory.ts:224:13
   (i32.sub
    (i32.add
     (get_local $0)
     ;;@ ~lib/memory.ts:224:20
     (get_local $2)
    )
    ;;@ ~lib/memory.ts:224:24
    (i32.const 12)
   )
   ;;@ ~lib/memory.ts:224:28
   (get_local $1)
  )
  ;;@ ~lib/memory.ts:225:2
  (i32.store
   ;;@ ~lib/memory.ts:225:13
   (i32.sub
    (i32.add
     (get_local $0)
     ;;@ ~lib/memory.ts:225:20
     (get_local $2)
    )
    ;;@ ~lib/memory.ts:225:24
    (i32.const 8)
   )
   ;;@ ~lib/memory.ts:225:27
   (get_local $1)
  )
  ;;@ ~lib/memory.ts:226:2
  (if
   ;;@ ~lib/memory.ts:226:6
   (i32.le_u
    (get_local $2)
    ;;@ ~lib/memory.ts:226:11
    (i32.const 24)
   )
   ;;@ ~lib/memory.ts:226:15
   (return)
  )
  ;;@ ~lib/memory.ts:227:2
  (i32.store
   ;;@ ~lib/memory.ts:227:13
   (i32.add
    (get_local $0)
    ;;@ ~lib/memory.ts:227:20
    (i32.const 12)
   )
   ;;@ ~lib/memory.ts:227:24
   (get_local $1)
  )
  ;;@ ~lib/memory.ts:228:2
  (i32.store
   ;;@ ~lib/memory.ts:228:13
   (i32.add
    (get_local $0)
    ;;@ ~lib/memory.ts:228:20
    (i32.const 16)
   )
   ;;@ ~lib/memory.ts:228:24
   (get_local $1)
  )
  ;;@ ~lib/memory.ts:229:2
  (i32.store
   ;;@ ~lib/memory.ts:229:13
   (i32.add
    (get_local $0)
    ;;@ ~lib/memory.ts:229:20
    (i32.const 20)
   )
   ;;@ ~lib/memory.ts:229:24
   (get_local $1)
  )
  ;;@ ~lib/memory.ts:230:2
  (i32.store
   ;;@ ~lib/memory.ts:230:13
   (i32.add
    (get_local $0)
    ;;@ ~lib/memory.ts:230:20
    (i32.const 24)
   )
   ;;@ ~lib/memory.ts:230:24
   (get_local $1)
  )
  ;;@ ~lib/memory.ts:231:2
  (i32.store
   ;;@ ~lib/memory.ts:231:13
   (i32.sub
    (i32.add
     (get_local $0)
     ;;@ ~lib/memory.ts:231:20
     (get_local $2)
    )
    ;;@ ~lib/memory.ts:231:24
    (i32.const 28)
   )
   ;;@ ~lib/memory.ts:231:28
   (get_local $1)
  )
  ;;@ ~lib/memory.ts:232:2
  (i32.store
   ;;@ ~lib/memory.ts:232:13
   (i32.sub
    (i32.add
     (get_local $0)
     ;;@ ~lib/memory.ts:232:20
     (get_local $2)
    )
    ;;@ ~lib/memory.ts:232:24
    (i32.const 24)
   )
   ;;@ ~lib/memory.ts:232:28
   (get_local $1)
  )
  ;;@ ~lib/memory.ts:233:2
  (i32.store
   ;;@ ~lib/memory.ts:233:13
   (i32.sub
    (i32.add
     (get_local $0)
     ;;@ ~lib/memory.ts:233:20
     (get_local $2)
    )
    ;;@ ~lib/memory.ts:233:24
    (i32.const 20)
   )
   ;;@ ~lib/memory.ts:233:28
   (get_local $1)
  )
  ;;@ ~lib/memory.ts:234:2
  (i32.store
   ;;@ ~lib/memory.ts:234:13
   (i32.sub
    (i32.add
     (get_local $0)
     ;;@ ~lib/memory.ts:234:20
     (get_local $2)
    )
    ;;@ ~lib/memory.ts:234:24
    (i32.const 16)
   )
   ;;@ ~lib/memory.ts:234:28
   (get_local $1)
  )
  ;;@ ~lib/memory.ts:238:2
  (set_local $0
   (i32.add
    (get_local $0)
    ;;@ ~lib/memory.ts:237:2
    (tee_local $4
     ;;@ ~lib/memory.ts:237:6
     (i32.add
      ;;@ ~lib/memory.ts:237:11
      (i32.and
       ;;@ ~lib/memory.ts:237:12
       (get_local $0)
       ;;@ ~lib/memory.ts:237:19
       (i32.const 4)
      )
      ;;@ ~lib/memory.ts:237:6
      (i32.const 24)
     )
    )
   )
  )
  ;;@ ~lib/memory.ts:239:2
  (set_local $2
   (i32.sub
    (get_local $2)
    ;;@ ~lib/memory.ts:239:7
    (get_local $4)
   )
  )
  ;;@ ~lib/memory.ts:242:2
  (set_local $3
   ;;@ ~lib/memory.ts:242:17
   (i64.or
    (i64.extend_u/i32
     (get_local $1)
    )
    ;;@ ~lib/memory.ts:242:28
    (i64.shl
     ;;@ ~lib/memory.ts:242:29
     (i64.extend_u/i32
      (get_local $1)
     )
     ;;@ ~lib/memory.ts:242:41
     (i64.const 32)
    )
   )
  )
  (loop $continue|0
   (if
    ;;@ ~lib/memory.ts:243:9
    (i32.ge_u
     (get_local $2)
     ;;@ ~lib/memory.ts:243:14
     (i32.const 32)
    )
    (block
     ;;@ ~lib/memory.ts:244:4
     (i64.store
      ;;@ ~lib/memory.ts:244:15
      (get_local $0)
      ;;@ ~lib/memory.ts:244:21
      (get_local $3)
     )
     ;;@ ~lib/memory.ts:245:4
     (i64.store
      ;;@ ~lib/memory.ts:245:15
      (i32.add
       (get_local $0)
       ;;@ ~lib/memory.ts:245:22
       (i32.const 8)
      )
      ;;@ ~lib/memory.ts:245:25
      (get_local $3)
     )
     ;;@ ~lib/memory.ts:246:4
     (i64.store
      ;;@ ~lib/memory.ts:246:15
      (i32.add
       (get_local $0)
       ;;@ ~lib/memory.ts:246:22
       (i32.const 16)
      )
      ;;@ ~lib/memory.ts:246:26
      (get_local $3)
     )
     ;;@ ~lib/memory.ts:247:4
     (i64.store
      ;;@ ~lib/memory.ts:247:15
      (i32.add
       (get_local $0)
       ;;@ ~lib/memory.ts:247:22
       (i32.const 24)
      )
      ;;@ ~lib/memory.ts:247:26
      (get_local $3)
     )
     ;;@ ~lib/memory.ts:248:4
     (set_local $2
      (i32.sub
       (get_local $2)
       ;;@ ~lib/memory.ts:248:9
       (i32.const 32)
      )
     )
     ;;@ ~lib/memory.ts:249:4
     (set_local $0
      (i32.add
       (get_local $0)
       ;;@ ~lib/memory.ts:249:12
       (i32.const 32)
      )
     )
     (br $continue|0)
    )
   )
  )
 )
 (func $~lib/internal/typedarray/TypedArray<f64,f64>#constructor (; 13 ;) (type $iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  ;;@ ~lib/internal/typedarray.ts:18:4
  (if
   ;;@ ~lib/internal/typedarray.ts:18:8
   (i32.gt_u
    (get_local $1)
    ;;@ ~lib/internal/typedarray.ts:18:22
    (i32.const 134217727)
   )
   ;;@ ~lib/internal/typedarray.ts:18:34
   (block
    (call $~lib/env/abort
     (i32.const 0)
     (i32.const 8)
     (i32.const 18)
     (i32.const 34)
    )
    (unreachable)
   )
  )
  ;;@ ~lib/internal/typedarray.ts:21:4
  (call $~lib/memory/set_memory
   ;;@ ~lib/internal/typedarray.ts:21:15
   (i32.add
    ;;@ ~lib/internal/typedarray.ts:20:4
    (tee_local $2
     ;;@ ~lib/internal/typedarray.ts:20:17
     (call $~lib/internal/arraybuffer/allocUnsafe
      ;;@ ~lib/internal/typedarray.ts:19:4
      (tee_local $1
       ;;@ ~lib/internal/typedarray.ts:19:21
       (i32.shl
        (get_local $1)
        ;;@ ~lib/internal/typedarray.ts:19:31
        (i32.const 3)
       )
      )
     )
    )
    ;;@ ~lib/internal/typedarray.ts:21:43
    (i32.const 8)
   )
   ;;@ ~lib/internal/typedarray.ts:21:59
   (i32.const 0)
   ;;@ ~lib/internal/typedarray.ts:21:62
   (get_local $1)
  )
  ;;@ ~lib/internal/typedarray.ts:22:4
  (i32.store
   (if (result i32)
    (get_local $0)
    (get_local $0)
    (block (result i32)
     (i32.store
      (tee_local $0
       (call $~lib/allocator/arena/allocate_memory
        (i32.const 12)
       )
      )
      (i32.const 0)
     )
     (i32.store offset=4
      (get_local $0)
      (i32.const 0)
     )
     (i32.store offset=8
      (get_local $0)
      (i32.const 0)
     )
     (get_local $0)
    )
   )
   ;;@ ~lib/internal/typedarray.ts:22:18
   (get_local $2)
  )
  ;;@ ~lib/internal/typedarray.ts:23:4
  (i32.store offset=4
   (get_local $0)
   ;;@ ~lib/internal/typedarray.ts:23:22
   (i32.const 0)
  )
  ;;@ ~lib/internal/typedarray.ts:24:4
  (i32.store offset=8
   (get_local $0)
   ;;@ ~lib/internal/typedarray.ts:24:22
   (get_local $1)
  )
  (get_local $0)
 )
 (func $assembly/index/new_array (; 14 ;) (type $i) (result i32)
  ;;@ assembly/index.ts:71:28
  (call $~lib/internal/typedarray/TypedArray<f64,f64>#constructor
   (i32.const 0)
   ;;@ assembly/index.ts:71:45
   (i32.const 5)
  )
 )
 (func $assembly/index/new_pin_array (; 15 ;) (type $ii) (param $0 i32) (result i32)
  ;;@ assembly/index.ts:76:32
  (call $~lib/internal/typedarray/TypedArray<f64,f64>#constructor
   (i32.const 0)
   ;;@ assembly/index.ts:76:49
   (get_local $0)
  )
 )
 (func $start (; 16 ;) (type $v)
  (set_global $~lib/allocator/arena/startOffset
   ;;@ ~lib/allocator/arena.ts:12:25
   (i32.and
    (i32.add
     ;;@ ~lib/allocator/arena.ts:12:26
     (get_global $HEAP_BASE)
     ;;@ ~lib/allocator/arena.ts:12:38
     (i32.const 7)
    )
    (i32.const -8)
   )
  )
  (set_global $~lib/allocator/arena/offset
   ;;@ ~lib/allocator/arena.ts:13:20
   (get_global $~lib/allocator/arena/startOffset)
  )
 )
)
