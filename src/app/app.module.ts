import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { EventsPage } from '../pages/events/events';
import { EventDetailsPage } from '../pages/eventDetails/eventDetails';
import { EventDetailsComponent } from '../components/eventdetails/eventdetails.component'
import { TestApi } from '../services/event-api.service'
import { EventsDateFramePipe } from '../pipes/events-date-frame.pipe'

@NgModule({
  declarations: [
    MyApp,
    EventsPage,
    EventDetailsPage,
    EventsDateFramePipe,
    EventDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EventsPage,
    EventDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TestApi,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
