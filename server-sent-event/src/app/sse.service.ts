import { Injectable } from '@angular/core';
import * as EventSource from 'eventsource';


@Injectable()
export class SseService {

  constructor() { }

  getEventSource(url: string): EventSource {
    let eventSource = window['EventSource'];
    eventSource = new EventSource(url);
    return eventSource;
  }

}
