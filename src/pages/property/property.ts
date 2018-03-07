import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
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
  public assetRef: firebase.database.Reference; //pull data from firebase
  public assetList: Array<any>;//get data from firebase
  public loadAssetList: Array<any>;

  searchKey: string = "";
  pushDashboardPage: any;
  newItem = "";
  private _COLL: string = "items";
  private _DOC: string = "";
  private _CONTENT: any;
  public items: any;

  constructor(public navCtrl: NavController, private _DB: DatabaseProvider, private _ALERT: AlertController, public actionCtrl: ActionSheetController) {
    this._CONTENT = {
      id: '',
      categoryId: '',
      model: "",
      category: "",
      quantity: "",
      picture: "",
      thumbnail: "",
      state: "",
      logo: "",
      description: ""
    };
    // this.assetRef = firebase.database().ref('/items');
    // this.assetRef.on('value', assetList => {
    //   let assets = [];
    //   assetList.forEach(asset => {
    //     assets.push(asset.val());
    //     return false;
    //   });

    //   this.assetList = assets;
    //   this.loadAssetList = assets;
    // });
  }

  // initializeItems(): void {
  //   this.assetList = this.loadAssetList;
  // }

  // getItems(searchbar) {
  //   this.initializeItems();
  //   var q = searchbar.srcElement.value;
  //   if (!q) {
  //     return;
  //   }

  //   this.assetList = this.assetList.filter((v) => {
  //     if (v.model && q) {
  //       if (v.model.toLowercase().indexOf(q.toLowercase()) < -1) {
  //         return false;
  //       }
  //       return false;
  //     }
  //   });
  //   console.log(q, this.assetList.length);
  // }

  gomenu() {
    $(".propertymenu").toggleClass("showMenu");
    $(".list-asset").toggleClass("hide");
    $(".btnadd").toggleClass("hide");
  }
  goDetail(item: any) {
    this.navCtrl.push(DetailPage, { item: item });
    console.log(item.id);
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
    let alert = this._ALERT.create({
      title: 'DELETE',
      message: 'DO YOU REALLY WANT TO DELETE',
      buttons: [{
        text: 'NO',
        handler: data => {
          console.log('NO clicked!');
        }
      }, {
        text: 'YES',
        handler: () => {
          this._DB.deleteDocument(this._COLL,
            obj.id)
            .then((data: any) => {
              this.displayAlert('Success', 'The record ' + obj.model + ' was successfully removed');
            })
            .catch((error: any) => {
              this.displayAlert('Error', error.message);
            });
        }
      }]
    });
    alert.present();
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