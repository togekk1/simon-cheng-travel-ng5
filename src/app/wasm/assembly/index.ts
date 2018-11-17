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

export function render_fadein(content_top: f64, switch_top: f64): Float64Array {
  const fadein: Float64Array = new Float64Array(5)
  for (let i = 0; i < 5; i++) {
    let value: f64;
    if (i !== 4) {
      value = (content_top - switch_top) / 700 - (i + 1);
    } else {
      value = (content_top - switch_top) / 700 - 8;
      if (value > 1) value = 1;
      else if (value < 0) value = 0;
    }

    if (value > 1) value = 1;
    else if (value < 0) value = 0;

    fadein[i] = value;
  }
  return fadein;
}

export function render_bg(pos: Float64Array, len: i32): Float64Array {
  const bg: Float64Array = new Float64Array(len);
  for (let i = 0; i < len; i++) {
    let bg_value = pos[i] / 300;
    if (bg_value > 1 || i == len - 1) bg_value = 1;
    else if (bg_value < 0) bg_value = 0;
    bg[i] = bg_value;
  }
  return pos;
}

export function bg_show(i: i32, len: i32, bg_selected: i32): boolean {
  return len - i - 1 >= bg_selected - 1 && len - i - 1 <= bg_selected + 1;
}