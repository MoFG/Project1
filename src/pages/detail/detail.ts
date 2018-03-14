
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheet, AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as $ from 'jquery';
import firebase from 'firebase';
import { HomePage } from '../home/home';
import { ManagePage } from '../manage/manage';
import { DatabaseProvider } from '../../providers/database/database';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  item: any = this.navParams.get('item');
  private _DOC: string = "";
  private _CONTENT: any;
  public items: any;
  private _COLL: string = "items"; // Defines the name of the database collection
  private _RCOLL: string = "requests";
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController,
    public afd: AngularFireDatabase, private _DB: DatabaseProvider, private _ALERT: AlertController,
    public auth: AuthServiceProvider) {

    this.checkRole();
  }

  // check role login
  checkRole() {
    let access = this.auth.getUserInfo();
    if (access.role == false) {
      this.xFunction();
    } else {
      this.yFunction();
    }
  }
  // Disable function edit, delete
  xFunction() {
    $(document).ready(function () {
      $('.ionfab').addClass('hide');
    });
  }
  // Disable function send request
  yFunction() {
    $(document).ready(function () {
      $('.icon-request').addClass('hide');
    });
  }
  
  //doing........
  openModal(item: any) {
    this._COLL = "requests";
    let conFirm = this._ALERT.create({
      title: 'Request',
      message: 'Do you want to rent this asset ?',
      buttons: [{
        text: 'Disagree',
        handler: () => {
          //do something
          console.log('Disagree clicked!');
        }
      },
      {
        text: 'Agree',
        handler: () => {
          // do something 
          console.log('Agree clicked!', { item: item });
          
        }
      }
      ]
    });
    conFirm.present();
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
          this.items = data;
        }
      })
      .catch();
  }

  //Form send request
  // sendRequest(obj): void{
  //   let params: any = {
  //     collection: this._RCOLL,
  //     item: obj
  //   };
  //   this.navCtrl.push(ModalPage, {record:params, isEdited: true});
  // }

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
      message: 'Do you really want to delete ?',
      buttons: [{
        text: 'No',
        handler: data => {
          console.log('NO clicked!');
        }
      }, {
        text: 'Yes',
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
