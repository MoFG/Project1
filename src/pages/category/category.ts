import { PrinterPage } from './../printer/printer';
import { ProjectorPage } from './../projector/projector';
import { LaptopPage } from './../laptop/laptop';
import { DatabaseProvider } from './../../providers/database/database';
import { PropertyPage } from './../property/property';
import { DetailPage } from './../detail/detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  private _COLL: string = "items";    // Defines the name of the database collection
  private _DOC: string = "";          // Defines the initial document ID for the database collection
  private _CONTENT: any;              // Used to store/provide the initial document data for the database collection
  public items: any;
  filterItems: any;                   //Used to find items
  constructor(public navCtrl: NavController, public actionCtrl: ActionSheetController, private _DB: DatabaseProvider) {
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
  // getItems(input: any) {
  //   let searchKeyword = input.target.value;
  //   if (searchKeyword != null) {
  //     this.filterItems = this.items.filter(item =>
  //       item.model.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1
  //     );
  //   } else {
  //     this.filterItems = this.items;
  //   }
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

  retrieveCollection(): void {
    this._DB.getDocuments(this._COLL)
      .then((data) => {
        console.log(data);
        if (data.length === 0) {
          this.generateCollectionAndDocument();
        }
        else {
          this.filterItems = data;
          this.items = data;
        }
      })
      .catch();
  }
  //Go to page Laptop
  goCateLaptop() {
    this.navCtrl.push(LaptopPage);
  }
  //Go to page Projector
  goCateProjector() {
    this.navCtrl.push(ProjectorPage);
  }
  //Go to page Print
  goCateprint() {
    this.navCtrl.push(PrinterPage);
  }
}
