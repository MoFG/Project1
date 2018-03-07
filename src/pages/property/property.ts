import { ManagePage } from './../manage/manage';
import { DatabaseProvider } from './../../providers/database/database';
import { DetailPage } from "./../detail/detail";
import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, AlertController } from "ionic-angular";
import {
  FirebaseListObservable,
  AngularFireDatabase
} from "angularfire2/database";
import * as $ from "jquery";
import { AsyncPipe } from "@angular/common";
import { LoginPage } from "../login/login";
import firebase from "firebase";
import { CategoryPage } from '../category/category';

@Component({
  selector: "page-property",
  templateUrl: "property.html"
})
export class PropertyPage {
  searchKey: string = "";
  pushDashboardPage: any;
  newItem = "";
  private _COLL: string = "items";
  private _DOC: string = "Xy76Re34SdFR1";
  private _CONTENT: any;
  public items: any;

  constructor(public navCtrl: NavController, private _DB: DatabaseProvider, private _ALERT: AlertController) {
    this._CONTENT = {
      id:'1',
      categoryId: 'CT1',
      model: "HP 250X",
      category: "Laptop",
      quantity: "20",
      picture: "https://images-na.ssl-images-amazon.com/images/I/71yyt-7PlxL._SX355_.jpg",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/I/41bwvPP3qZL._AC_SY200_.jpg",
      state: "Open",
      logo: "https://images-na.ssl-images-amazon.com/images/I/51GJs9CSkML._AC_SY200_.jpg",
      description: "8Gb RAM, SSD512Gb, Intel Core i9 9989HQ"
    };
  }

  gomenu() {
    $(".propertymenu").toggleClass("showMenu");
    $(".list-asset").toggleClass("hide");
  }
  goDetail(item: any) {
    this.navCtrl.push(DetailPage, { item: item });
    console.log(item.model);
  }
  goCategory() {
    this.navCtrl.push(CategoryPage);
  }
  pushAssets() {
    return this.gomenu();
  }
  goLogin() {
    this.navCtrl.push(LoginPage);
  }
  goForm() {
    $('.createForm').toggleClass('showForm');
    $('.wrapper').addClass('showWrapper');
  }

  outForm() {
    $('.wrapper').removeClass('showWrapper');
    $('.createForm').removeClass('showForm');
  }

  //remove text in form
  // clearForm():void {
  
  // }

  ionViewDidEnter() {
    this.retrieveCollection();
  }
  generateCollectionAndDocument(): void {
    this._DB.createAndPopulateDocument(this._COLL,
      this._DOC,
      this._CONTENT)
      .then((data: any) => {
        console.dir(data);
      })
      .catch((error: any) => {
        console.dir(error);
      });
  }

  /**
    * Retrieve all documents from the specified collection using the
    * getDocuments method of the DatabaseProvider service
    *
    * @public
    * @method retrieveCollection
    * @return {none}
    */
  retrieveCollection(): void {
    this._DB.getDocuments(this._COLL)
      .then((data) => {

        // IF we don't have any documents then the collection doesn't exist
        // so we create it!
        if (data.length === 0) {
          this.generateCollectionAndDocument();
        }

        // Otherwise the collection does exist and we assign the returned
        // documents to the public property of locations so this can be
        // iterated through in the component template
        else {
          this.items = data;
        }
      })
      .catch();
  }

  addDocument(): void {
    this.navCtrl.push(ManagePage);
  }
  updateDocument(obj): void {
    let params: any = {
      collection: this._COLL,
      item: obj
    };
    this.navCtrl.push(ManagePage, { record: params, isEdited: true });
  }
  deleteDocument(obj): void {
    this._DB.deleteDocument(this._COLL,
      obj.id)
      .then((data: any) => {
        this.displayAlert('Success', 'The record ' + obj.model + ' was successfully removed');
      })
      .catch((error: any) => {
        this.displayAlert('Error', error.message);
      });
  }
  displayAlert(title: string,
    message: string): void {
    let alert: any = this._ALERT.create({
      title: title,
      subTitle: message,
      buttons: [{
        text: 'Got It!',
        handler: () => {
          this.retrieveCollection();
        }
      }]
    });
    alert.present();
  }

}
