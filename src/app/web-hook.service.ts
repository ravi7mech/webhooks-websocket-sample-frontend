/* import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError, tap, switchAll } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebHookService {
  private socket$: WebSocketSubject<any>;
  private messagesSubject$ = new Subject();
  public messages$ = this.messagesSubject$.pipe(switchAll(), catchError(e => { throw e }));

  constructor() {

  }

  public connect(): void {

    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      const messages = this.socket$.pipe(
        tap({
          error: error => console.log(error),
        }), catchError(_ => EMPTY));
      this.messagesSubject$.next(messages);
    }
  }

  private getNewWebSocket() {
    debugger;
    return webSocket({
      url: WS_ENDPOINT,
      openObserver: {
        next: () => {
          console.log('connetion ok');
        }
      },
    });
  }
  sendMessage(msg: any) {
    this.socket$.next(msg);
  }
  close() {
    this.socket$.complete();
  }

}

 */


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