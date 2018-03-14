import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'page-modal',
    templateUrl: 'modal.html',
})
export class ModalPage {
    public form: any;
    public records: any;
    public model: string = '';
    public category: string = '';
    public thumbnail: string = '';
    public description: string = '';
    public docID: string = '';
    public isEditable: boolean = false;
    public title: string = 'Send new request';
    private _RCOLL: string = "requests";
    constructor(public navCtrl: NavController, public navParams: NavParams, private _FB: FormBuilder, private _DB: DatabaseProvider,
        private _ALERT: AlertController, private viewCtrl: ViewController) {
        this.form = _FB.group({
            'model': ['', Validators.required],
            'category': ['', Validators.required],
            'thumbnai': ['', Validators.required],
            'description': ['', Validators.required]
        });

        if(navParams.get('isEdited')){
            let record = navParams.get('record');
            this.model = record.item.model;
            this.category = record.item.category;
            this.thumbnail = record.item.thumbnail;
            this.description = record.item.description;
            this.isEditable = true;
            this.title = 'Send Request';
        }
    }

    saveRequest(val: any): void{
        let model: string = this.form.controls["model"].value,
        category: string = this.form.controls["category"].value,
        thumbnai: string = this.form.controls["thumbnail"].value,
        description: string = this.form.controls["description"].value
            
    }

    ionViewDidLoad() {

    }

    // Back to Home page
    dismiss() {
        this.viewCtrl.dismiss();
    }

}
