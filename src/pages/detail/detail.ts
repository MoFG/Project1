import { PropertyPage } from './../property/property';
import { PropertyService } from './../../providers/properties.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheet } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import * as $ from 'jquery';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  property: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public propertySvc: PropertyService,
  public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController) {
    this.property = this.navParams.data;
  }

  goForm(){
    $('.createForm').toggleClass('showForm');
    $('.wrapper').addClass('showWrapper');
  }

  outForm(){
    $('.wrapper').removeClass('showWrapper');
    $('.createForm').removeClass('showForm');
  }
  
}
