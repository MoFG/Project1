import { PropertyPage } from './../property/property';
import { PropertyService } from './../../providers/properties.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheet } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import * as $ from 'jquery';
import firebase from 'firebase';


@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  property: any;
  shoppingItems: FirebaseListObservable<any[]>;
  items: any = this.navParams.get('items');

  constructor(public navCtrl: NavController, public navParams: NavParams, public propertySvc: PropertyService,
  public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController,public firebaseProvider: FirebaseProvider,
  public afd: AngularFireDatabase) {
    // this.property = this.navParams.data;
    this.shoppingItems = this.firebaseProvider.getShoppingItems();
    
  }

  goForm(){
    $('.createForm').toggleClass('showForm');
    $('.wrapper').addClass('showWrapper');
  }

  outForm(){
    $('.wrapper').removeClass('showWrapper');
    $('.createForm').removeClass('showForm');
  }

  goDetail(items: any){
    console.log(items);
    this.afd.list('/items').subscribe(res => {
      console.log(res);
    })
  }
  
  // updateAsset(id: number, model: string, category:string, quantity: number, description: string, thumbnail: string): void{
  //   const assetRef: firebase.database.Reference = firebase.database().ref(`/items/`);
  //   assetRef.set({
  //     id,
  //     model,
  //     category,
  //     quantity,
  //     description,
  //     thumbnail
  //   });
  // }
}
