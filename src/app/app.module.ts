import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LaptopPage } from '../pages/laptop/laptop';
import { CategoryPage } from '../pages/category/category';
import { DetailPage } from '../pages/detail/detail';
import { LoginPage } from '../pages/login/login';
import { ManagePage } from '../pages/manage/manage';
import { PrinterPage } from '../pages/printer/printer';
import { ProjectorPage } from '../pages/projector/projector';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthServiceProvider } from "../providers/auth-service/auth-service";
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { enviroment } from '../enviroments/enviroment';
import { HttpModule } from '@angular/http';
import { DatabaseProvider } from '../providers/database/database';
import { PropertyPage } from '../pages/property/property';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LaptopPage,
    CategoryPage,
    DetailPage,
    LoginPage,
    ManagePage,
    PrinterPage,
    ProjectorPage
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
    HomePage,
    LaptopPage,
    CategoryPage,
    DetailPage,
    LoginPage,
    ManagePage,
    PrinterPage,
    ProjectorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    DatabaseProvider
  ]
})
export class AppModule {}
