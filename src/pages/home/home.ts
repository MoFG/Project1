
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { ActionSheetController } from "ionic-angular/components/action-sheet/action-sheet-controller";
import { ManagePage } from "./../manage/manage";
import { DatabaseProvider } from "./../../providers/database/database";
import { DetailPage } from "./../detail/detail";
import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  AlertController,
  ItemSliding
} from "ionic-angular";
import {
  AngularFireDatabase,
  FirebaseListObservable
} from "angularfire2/database-deprecated";
import * as $ from "jquery";
import { AsyncPipe } from "@angular/common";
import { LoginPage } from "../login/login";
import firebase, { auth } from "firebase";
import { CategoryPage } from "../category/category";
import { ToastController } from "ionic-angular/components/toast/toast-controller";
import { FormBuilder } from '@angular/forms';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  private _COLL: string = "items"; // Defines the name of the database collection
  private _DOC: string = ""; // Defines the initial document ID for the database collection
  private _CONTENT: any; // Used to store/provide the initial document data for the database collection
  public items: any;
  filterItems: any; //Used to find items
  assetlist: string = "assets";

  constructor(
    public navCtrl: NavController,
    private _DB: DatabaseProvider,
    private _ALERT: AlertController,
    public actionCtrl: ActionSheetController,
    private toastCtrl: ToastController,
    public auth: AuthServiceProvider,
    public http: Http
  ) {
    this.checkRole();

    this._CONTENT = {
      id: "",
      categoryId: "",
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

  // Demo send request: Doing
  sendRequest() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let data = JSON.stringify({ username: "user1" });
    this.http.post('http://localhost:8100/server/server.php',data)
    .map(res => res.json()).subscribe(res => {
      alert("success " + res);
    },(err) =>{
      alert("failed");
    });
  }

  // check role login
  checkRole() {
    let account = this.auth.getUserInfo();
    if (account.role == false) {
      console.log('role = ' + account.role);
      //Disable function add
      this.xFunction();
    } else {
      //to do...
    }
  }

  xFunction() {
    $(document).ready(function () {
      $('.btnadd').addClass('hide');
    });
  }

  //Function search items
  getItems(input: any) {
    let searchKeyword = input.target.value;
    if (searchKeyword != null) {
      this.filterItems = this.items.filter(
        item =>
          item.model.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1
      );
    } else {
      this.filterItems = this.items;
    }
  }

  //  Go detail of item
  goDetail(item: any) {
    this.navCtrl.push(DetailPage, { item: item });
    console.log(item);
  }
  //  Go category page
  goCategory() {
    this.navCtrl.push(CategoryPage);
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
    this._DB
      .createAndPopulateDocument(this._COLL, this._DOC, this._CONTENT)
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
    this._DB
      .getDocuments(this._COLL)
      .then(data => {
        console.log(data);
        // IF we don't have any documents then the collection doesn't exist
        // so we create it!
        if (data.length === 0) {
          this.generateCollectionAndDocument();
        } else {
          // Otherwise the collection does exist and we assign the returned
          // documents to the public property of locations so this can be
          // iterated through in the component template
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


}
