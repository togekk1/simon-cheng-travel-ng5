import "allocator/arena";
export { reset_memory };

export function render_trigger(trigger_top: f64): f64 {
  let b: f64;
  if (trigger_top > -200) {
    b = 1 - trigger_top / 200;
  } else {
    b = 4 - trigger_top / -200;
  }

  if (b >= 0) {
    return b;
  } else {
    return 0;
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

export function render_fadein(content_top: f64, switch_top: f64, duration: f64): f64 {
  const a: f64 = (content_top - switch_top) / 700 - duration;
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

export function render_bg(top: f64): f64 {
  const opacity = top / 300;
  if (opacity >= 0) {
    if (opacity <= 1) {
      return opacity;
    } else {
      return 1;
    }
  } else {
    return 0;
  }
}

export function bg_show(i: i32, len: i32, bg_selected: i32): boolean {
  return len - i - 1 >= bg_selected - 1 && len - i - 1 <= bg_selected + 1;
}