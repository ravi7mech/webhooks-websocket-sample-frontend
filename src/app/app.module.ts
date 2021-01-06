import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WebHookService } from './web-hook.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    WebHookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
