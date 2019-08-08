import { Injectable } from '@angular/core';

interface background {
  org: string;
}

@Injectable()
export class BgLoadingService {
  background: background[] = [];

  constructor() { }

}
