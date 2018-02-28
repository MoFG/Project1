
import { PropertyPage } from './../property/property';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  properties: Array<any>;


  findAll() {
    this.properties = []
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  pushAssets(){
    this.navCtrl.push(PropertyPage);
  }

  goLogin(){
    this.navCtrl.push(LoginPage);
  }

}
