import { Pipe, PipeTransform } from '@angular/core';

interface value {
  [key: string]: object
}

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value: value, _args: string[]): any {
    const keys = [];
    for (let key in value) {
      keys.push({ key: key, value: value[key] });
    }
    return keys;
  }
}