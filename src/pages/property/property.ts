import { DashboardPage } from './../dashboard/dashboard';
import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import {PropertyService} from '../../providers/properties.service';
@Component({
  selector: 'page-property',
  templateUrl: 'property.html',
})
export class PropertyPage {
  properties: Array<any>;
  searchKey: string = "";
  pushDashboardPage : any;

  constructor(public navCtrl: NavController, private propertySvc: PropertyService) {
    this.findAll();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PropertyPage');
  }

  onInput(event){
    this.propertySvc.findByName(this.searchKey).then(data =>{
      this.properties = data}).catch(error => alert(JSON.stringify(error)));
  }

  onCancel(event){
    this.findAll();
  }

  findAll(){
    this.propertySvc.findAll().then(data => this.properties = data)
    .catch(error => alert(error));
  }

}
