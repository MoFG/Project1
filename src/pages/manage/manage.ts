import { AngularFireStorageModule, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFireStorage } from 'angularfire2/storage';
import { AlertController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';

@IonicPage({
  name: "manage-page"
})
@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html',
})
export class ManagePage {
  public form: any;
  public records: any;
  public model: string = '';
  public categoryId: string = '';
  public category: string = '';
  public userId: string = '';
  public quantity: string = '';
  public thumbnail: string = '';
  public state: string = '';
  public description: string = '';
  public docID: string = '';
  public isEditable: boolean = false;
  public title: string = 'Add a new asset';
  private _COLL: string = "items";

  constructor(public navCtrl: NavController, public navParams: NavParams, private _FB: FormBuilder, private _DB: DatabaseProvider,
    private _ALERT: AlertController, private transfer: Transfer, private camera: Camera) {
    this.form = _FB.group({
      'model': ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      'categoryId': ['', Validators.required],
      // 'category': ['', Validators.required],
      'quantity': ['', Validators.compose([Validators.pattern('^[0-9]*'), Validators.maxLength(4), Validators.required])],
      'thumbnail': ['', Validators.required],
      'state': ['', Validators.required],
      'description': ['', Validators.required]
    });

    if (navParams.get('isEdited')) {
      let record = navParams.get('record');

      this.model = record.item.model;
      this.categoryId = record.item.categoryId;
      // this.category = record.item.category;
      this.quantity = record.item.quantity;
      this.thumbnail = record.item.thumbnail;
      this.state = record.item.state;
      this.description = record.item.description;
      this.docID = record.item.id;
      this.isEditable = true;
      this.title = 'Update';
    }
  }

  saveDocument(val: any): void {
    let model: string = this.form.controls["model"].value,
      categoryId: string = this.form.controls["categoryId"].value,
      // category: string = this.form.controls["category"].value,
      quantity: string = this.form.controls["quantity"].value,
      thumbnail: string = this.form.controls["thumbnail"].value,
      state: string = this.form.controls["state"].value,
      description: string = this.form.controls["description"].value;

    // If we are editing an existing record then handle this scenario
    if (this.isEditable) {

      // Call the DatabaseProvider service and pass/format the data for use
      // with the updateDocument method
      this._DB.updateDocument(this._COLL,
        this.docID,
        {
          model: model,
          categoryId: categoryId,
          // category: category,
          quantity: quantity,
          thumbnail: thumbnail,
          state: state,
          description: description
        })
        .then((data) => {
          this.displayAlert('Success', 'The asset ' + model + ' was successfully updated');
        })
        .catch((error) => {
          this.displayAlert('Updating failed', error.message);
        });
    }

    // Otherwise we are adding a new record
    else {

      // Call the DatabaseProvider service and pass/format the data for use
      // with the addDocument method
      this._DB.addDocument(this._COLL,
        {
          model: model,
          categoryId: categoryId,
          // category: category,
          quantity: quantity,
          thumbnail: thumbnail,
          state: state,
          description: description
        })
        .then((data) => {
          this.clearForm();
          this.displayAlert('Record added', 'The document ' + model + ' was successfully added');
        })
        .catch((error) => {
          this.displayAlert('Adding document failed', error.message);
        });
    }
  }

  displayAlert(title: string,
    message: string): void {
    let alert: any = this._ALERT.create({
      title: title,
      subTitle: message,
      buttons: ['Got it!']
    });
    alert.present();
  }



  clearForm(): void {
    this.model = '';
    this.categoryId = '';
    this.category = '';
    this.quantity = '';
    this.thumbnail = '';
    this.state = '';
    this.description = '';
  }

}
