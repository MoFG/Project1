import { PropertyPage } from './../pages/property/property';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from './../pages/login/login';
import { DashboardPage } from './../pages/dashboard/dashboard';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { PropertyService } from '../providers/properties.service';
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    DashboardPage,
    PropertyPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    DashboardPage,
    PropertyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    PropertyService
  ]
})
export class AppModule {}
