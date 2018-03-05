import { FirebaseProvider } from "./../../providers/firebase/firebase";
import { DetailPage } from "./../detail/detail";
import { DashboardPage } from "./../dashboard/dashboard";
import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, MenuController } from "ionic-angular";
import { PropertyService } from "../../providers/properties.service";
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
  properties: Array<any>;
  searchKey: string = "";
  pushDashboardPage: any;
  public shoppingItems: FirebaseListObservable<any[]>;
  newItem = "";

  public assetList:Array<any>;
  public loadedAssetList:Array<any>;
  public assetRef:firebase.database.Reference;

  constructor(
    public navCtrl: NavController,
    private propertySvc: PropertyService,
    public firebaseProvider: FirebaseProvider,
    public menu: MenuController
  ) {
    this.findAll();
    this.shoppingItems = this.firebaseProvider.getShoppingItems();

    this.assetRef = firebase.database().ref('/items');

    this.assetRef.on('value', assetList => {
      let assets = [];
      assetList.forEach(items => {
        assets.push(items.val());
        return false;
      });
      this.assetList = assets;
      this.loadedAssetList = assets;
    });
  }

  initializeItems(): void {
    this.assetList = this.loadedAssetList;
  }

  getItems(searchbar) {
    this.initializeItems();
    //set q to the value of the searchbar
    var q = searchbar.target.value;
    if (!q) {
      return;
    }
    this.assetList = this.assetList.filter(v => {
      if (v.model && q) {
        if (v.model.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
    console.log(q, this.assetList.length);
  }

  onInput(event) {
    this.propertySvc
      .findByName(this.searchKey)
      .then(data => {
        this.properties = data;
      })
      .catch(error => alert(JSON.stringify(error)));
  }

  onCancel(event) {
    this.findAll();
  }

  findAll() {
    this.propertySvc
      .findAll()
      .then(data => (this.properties = data))
      .catch(error => alert(error));
  }

  gomenu() {
    $(".propertymenu").toggleClass("showMenu");
    $(".list-asset").toggleClass("hide");
  }

  goDetail(items: any) {
    this.navCtrl.push(DetailPage, { items: items });
    console.log(items.id);
  }

  goCategory(){
    this.navCtrl.push(CategoryPage);
  }
  // addItem(){
  //   this.firebaseProvider.addItem(this.newItem);
  // }

  removeItem(id) {
    this.firebaseProvider.removeItem(id);
  }
  
  pushAssets() {
    return this.gomenu();
  }

  goLogin() {
    this.navCtrl.push(LoginPage);
  }
}
