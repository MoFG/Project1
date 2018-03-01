import { DetailPage } from './../detail/detail';
import { DashboardPage } from './../dashboard/dashboard';
import { Component } from '@angular/core';
import { IonicPage, NavController, App, MenuController} from 'ionic-angular';
import {PropertyService} from '../../providers/properties.service';
@Component({
  selector: 'page-property',
  templateUrl: 'property.html',
})
export class PropertyPage {
  properties: Array<any>;
  searchKey: string = "";
  pushDashboardPage : any;

  constructor(public navCtrl: NavController, private propertySvc: PropertyService, app: App, menu: MenuController) {
    this.findAll();
    menu.enable(true);
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

  goMenu(){
    this.navCtrl.push(DashboardPage);
  }

  goDetail(property: any){
    this.navCtrl.push(DetailPage, property);
  }

}
