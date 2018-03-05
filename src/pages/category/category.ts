
import { DetailPage } from './../detail/detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  public shoppingItems: FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public firebaseProvider: FirebaseProvider) {
    // this.firebaseProvider.getShoppingItems().subscribe(res => {
    //   this.shoppingItems = res;
    // })
    this.shoppingItems = this.firebaseProvider.getShoppingItems();
  }

}
