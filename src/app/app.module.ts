import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { iconsPathFactory, TUI_ICONS_PATH } from '@taiga-ui/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  TuiNotificationsModule,
  TuiDialogModule,
  TuiRootModule,
} from '@taiga-ui/core';
import { TuiAccordionModule } from '@taiga-ui/kit';
import { HomeComponent } from './home/home.component';
import { WebHookService } from './web-hook.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,
    TuiRootModule,
    TuiNotificationsModule,
    TuiDialogModule,
    TuiAccordionModule,
    AppRoutingModule
  ],
  providers: [
    WebHookService,
    {
      provide: TUI_ICONS_PATH,
      useValue: iconsPathFactory('assets/taiga-ui/icons/'),
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
