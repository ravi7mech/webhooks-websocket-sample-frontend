import { ChangeDetectionStrategy, Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { WebHookService } from '../web-hook.service';
import { WebHookUpdate } from '../web-hook-update';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

webHookUpdate:Array<WebHookUpdate> = [];

  constructor(private webHookService: WebHookService) {
    this.webHookUpdate = []
    this.webHookService.connect().subscribe((res) => {
      console.log("Web Socket Response in Component: " + res.data);
      let response = JSON.parse(res.data);
      if (response.clientId) {
        alert(`Websocket is Connected! Client Id : ${response.clientId}`);
        console.log(this.webHookUpdate);
      }else{
        this.webHookUpdate.push({
          msgHead: response.object, 
          msgContent: JSON.stringify(response.entry[0])
        });
      }
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.webHookService.close();
}


}
