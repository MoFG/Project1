
import { PropertyPage } from './../property/property';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { DashboardPage } from './../dashboard/dashboard';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading,LoadingController,AlertController } from 'ionic-angular';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = {emai: '', password:''};

  
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }
  public login(){
    this.showLoading();
    this.auth.login(this.registerCredentials).subscribe(allowed =>{
      if(allowed){
        //login success -> Property Page (asset list)
        this.navCtrl.setRoot(PropertyPage);
      }else{
        this.showError('Access Denied!')
      }
    },
    error =>{
      this.showError(error);
    });
  }

  public showLoading(){
    this.loading = this.loadingCtrl.create({
      content:'Please wait...',
      dismissOnPageChange:true
    });
    this.loading.present();
  }

  public showError(text){
    this.loading.dismiss();
    //create messege error
    let alert = this.alertCtrl.create({
      title:'Fail',
      subTitle:text,
      buttons:['OK']
    });
    alert.present(alert);
  }

}
