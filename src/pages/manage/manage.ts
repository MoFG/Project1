import { AlertController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

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
  public quantity: string = '';
  public picture: string = '';
  public thumbnail: string = '';
  public state: string = '';
  public description: string = '';
  public docID: string = '';
  public isEditable: boolean = false;
  public title: string = 'Add a new asset';
  private _COLL: string = "items";

  constructor(public navCtrl: NavController, public navParams: NavParams, private _FB: FormBuilder, private _DB: DatabaseProvider,
    private _ALERT: AlertController) {
    this.form = _FB.group({
      // 'id': ['', Validators.required],
      'model': ['', Validators.required],
      'categoryId': ['', Validators.required],
      'category': ['', Validators.required],
      'quantity': ['', Validators.required],
      'picture': ['', Validators.required],
      'thumbnail': ['', Validators.required],
      'state': ['', Validators.required],
      'description': ['', Validators.required]
    });

    if (navParams.get('isEdited')) {
      let record = navParams.get('record');

      this.model = record.item.model;
      this.categoryId = record.item.categoryId;
      this.category = record.item.category;
      this.quantity = record.item.quantity;
      this.picture = record.item.picture;
      this.thumbnail = record.item.thumbnail;
      this.state = record.item.state;
      this.description = record.item.description;
      this.docID = record.item.id;
      this.isEditable = true;
      this.title = 'Update this document';
    }
  }


  saveDocument(val: any): void {
    let model: string = this.form.controls["model"].value,
      categoryId: string = this.form.controls["categoryId"].value,
      category: string = this.form.controls["category"].value,
      quantity: string = this.form.controls["quantity"].value,
      picture: string = this.form.controls["picture"].value,
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
          category: category,
          quantity: quantity,
          picture: picture,
          thumbnail: thumbnail,
          state: state,
          description: description
        })
        .then((data) => {
          this.displayAlert('Success', 'The document ' + model + ' was successfully updated');
        })
        .catch((error) => {
          this.displayAlert('Updating document failed', error.message);
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
          category: category,
          quantity: quantity,
          picture: picture,
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
    this.picture = '';
    this.thumbnail = '';
    this.state = '';
    this.description = '';
  }

}
