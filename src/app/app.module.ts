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
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthServiceProvider } from "../providers/auth-service/auth-service";
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { enviroment } from '../enviroments/enviroment';
import { HttpModule } from '@angular/http';
import { DatabaseProvider } from '../providers/database/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LaptopPage,
    CategoryPage,
    DetailPage,
    LoginPage,
    ManagePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
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
    ManagePage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    DatabaseProvider,
    Transfer,
    Camera
  ]
})
export class AppModule {}
