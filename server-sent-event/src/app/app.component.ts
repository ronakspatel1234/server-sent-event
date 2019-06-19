import { Component, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SseService } from './sse.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private ngZone: NgZone, private sseService: SseService) {

  }

  ngOnInit() {
    const eventSource = this.sseService.getEventSource('http://172.16.3.60:5000/randomNamedEvents');
    // const eventSource = this.sseService.getEventSource('http://localhost:5001/sse/');
    eventSource.onmessage = event => {
      console.log(event);
      if (event.lastEventId === '-1') {
        eventSource.close();
        // eventSource.resetStartButton();
      }
    };
    eventSource.onopen = open => {
      console.log(open);
    };
    eventSource.onerror = error => {
      console.log(error.data);
    };

    eventSource.addEventListener('catFact', event => {
      console.log(event.data);
    });

  }


}
