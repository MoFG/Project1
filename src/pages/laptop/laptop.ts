import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
  selector: 'page-laptop',
  templateUrl: 'laptop.html',
})
export class LaptopPage {

  private _COLL: string;
  public items: Array<any>;
  categoryId: string;
  public cateLap: string = 'LT01';
  constructor(public navCtrl: NavController, public navParams: NavParams, private _DB: DatabaseProvider, ) {
    this.categoryId = this.navParams.get('cateId');
    // console.log("dsadadasdasdasdas",this.categoryId)
  }

  ionViewDidLoad() {
    this.retrieveCollection();
  }
  retrieveCollection(): void {
    let i: number;
    // let itemList: Array<any>;
    this._COLL = "items";
    this._DB
      .getDocuments(this._COLL)
      .then(data => {
        this.items = data.filter(ele => ele.categoryId == this.categoryId);
      })
      .catch();
  }
}
