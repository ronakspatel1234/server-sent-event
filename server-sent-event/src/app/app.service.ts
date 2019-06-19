import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// ----------------------------------------------- //
import { SseService } from './sse.service';

@Injectable()
export class AppService {

  constructor(
    private ngZone: NgZone,
    private sseService: SseService
  ) { }

  getServerSentEvent(url: string) {
    return Observable.create(observer => {
      const eventSource = this.sseService.getEventSource(url);

      eventSource.onmessage = event => {
        this.ngZone.run(() => {
          observer.next(event);
        });
      };

      eventSource.onerror = error => {
        this.ngZone.run(() => {
          observer.error(error);
        });
      };
    });
  }
}
