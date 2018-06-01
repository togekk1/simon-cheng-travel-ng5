(module
 (type $FF (func (param f64) (result f64)))
 (type $FFF (func (param f64 f64) (result f64)))
 (type $FFFF (func (param f64 f64 f64) (result f64)))
 (type $iiii (func (param i32 i32 i32) (result i32)))
 (memory $0 1)
 (export "render_trigger" (func $assembly/index/render_trigger))
 (export "render_scroll_hint" (func $assembly/index/render_scroll_hint))
 (export "render_prologue_box" (func $assembly/index/render_prologue_box))
 (export "render_fadein" (func $assembly/index/render_fadein))
 (export "render_bg" (func $assembly/index/render_bg))
 (export "bg_show" (func $assembly/index/bg_show))
 (export "memory" (memory $0))
 (func $assembly/index/render_trigger (; 0 ;) (type $FF) (param $0 f64) (result f64)
  (local $1 f64)
  (select
   (tee_local $1
    (select
     ;;@ assembly/index.ts:4:8
     (f64.sub
      (f64.const 1)
      ;;@ assembly/index.ts:4:12
      (f64.div
       (get_local $0)
       ;;@ assembly/index.ts:4:26
       (f64.const 200)
      )
     )
     ;;@ assembly/index.ts:6:8
     (f64.sub
      (f64.const 4)
      ;;@ assembly/index.ts:6:12
      (f64.div
       (get_local $0)
       ;;@ assembly/index.ts:6:26
       (f64.const -200)
      )
     )
     ;;@ assembly/index.ts:3:6
     (f64.gt
      (get_local $0)
      ;;@ assembly/index.ts:3:20
      (f64.const -200)
     )
    )
   )
   ;;@ assembly/index.ts:12:11
   (f64.const 0)
   ;;@ assembly/index.ts:9:6
   (f64.ge
    (get_local $1)
    ;;@ assembly/index.ts:9:11
    (f64.const 0)
   )
  )
 )
 (func $assembly/index/render_scroll_hint (; 1 ;) (type $FFF) (param $0 f64) (param $1 f64) (result f64)
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
 (func $assembly/index/render_prologue_box (; 2 ;) (type $FFF) (param $0 f64) (param $1 f64) (result f64)
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
 (func $assembly/index/render_fadein (; 3 ;) (type $FFFF) (param $0 f64) (param $1 f64) (param $2 f64) (result f64)
  (local $3 f64)
  (select
   (select
    ;;@ assembly/index.ts:43:2
    (tee_local $3
     ;;@ assembly/index.ts:43:17
     (f64.sub
      (f64.div
       (f64.sub
        ;;@ assembly/index.ts:43:18
        (get_local $0)
        ;;@ assembly/index.ts:43:32
        (get_local $1)
       )
       ;;@ assembly/index.ts:43:46
       (f64.const 700)
      )
      ;;@ assembly/index.ts:43:52
      (get_local $2)
     )
    )
    ;;@ assembly/index.ts:48:13
    (f64.const 1)
    ;;@ assembly/index.ts:45:8
    (f64.le
     (get_local $3)
     ;;@ assembly/index.ts:45:13
     (f64.const 1)
    )
   )
   ;;@ assembly/index.ts:51:11
   (f64.const 0)
   ;;@ assembly/index.ts:44:6
   (f64.ge
    (get_local $3)
    ;;@ assembly/index.ts:44:11
    (f64.const 0)
   )
  )
 )
 (func $assembly/index/render_bg (; 4 ;) (type $FF) (param $0 f64) (result f64)
  (local $1 f64)
  (select
   (select
    ;;@ assembly/index.ts:56:2
    (tee_local $1
     ;;@ assembly/index.ts:56:18
     (f64.div
      (get_local $0)
      ;;@ assembly/index.ts:56:24
      (f64.const 300)
     )
    )
    ;;@ assembly/index.ts:61:13
    (f64.const 1)
    ;;@ assembly/index.ts:58:8
    (f64.le
     (get_local $1)
     ;;@ assembly/index.ts:58:19
     (f64.const 1)
    )
   )
   ;;@ assembly/index.ts:64:11
   (f64.const 0)
   ;;@ assembly/index.ts:57:6
   (f64.ge
    (get_local $1)
    ;;@ assembly/index.ts:57:17
    (f64.const 0)
   )
  )
 )
 (func $assembly/index/bg_show (; 5 ;) (type $iiii) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  ;;@ assembly/index.ts:69:9
  (if (result i32)
   (tee_local $3
    (i32.ge_s
     (i32.sub
      (i32.sub
       (get_local $1)
       ;;@ assembly/index.ts:69:15
       (get_local $0)
      )
      ;;@ assembly/index.ts:69:19
      (i32.const 1)
     )
     ;;@ assembly/index.ts:69:24
     (i32.sub
      (get_local $2)
      ;;@ assembly/index.ts:69:38
      (i32.const 1)
     )
    )
   )
   ;;@ assembly/index.ts:69:43
   (i32.le_s
    (i32.sub
     (i32.sub
      (get_local $1)
      ;;@ assembly/index.ts:69:49
      (get_local $0)
     )
     ;;@ assembly/index.ts:69:53
     (i32.const 1)
    )
    ;;@ assembly/index.ts:69:58
    (i32.add
     (get_local $2)
     ;;@ assembly/index.ts:69:72
     (i32.const 1)
    )
   )
   (get_local $3)
  )
 )
)
