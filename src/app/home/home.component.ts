import { ChangeDetectionStrategy, Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { WebHookService } from '../web-hook.service';
import { TuiNotificationsService } from '@taiga-ui/core';
import { WebHookUpdate } from '../web-hook-update';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

webHookUpdate:Array<WebHookUpdate> = [];

  constructor(private webHookService: WebHookService,
    @Inject(TuiNotificationsService) private notificationsService: TuiNotificationsService) {
    this.webHookUpdate = []
    this.notificationsService = notificationsService;
    this.webHookService.connect().subscribe((res) => {
      console.log("Web Socket Response in Component: " + res.data);
      let response = JSON.parse(res.data);
      if (response.clientId) {
        this.showConnectedNotification(response);
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

  showConnectedNotification(response:any) {
    this.notificationsService
      .show('Websocket is Connected!', {
        label: 'Connected!',
      }).subscribe();
  }

}
