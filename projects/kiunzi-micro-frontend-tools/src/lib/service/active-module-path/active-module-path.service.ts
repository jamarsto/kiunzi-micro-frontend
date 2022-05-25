import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActiveModulePath {
  constructor() {}

  get(): string {
    var segments: string[] = window.location.pathname.split('/');
    if(segments.length > 1) {
      return segments[1];
    }
    return '#';
  }
}

