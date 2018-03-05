import { DetailPage } from './../pages/detail/detail';

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
import { FirebaseProvider } from '../providers/firebase/firebase';
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { CategoryPage } from '../pages/category/category';
import { SettingPage } from '../pages/setting/setting';

const firebaseConfig = {
  apiKey: "AIzaSyA4bdVxe4tjPgG89P2gt8-Optvjj_pgxLM",
  authDomain: "assetmanagement-20f41.firebaseapp.com",
  databaseURL: "https://assetmanagement-20f41.firebaseio.com",
  projectId: "assetmanagement-20f41",
  storageBucket: "assetmanagement-20f41.appspot.com",
  messagingSenderId: "440302531046"
};


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    DashboardPage,
    PropertyPage,
    DetailPage,
    CategoryPage,
    SettingPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    DashboardPage,
    PropertyPage,
    DetailPage,
    CategoryPage,
    SettingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider,
    PropertyService,
    FirebaseProvider
  ]
})
export class AppModule { }
