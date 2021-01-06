import { Injectable } from "@angular/core";
import { Observable, Subject, Observer } from 'rxjs';


@Injectable()
export class WebHookService {
  
  WS_ENDPOINT = "ws://my-webhooks-sample.herokuapp.com/";
  private subject: Subject<MessageEvent>;

  public connect(): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(this.WS_ENDPOINT);
      console.log("Successfully connected: " + this.WS_ENDPOINT);
    }
    return this.subject;
  }

  public close(): Subject<MessageEvent> {
    if (this.subject) {
      this.subject.unsubscribe();
      console.log("Successfully disconnected: " + this.WS_ENDPOINT);
    }
    return this.subject;
  }

  private create(url): Subject<MessageEvent> {
    let ws = new WebSocket(url);

    let observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Subject.create(observer, observable);
  }
}