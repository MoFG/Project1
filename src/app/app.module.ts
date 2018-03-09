import { PrinterPage } from './../pages/printer/printer';
import { ProjectorPage } from './../pages/projector/projector';
import { LaptopPage } from './../pages/laptop/laptop';
import { enviroment } from './../enviroments/enviroment';
import { HttpClientModule } from '@angular/common/http';
import { DetailPage } from './../pages/detail/detail';
import { PropertyPage } from './../pages/property/property';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from './../pages/login/login';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { CategoryPage } from '../pages/category/category';
import { DatabaseProvider } from '../providers/database/database';
import { ManagePage } from '../pages/manage/manage';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    PropertyPage,
    DetailPage,
    CategoryPage,
    ManagePage,
    LaptopPage,
    ProjectorPage,
    PrinterPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    AngularFireModule.initializeApp(enviroment.firebase),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    PropertyPage,
    DetailPage,
    CategoryPage,
    ManagePage,
    LaptopPage,
    ProjectorPage,
    PrinterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider,
    DatabaseProvider
  ]
})
export class AppModule { }
