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
import { SettingPage } from '../pages/setting/setting';
import { DatabaseProvider } from '../providers/database/database';
import { ManagePage } from '../pages/manage/manage';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    PropertyPage,
    DetailPage,
    CategoryPage,
    SettingPage,
    ManagePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    // AngularFireModule.initializeApp(enviroment),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    PropertyPage,
    DetailPage,
    CategoryPage,
    SettingPage,
    ManagePage
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
