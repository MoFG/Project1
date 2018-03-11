import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { ManagePage } from './../manage/manage';
import { DatabaseProvider } from './../../providers/database/database';
import { DetailPage } from "./../detail/detail";
import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, AlertController } from "ionic-angular";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database-deprecated";
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


  private _COLL: string = "items";    // Defines the name of the database collection
  private _DOC: string = "";          // Defines the initial document ID for the database collection
  private _CONTENT: any;              // Used to store/provide the initial document data for the database collection
  public items: any;
  filterItems: any;                   //Used to find items


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
  }

  //Function search items
  getItems(input: any) {
    let searchKeyword = input.target.value;
    if (searchKeyword != null) {
      this.filterItems = this.items.filter(item =>
        item.model.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1
      );
    } else {
      this.filterItems = this.items;
    }
  }

  //  jQuery for menu
  gomenu() {
    $(".propertymenu").toggleClass("showMenu");
    $('.wrapper').toggleClass('showWrapper');
  }
  //  Go detail of item
  goDetail(item: any) {
    this.navCtrl.push(DetailPage, { item: item });
    console.log(item.id);
  }
  //  Go category page
  goCategory() {
    this.navCtrl.push(CategoryPage);
  }
  //  Go Menu
  pushAssets() {
    return this.gomenu();
  }
  //  Come back form Login
  goLogin() {
    this.navCtrl.push(LoginPage);
  }
  // Call retrieveCollection() to show list item
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

  // Retrieve all documents from the specified collection
  // getDocuments method of the DatabaseProvider
  retrieveCollection(): void {
    this._DB.getDocuments(this._COLL)
      .then((data) => {
        console.log(data);
        // IF we don't have any documents then the collection doesn't exist
        // so we create it!
        if (data.length === 0) {
          this.generateCollectionAndDocument();
        }

        // Otherwise the collection does exist and we assign the returned
        // documents to the public property of locations so this can be
        // iterated through in the component template
        else {
          this.filterItems = data;
          this.items = data;
        }
      })
      .catch();
  }

  // Go to Form at ManagePage: create, update.
  addDocument(): void {
    this.navCtrl.push(ManagePage);
  }

  // Update item
  updateDocument(obj): void {
    let params: any = {
      collection: this._COLL,
      item: obj
    };
    this.navCtrl.push(ManagePage, { record: params, isEdited: true });
  }

  //  Delete item
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
