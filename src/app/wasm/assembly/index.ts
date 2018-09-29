import "allocator/arena";
export { memory };

export function render_trigger(ptr: i32, len: i32): void {
  for (let i = ptr; i < ptr + len * 8; i += 8) {
    let a = load<f64>(i);
    if (a > -200) {
      a = 1 - a / 200;
    } else {
      a = 4 - a / -200;
    }

    if (a < 0) a = 0;
    store<f64>(i, a);
  }
}

export function render_scroll_hint(content_top: f64, switch_top: f64): f64 {
  const a: f64 = 1 - (content_top - switch_top) / 100;
  if (a >= 0) {
    if (a <= 1) {
      return a;
    } else {
      return 1;
    }
  } else {
    return 0;
  }
}

export function render_prologue_box(content_top: f64, switch_top: f64): f64 {
  const a: f64 = (7500 - (content_top - switch_top)) / 300;
  if (a >= 0) {
    if (a <= 1) {
      return a;
    } else {
      return 1;
    }
  } else {
    return 0;
  }
}

export function render_fadein(content_top: f64, switch_top: f64, ptr: i32): void {
  for (let i = 0; i < 5; i++) {
    let a = load<f64>(ptr + i * 8);

    if (i !== 4) {
      a = (content_top - switch_top) / 700 - (i + 1);
    } else {
      a = (content_top - switch_top) / 700 - 8;
      if (a > 1) a = 1;
      else if (a < 0) a = 0;
    }

    if (a > 1) a = 1;
    else if (a < 0) a = 0;
    store<f64>(ptr + i * 8, a);
  }
}

export function render_bg(ptr: i32, len: i32): void {
  // for (let i = ptr; i < ptr + len * 8; i += 8) {
  for (let i = 0; i < len; i++) {
    const j = ptr + i * 8;
    let a = load<f64>(j) / 300;
    if (a > 1 || i == len - 1) a = 1;
    else if (a < 0) a = 0;
    store<f64>(j, a);
  }
}

export function bg_show(i: i32, len: i32, bg_selected: i32): boolean {
  return len - i - 1 >= bg_selected - 1 && len - i - 1 <= bg_selected + 1;
}

export function new_array(): Float64Array {
  const arr: Float64Array = new Float64Array(5);
  return arr;
}

// export function new_pin_array(len: i32): i32 {
//   const pin_arr = memory.allocate(64);

//   // const pin_arr: Float64Array = new Float64Array(len);
//   return pin_arr;
// }

export function get_value(ptr: i32): f64 {
  return load<f64>(ptr);
}