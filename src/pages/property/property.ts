import { FirebaseProvider } from './../../providers/firebase/firebase';
import { DetailPage } from './../detail/detail';
import { DashboardPage } from './../dashboard/dashboard';
import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import {PropertyService} from '../../providers/properties.service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-property',
  templateUrl: 'property.html',
})
export class PropertyPage {
  properties: Array<any>;
  searchKey: string = "";
  pushDashboardPage : any;
  shoppingItems: FirebaseListObservable<any[]>;
  newItem = '';

  constructor(public navCtrl: NavController, private propertySvc: PropertyService,
    public firebaseProvider: FirebaseProvider) {
    this.findAll();
    this.shoppingItems = this.firebaseProvider.getShoppingItems();
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

  addItem(){
    this.firebaseProvider.addItem(this.newItem);
  }

  removeItem(id){
    this.firebaseProvider.removeItem(id);
  }

}
