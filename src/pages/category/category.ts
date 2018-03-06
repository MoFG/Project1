
import { DetailPage } from './../detail/detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  public shoppingItems: FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.firebaseProvider.getShoppingItems().subscribe(res => {
    //   this.shoppingItems = res;
    // })
  }

}
