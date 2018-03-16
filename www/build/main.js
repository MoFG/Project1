webpackJsonp([1],{

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_database_database__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_transfer__ = __webpack_require__(361);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ManagePage = (function () {
    function ManagePage(navCtrl, navParams, _FB, _DB, _ALERT, transfer, camera) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._FB = _FB;
        this._DB = _DB;
        this._ALERT = _ALERT;
        this.transfer = transfer;
        this.camera = camera;
        this.model = '';
        this.categoryId = '';
        this.category = '';
        this.userId = '';
        this.quantity = '';
        this.thumbnail = '';
        this.state = '';
        this.description = '';
        this.docID = '';
        this.isEditable = false;
        this.title = 'Add a new asset';
        this._COLL = "items";
        this.form = _FB.group({
            'model': ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('[a-zA-Z0-9 ]*'), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])],
            'categoryId': ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            // 'category': ['', Validators.required],
            'quantity': ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('^[0-9]*'), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(4), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])],
            'thumbnail': ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            'state': ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            'description': ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required]
        });
        if (navParams.get('isEdited')) {
            var record = navParams.get('record');
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
    // Function upload file: Doing...
    ManagePage.prototype.upload = function () {
        var _this = this;
        var options = {
            quality: 100
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            var fileTransfer = _this.transfer.create();
            var options1 = {
                fileKey: 'file',
                fileName: 'name.jpg',
                headers: {}
            };
            fileTransfer.upload(imageData, 'http://localhost/ionic/server2.php', options1)
                .then(function (data) {
                // success
                alert("success");
            }, function (err) {
                // error
                alert("error" + JSON.stringify(err));
            });
        });
    };
    ManagePage.prototype.saveDocument = function (val) {
        var _this = this;
        var model = this.form.controls["model"].value, categoryId = this.form.controls["categoryId"].value, 
        // category: string = this.form.controls["category"].value,
        quantity = this.form.controls["quantity"].value, thumbnail = this.form.controls["thumbnail"].value, state = this.form.controls["state"].value, description = this.form.controls["description"].value;
        // If we are editing an existing record then handle this scenario
        if (this.isEditable) {
            // Call the DatabaseProvider service and pass/format the data for use
            // with the updateDocument method
            this._DB.updateDocument(this._COLL, this.docID, {
                model: model,
                categoryId: categoryId,
                // category: category,
                quantity: quantity,
                thumbnail: thumbnail,
                state: state,
                description: description
            })
                .then(function (data) {
                _this.displayAlert('Success', 'The asset ' + model + ' was successfully updated');
            })
                .catch(function (error) {
                _this.displayAlert('Updating failed', error.message);
            });
        }
        else {
            // Call the DatabaseProvider service and pass/format the data for use
            // with the addDocument method
            this._DB.addDocument(this._COLL, {
                model: model,
                categoryId: categoryId,
                // category: category,
                quantity: quantity,
                thumbnail: thumbnail,
                state: state,
                description: description
            })
                .then(function (data) {
                _this.clearForm();
                _this.displayAlert('Record added', 'The document ' + model + ' was successfully added');
            })
                .catch(function (error) {
                _this.displayAlert('Adding document failed', error.message);
            });
        }
    };
    ManagePage.prototype.displayAlert = function (title, message) {
        var alert = this._ALERT.create({
            title: title,
            subTitle: message,
            buttons: ['Got it!']
        });
        alert.present();
    };
    ManagePage.prototype.clearForm = function () {
        this.model = '';
        this.categoryId = '';
        this.category = '';
        this.quantity = '';
        this.thumbnail = '';
        this.state = '';
        this.description = '';
    };
    ManagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-manage',template:/*ion-inline-start:"C:\Users\skynguyen79\Desktop\git\Project1\src\pages\manage\manage.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="primary">\n\n    <ion-title>{{title}}</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding class="content">\n\n  <form [formGroup]="form" (ngSubmit)="saveDocument(form.value)">\n\n\n\n    <ion-item>\n\n      <ion-label class="ionlabel" floating>Asset Name</ion-label>\n\n      <ion-input type="text" formControlName="model" [(ngModel)]="model"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label class="ionlabel" floating>Category ID</ion-label>\n\n      <ion-select formControlName="categoryId" [(ngModel)]="categoryId">\n\n        <ion-option value="LT01">LT01</ion-option>\n\n        <ion-option value="MA01">MA01</ion-option>\n\n        <ion-option value="MC01">MC01</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n\n\n    <!-- <ion-item>\n\n      <ion-label class="ionlabel" floating>Category</ion-label>\n\n      <ion-select formControlName="category" [(ngModel)]="category">\n\n        <ion-option value="Laptop">Laptop</ion-option>\n\n        <ion-option value="Camera">Camera</ion-option>\n\n        <ion-option value="Projector">Projector</ion-option>\n\n      </ion-select>\n\n    </ion-item> -->\n\n\n\n    <ion-item>\n\n      <ion-label class="ionlabel" floating>Asset Quantity</ion-label>\n\n      <ion-input type="text" formControlName="quantity" [(ngModel)]="quantity"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label class="ionlabel" floating>Asset Thumbnail</ion-label>\n\n      <ion-input type="text" formControlName="thumbnail" [(ngModel)]="thumbnail"></ion-input>\n\n      <!-- <button item-start (click)="upload()" ion-button >Take Pic & Upload </button> -->\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label class="ionlabel" floating>State</ion-label>\n\n      <ion-select formControlName="state" [(ngModel)]="state">\n\n        <ion-option value="available">Available</ion-option>\n\n        <ion-option value="wait">Waiting</ion-option>\n\n        <ion-option value="close">Close</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label class="ionlabel" floating>Description</ion-label>\n\n      <ion-input type="text" formControlName="description" [(ngModel)]="description"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item class="submit-button">\n\n      <button ion-button color="primary" small text-center padding-top padding-bottom [disabled]="!form.valid">\n\n        <div *ngIf="!isEditable">\n\n          Add\n\n        </div>\n\n\n\n        <div *ngIf="isEditable">\n\n          Update\n\n        </div>\n\n      </button>\n\n    </ion-item>\n\n\n\n  </form>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\skynguyen79\Desktop\git\Project1\src\pages\manage\manage.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1__providers_database_database__["a" /* DatabaseProvider */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_transfer__["a" /* Transfer */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */]])
    ], ManagePage);
    return ManagePage;
}());

//# sourceMappingURL=manage.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_auth_service_auth_service__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_action_sheet_action_sheet_controller__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__manage_manage__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_database_database__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__detail_detail__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jquery__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__login_login__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__category_category__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic_angular_components_toast_toast_controller__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_http__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_map__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var HomePage = (function () {
    function HomePage(navCtrl, _DB, _ALERT, actionCtrl, toastCtrl, auth, http, navParams) {
        this.navCtrl = navCtrl;
        this._DB = _DB;
        this._ALERT = _ALERT;
        this.actionCtrl = actionCtrl;
        this.toastCtrl = toastCtrl;
        this.auth = auth;
        this.http = http;
        this.navParams = navParams;
        this._DOC = ""; // Defines the initial document ID for the database collection
        this.assetlist = "assets";
        this.docID = '';
        this.model = '';
        this.state = '';
        this.description = '';
        this.thumbnail = '';
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
        this._RCONTENT = {
            id: "",
            model: "",
            thumbnail: "",
            description: ""
        };
    }
    // Admin denied require user
    HomePage.prototype.denied = function (request) {
        var _this = this;
        this._COLL = "requests";
        var conFirm = this._ALERT.create({
            title: 'CONFIRM',
            message: 'Do you really want to denied ?',
            buttons: [{
                    text: 'No',
                    handler: function (data) {
                        console.log('No clicked!', { request: request });
                    }
                }, {
                    text: 'Yes',
                    handler: function () {
                        console.log('Denied!');
                        _this._DB.deleteDocument(_this._COLL, request.id).then(function (data) {
                            console.log(data);
                            _this.retrieveRequest();
                        }).catch(function (error) {
                            console.log(error);
                        });
                    }
                }]
        });
        conFirm.present();
    };
    //  Admin accept require user
    //  Doing......
    HomePage.prototype.accept = function (request) {
        var conFirm = this._ALERT.create({
            title: 'CONFIRM',
            message: 'Do you really want to accept ?',
            buttons: [{
                    text: 'No',
                    handler: function (data) {
                        console.log('No clicked!');
                    }
                }, {
                    text: 'Yes',
                    handler: function () {
                        console.log('Accepted!', { request: request });
                    }
                }]
        });
        conFirm.present();
    };
    //  Alert function
    HomePage.prototype.displayAlert = function (title, message) {
        var alert = this._ALERT.create({
            title: title,
            subTitle: message,
            buttons: ['Got it!']
        });
        alert.present();
    };
    // check role login
    HomePage.prototype.checkRole = function () {
        var account = this.auth.getUserInfo();
        if (account.role == false) {
            console.log('role = ' + account.role);
            this.xFunction(); //Disable function add
        }
        else {
            //to do...
        }
    };
    HomePage.prototype.xFunction = function () {
        __WEBPACK_IMPORTED_MODULE_7_jquery__(document).ready(function () {
            __WEBPACK_IMPORTED_MODULE_7_jquery__('.btnadd').addClass('hide');
            __WEBPACK_IMPORTED_MODULE_7_jquery__('.requestlist').addClass('hide');
        });
    };
    //Function search items
    HomePage.prototype.getItems = function (input) {
        var searchKeyword = input.target.value;
        if (searchKeyword != null) {
            this.filterItems = this.items.filter(function (item) {
                return item.model.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1;
            });
        }
        else {
            this.filterItems = this.items;
        }
    };
    //  Go detail of item
    HomePage.prototype.goDetail = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__detail_detail__["a" /* DetailPage */], { item: item });
        console.log(item);
    };
    //  Go category page
    HomePage.prototype.goCategory = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__category_category__["a" /* CategoryPage */]);
    };
    //  Come back form Login
    HomePage.prototype.goLogin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__login_login__["a" /* LoginPage */]);
    };
    // Call retrieveCollection() to show list item
    HomePage.prototype.ionViewDidEnter = function () {
        this.retrieveCollection();
        this.retrieveRequest();
    };
    HomePage.prototype.generateCollectionAndDocument = function () {
        this._DB
            .createAndPopulateDocument(this._COLL, this._DOC, this._CONTENT)
            .then(function (data) {
            console.dir(data);
        })
            .catch(function (error) {
            console.dir(error);
        });
    };
    // Retrieve all documents from the specified collection
    // getDocuments method of the DatabaseProvider
    HomePage.prototype.retrieveCollection = function () {
        var _this = this;
        this._COLL = "items";
        this._DB
            .getDocuments(this._COLL)
            .then(function (data) {
            console.log(data);
            // IF we don't have any documents then the collection doesn't exist
            // so we create it!
            if (data.length === 0) {
                _this.generateCollectionAndDocument();
            }
            else {
                // Otherwise the collection does exist and we assign the returned
                // documents to the public property of locations so this can be
                // iterated through in the component template
                _this.filterItems = data;
                _this.items = data;
            }
        })
            .catch();
    };
    // Go to Form at ManagePage: create, update.
    HomePage.prototype.addDocument = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__manage_manage__["a" /* ManagePage */]);
    };
    // REQUEST
    HomePage.prototype.retrieveRequest = function () {
        var _this = this;
        this._COLL = "requests";
        this._DB
            .getDocuments(this._COLL)
            .then(function (data) {
            console.log(data);
            _this.requests = data;
        })
            .catch();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["m" /* Component */])({
            selector: "page-home",template:/*ion-inline-start:"C:\Users\skynguyen79\Desktop\git\Project1\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Asset List</ion-title>\n\n  </ion-navbar>\n\n\n\n  <ion-toolbar no-border-top>\n\n    <ion-segment [(ngModel)]="assetlist">\n\n\n\n      <ion-segment-button value="assets">\n\n        Assets\n\n      </ion-segment-button>\n\n\n\n      <ion-segment-button value="requests">\n\n        Requests\n\n      </ion-segment-button>\n\n\n\n    </ion-segment>\n\n  </ion-toolbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div [ngSwitch]="assetlist">\n\n    <ion-row class="ionrow-topcontent">\n\n      <ion-searchbar class="search" (ionInput)="getItems($event)"></ion-searchbar>\n\n    </ion-row>\n\n\n\n    <!-- Asset list get in Firebase -->\n\n    <ion-list class="list-asset" *ngSwitchCase="\'assets\'">\n\n\n\n      <ion-item *ngFor="let item of filterItems">\n\n        <ion-row class="row-item" (click)="goDetail(item)">\n\n\n\n          <ion-col col-3 class="ioncol-thumbnail">\n\n            <ion-thumbnail item-start class="ionthumbnail">\n\n              <img src="{{item.thumbnail}}" class="thumb" />\n\n            </ion-thumbnail>\n\n          </ion-col>\n\n\n\n          <ion-col col-9>\n\n            <h2 class="name">{{item.model}}</h2>\n\n            <p class="cate">Category: {{item.categoryId == \'LT01\' ?\'Laptop\':\'\' || item.categoryId == \'MC01\' ?\'Projector\' :\'\' || item.categoryId\n\n              == \'MA01\' ?\'Camera\' :\'\'}}</p>\n\n            <p class="state">State: {{item.state}}</p>\n\n          </ion-col>\n\n\n\n        </ion-row>\n\n      </ion-item>\n\n\n\n    </ion-list>\n\n\n\n    <!-- Request list -->\n\n    <div class="requestlist">\n\n    <ion-list class="list-request" *ngSwitchCase="\'requests\'">\n\n\n\n      <ion-item *ngFor="let request of requests">\n\n        <ion-row class="row-item">\n\n\n\n          <ion-col col-2>\n\n            <ion-avatar class="avatar">\n\n              <img src="{{request.thumbnail}}" alt="">\n\n            </ion-avatar>\n\n          </ion-col>\n\n\n\n          <ion-col col-8>\n\n            <div class="info">\n\n              <h2 class="name">{{request.model}}</h2>\n\n              <p class="state">State: {{request.state == \'available\' ?\'wait\':\'\'}}</p>\n\n            </div>\n\n          </ion-col>\n\n\n\n          <ion-col col-2 class="ioncol-button">\n\n            <div class="buttons">\n\n              <div class="btndenied">\n\n                <ion-icon (click)="denied(request)" ios="ios-close-outline" md="md-close-outline" class="denied"></ion-icon>\n\n              </div>\n\n              <div class="btnaccept">\n\n                <ion-icon (click)="accept(request)" ios="ios-checkmark-outline" md="md-checkmark-outline" class="accept"></ion-icon>\n\n              </div>\n\n            </div>\n\n          </ion-col>\n\n\n\n        </ion-row>\n\n      </ion-item>\n\n\n\n    </ion-list>\n\n  </div>\n\n    <div class="btnadd">\n\n      <ion-icon class="ionicon-add" ios="ios-add-outline" md="md-add-outline" (click)="addDocument()"></ion-icon>\n\n    </div>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\skynguyen79\Desktop\git\Project1\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_database_database__["a" /* DatabaseProvider */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_action_sheet_action_sheet_controller__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_10_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_0__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_11__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["j" /* NavParams */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_toast_toast_controller__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_action_sheet_action_sheet_controller__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__manage_manage__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_database_database__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_auth_service_auth_service__ = __webpack_require__(97);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var DetailPage = (function () {
    function DetailPage(navCtrl, navParams, toastCtrl, actionSheetCtrl, afd, _DB, _ALERT, auth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.afd = afd;
        this._DB = _DB;
        this._ALERT = _ALERT;
        this.auth = auth;
        this.item = this.navParams.get('item');
        this._DOC = "";
        this._COLL = "items"; // Defines the name of the database collection
        this._RCOLL = "requests";
        this.model = '';
        this.categoryId = '';
        this.thumbnail = '';
        this.state = '';
        this.description = '';
        this.checkRole();
    }
    // check role login
    DetailPage.prototype.checkRole = function () {
        var access = this.auth.getUserInfo();
        if (access.role == false) {
            this.xFunction();
        }
        else {
            this.yFunction();
        }
    };
    // Disable function edit, delete
    DetailPage.prototype.xFunction = function () {
        __WEBPACK_IMPORTED_MODULE_5_jquery__(document).ready(function () {
            __WEBPACK_IMPORTED_MODULE_5_jquery__('.ionfab').addClass('hide');
        });
    };
    // Disable function send request
    DetailPage.prototype.yFunction = function () {
        __WEBPACK_IMPORTED_MODULE_5_jquery__(document).ready(function () {
            __WEBPACK_IMPORTED_MODULE_5_jquery__('.icon-request').addClass('hide');
        });
    };
    //doing........
    DetailPage.prototype.openModal = function (item) {
        var _this = this;
        this._COLL = "requests";
        var conFirm = this._ALERT.create({
            title: 'Request',
            message: 'Do you want to rent this asset ?',
            buttons: [{
                    text: 'Disagree',
                    handler: function () {
                        //do something
                        console.log('Disagree clicked!');
                    }
                },
                {
                    text: 'Agree',
                    handler: function () {
                        // do something 
                        console.log('Agree clicked!', { item: item });
                        var info = _this.auth.getUserInfo().name;
                        console.log(info);
                        _this._DB.addDocument(_this._COLL, item).then(function (data) {
                            console.log(data);
                        })
                            .catch(function (error) {
                            console.log(error);
                        });
                    }
                }
            ]
        });
        conFirm.present();
    };
    DetailPage.prototype.generateCollectionAndDocument = function () {
        this._DB.createAndPopulateDocument(this._COLL, this._DOC, this._CONTENT)
            .then(function (data) {
            console.dir(data);
        })
            .catch(function (error) {
            console.dir(error);
        });
    };
    // Retrieve all documents from the specified collection
    // getDocuments method of the DatabaseProvider
    DetailPage.prototype.retrieveCollection = function () {
        var _this = this;
        this._DB.getDocuments(this._COLL)
            .then(function (data) {
            console.log(data);
            // IF we don't have any documents then the collection doesn't exist
            // so we create it!
            if (data.length === 0) {
                _this.generateCollectionAndDocument();
            }
            else {
                _this.items = data;
            }
        })
            .catch();
    };
    // Update item
    DetailPage.prototype.updateDocument = function (obj) {
        var params = {
            collection: this._COLL,
            item: obj
        };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__manage_manage__["a" /* ManagePage */], { record: params, isEdited: true });
    };
    //  Delete item
    DetailPage.prototype.deleteDocument = function (obj) {
        var _this = this;
        var alert = this._ALERT.create({
            title: 'DELETE',
            message: 'Do you really want to delete ?',
            buttons: [{
                    text: 'No',
                    handler: function (data) {
                        console.log('NO clicked!');
                    }
                }, {
                    text: 'Yes',
                    handler: function () {
                        _this._DB.deleteDocument(_this._COLL, obj.id)
                            .then(function (data) {
                            _this.displayAlert('Success', 'The record ' + obj.model + ' was successfully removed');
                        })
                            .catch(function (error) {
                            _this.displayAlert('Error', error.message);
                        });
                    }
                }]
        });
        alert.present();
    };
    DetailPage.prototype.displayAlert = function (title, message) {
        var _this = this;
        var alert = this._ALERT.create({
            title: title,
            subTitle: message,
            buttons: [{
                    text: 'Got It!',
                    handler: function () {
                        _this.retrieveCollection();
                    }
                }]
        });
        alert.present();
    };
    DetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-detail',template:/*ion-inline-start:"C:\Users\skynguyen79\Desktop\git\Project1\src\pages\detail\detail.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="primary">\n\n    <ion-title>Detail</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding class="content">\n\n\n\n  <ion-card>\n\n    <img src="{{item.thumbnail}}" alt="">\n\n    <ion-card-content class="ioncard-content">\n\n      <h2 class="card-title">{{item.model}}</h2>\n\n      <p class="discription">{{item.description}}</p>\n\n    </ion-card-content>\n\n\n\n    <ion-list class="ionlist">\n\n        <ion-icon (click)="openModal(item)" class="icon-request" ios="ios-call-outline" md="md-call-outline"></ion-icon>\n\n      <ion-item class="iconitem">\n\n        <ion-icon class="eye" ios="ios-eye-outline" md="md-eye" item-start></ion-icon>\n\n        <h3 item-start class="iconitem-text">State</h3>\n\n        <ion-note item-end class="iconitem-end">{{item.state}}</ion-note>\n\n      </ion-item>\n\n\n\n      <ion-item class="iconitem">\n\n        <ion-icon class="eye" ios="ios-eye-outline" md="md-eye" item-start></ion-icon>\n\n        <h3 item-start class="iconitem-text">Quantity</h3>\n\n        <ion-note item-end class="iconitem-end">{{item.quantity}}</ion-note>\n\n      </ion-item>\n\n\n\n    </ion-list>\n\n  </ion-card>\n\n\n\n  <ion-fab top right edge class="ionfab">\n\n    <button ion-fab color="vibrant" mini>\n\n      <ion-icon name="add"></ion-icon>\n\n    </button>\n\n    <ion-fab-list>\n\n      <button ion-fab (click)="updateDocument(item)">\n\n          <ion-icon ios="ios-create-outline" md="md-create-outline"  class="iconupdate"></ion-icon>\n\n      </button>\n\n      <button ion-fab (click)="deleteDocument(item)">\n\n          <ion-icon class="icondel" ios="ios-trash-outline" md="md-trash-outline" ></ion-icon>\n\n      </button>\n\n    </ion-fab-list>\n\n  </ion-fab>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\skynguyen79\Desktop\git\Project1\src\pages\detail\detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_toast_toast_controller__["a" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_action_sheet_action_sheet_controller__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_7__providers_database_database__["a" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_8__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]])
    ], DetailPage);
    return DetailPage;
}());

//# sourceMappingURL=detail.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_home__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_auth_service_auth_service__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, auth, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.registerCredentials = { emai: '', password: '' };
    }
    LoginPage.prototype.login = function () {
        var _this = this;
        this.showLoading();
        this.auth.login(this.registerCredentials).subscribe(function (allowed) {
            if (allowed) {
                //login success -> Home Page (asset list)
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__home_home__["a" /* HomePage */]);
            }
            else {
                _this.showError('Access Denied!');
            }
        }, function (error) {
            _this.showError(error);
        });
    };
    LoginPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    LoginPage.prototype.showError = function (text) {
        this.loading.dismiss();
        //create messege error
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(alert);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\skynguyen79\Desktop\git\Project1\src\pages\login\login.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="primary">\n\n    <ion-title>Login</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding class="content">\n\n  <form (ngSubmit)="login()" #loginForm="ngForm">\n\n  <ion-grid>\n\n\n\n    <ion-row class="ionrow-title">\n\n      <ion-col col-12>\n\n        <img src="/assets/icon/logo.png" alt="">\n\n          <h3 class="title">uAsset</h3>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n    <ion-row>\n\n      <ion-col>\n\n          <ion-list insert>\n\n            <ion-item class="item-email">\n\n              <ion-input class="txtEmail" type="text" placeholder="Username" name="email" [(ngModel)]="registerCredentials.email" required></ion-input>\n\n            </ion-item>\n\n\n\n            <ion-item class="item-pass">\n\n              <ion-input class="txtPass" type="password" placeholder="Password" name="password" [(ngModel)]="registerCredentials.password" required></ion-input>\n\n            </ion-item>\n\n          </ion-list>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n    <ion-row>\n\n      <ion-col col-12 class="signup-col">\n\n        <button ion-button full class="submit-btn" type="submit" >Login</button>\n\n      </ion-col>\n\n      <ion-col col-12 class="signup-col">\n\n        <button ion-button full class="submit-btn">Login With Google</button>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n  </ion-grid>\n\n</form>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\skynguyen79\Desktop\git\Project1\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* LoadingController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__laptop_laptop__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_database_database__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CategoryPage = (function () {
    function CategoryPage(navCtrl, actionCtrl, _DB) {
        this.navCtrl = navCtrl;
        this.actionCtrl = actionCtrl;
        this._DB = _DB;
        this.laptop = 'LT01';
        this.canon = 'MA01';
        this.sony = 'MC01';
        this._COLL = "items"; // Defines the name of the database collection
        this._DOC = ""; // Defines the initial document ID for the database collection
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
    CategoryPage.prototype.ionViewDidEnter = function () {
        this.retrieveCollection();
    };
    CategoryPage.prototype.generateCollectionAndDocument = function () {
        this._DB.createAndPopulateDocument(this._COLL, this._DOC, this._CONTENT)
            .then(function (data) {
            console.dir(data);
        })
            .catch(function (error) {
            console.dir(error);
        });
    };
    CategoryPage.prototype.retrieveCollection = function () {
        var _this = this;
        this._DB.getDocuments(this._COLL)
            .then(function (data) {
            console.log(data);
            if (data.length === 0) {
                _this.generateCollectionAndDocument();
            }
            else {
                _this.filterItems = data;
                _this.items = data;
            }
        })
            .catch();
    };
    //Go to page Laptop
    CategoryPage.prototype.goProducts = function (cateId) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__laptop_laptop__["a" /* LaptopPage */], { cateId: cateId });
    };
    CategoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-category',template:/*ion-inline-start:"C:\Users\skynguyen79\Desktop\git\Project1\src\pages\category\category.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="primary">\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Top Category</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding class="cate-content">\n\n\n\n  <ion-row class="ionrow">\n\n    <ion-col col-12 class="ioncol-item" (click)="goProducts(laptop)">\n\n      <div class="ioncol-picture">\n\n        <img src="/assets/imgs/mac.png" alt="">\n\n        <div class="ioncol-text">\n\n          <h3 class="ioncol-title">XPS</h3>\n\n          <p class="text">For the ultimate\n\n            <br> experience</p>\n\n        </div>\n\n      </div>\n\n    </ion-col>\n\n  </ion-row>\n\n\n\n  <ion-row class="ionrow">\n\n    <ion-col col-12 class="ioncol-item item2" (click)="goProducts(canon)">\n\n      <div class="ioncol-picture">\n\n        <img src="/assets/imgs/projector.png" alt="">\n\n        <div class="ioncol-text">\n\n          <h3 class="ioncol-title">Sony</h3>\n\n          <p class="text">For the ultimate\n\n            <br> experience</p>\n\n        </div>\n\n      </div>\n\n    </ion-col>\n\n  </ion-row>\n\n\n\n  <ion-row class="ionrow">\n\n    <ion-col col-12 class="ioncol-item item3" (click)="goProducts(sony)">\n\n      <div class="ioncol-picture">\n\n        <img src="/assets/imgs/printer10.png" alt="">\n\n        <div class="ioncol-text">\n\n          <h3 class="ioncol-title">Toshiba</h3>\n\n          <p class="text">For the ultimate\n\n            <br> experience</p>\n\n        </div>\n\n      </div>\n\n    </ion-col>\n\n  </ion-row>\n\n\n\n\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\skynguyen79\Desktop\git\Project1\src\pages\category\category.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1__providers_database_database__["a" /* DatabaseProvider */]])
    ], CategoryPage);
    return CategoryPage;
}());

//# sourceMappingURL=category.js.map

/***/ }),

/***/ 243:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 243;

/***/ }),

/***/ 285:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/manage/manage.module": [
		716,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 285;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LaptopPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_database_database__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__detail_detail__ = __webpack_require__(224);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LaptopPage = (function () {
    function LaptopPage(navCtrl, navParams, _DB) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._DB = _DB;
        this.cateLap = 'LT01';
        this.categoryId = this.navParams.get('cateId');
        // console.log("dsadadasdasdasdas",this.categoryId)
    }
    LaptopPage.prototype.ionViewDidLoad = function () {
        this.retrieveCollection();
    };
    LaptopPage.prototype.retrieveCollection = function () {
        var _this = this;
        var i;
        // let itemList: Array<any>;
        this._COLL = "items";
        this._DB
            .getDocuments(this._COLL)
            .then(function (data) {
            _this.items = data.filter(function (ele) { return ele.categoryId == _this.categoryId; });
        })
            .catch();
    };
    //  Go detail of item
    LaptopPage.prototype.goDetail = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__detail_detail__["a" /* DetailPage */], { item: item });
        console.log(item);
    };
    LaptopPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-laptop',template:/*ion-inline-start:"C:\Users\skynguyen79\Desktop\git\Project1\src\pages\laptop\laptop.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="primary">\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Top Laptop 2018</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding class="content">\n\n  <ion-list class="listitem">\n\n    <ion-item *ngFor="let item of items">\n\n      <ion-row class="row-item" (click)="goDetail(item)">\n\n\n\n        <ion-col col-3 class="ioncol-thumbnail">\n\n          <ion-thumbnail item-start>\n\n            <img src="{{item.thumbnail}}" class="thumb" />\n\n          </ion-thumbnail>\n\n        </ion-col>\n\n\n\n        <ion-col col-9>\n\n          <h2 class="name">{{item.model}}</h2>\n\n          <p class="cate">Category: {{item.categoryId == \'LT01\' ?\'Laptop\':\'\' || item.categoryId == \'MC01\' ?\'Projector\' :\'\' || item.categoryId == \'MA01\' ?\'Camera\' :\'\'}}</p>\n\n          <p class="state">State: {{item.state}}</p>\n\n        </ion-col>\n\n\n\n      </ion-row>\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\skynguyen79\Desktop\git\Project1\src\pages\laptop\laptop.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_database_database__["a" /* DatabaseProvider */]])
    ], LaptopPage);
    return LaptopPage;
}());

//# sourceMappingURL=laptop.js.map

/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return enviroment; });
var enviroment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyDGf_Qbcl51IgwEvcCssigGUpgAN2zNezg",
        authDomain: "ionicpro1-447cd.firebaseapp.com",
        databaseURL: "https://ionicpro1-447cd.firebaseio.com",
        projectId: "ionicpro1-447cd"
    }
};
//# sourceMappingURL=enviroment.js.map

/***/ }),

/***/ 423:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(430);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(620);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_laptop_laptop__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_category_category__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_detail_detail__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_login_login__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_manage_manage__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_database__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_auth_service_auth_service__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_common_http__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angularfire2__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__enviroments_enviroment__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_http__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_database_database__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_angularfire2_firestore__ = __webpack_require__(622);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_angularfire2_storage__ = __webpack_require__(627);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_camera__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_transfer__ = __webpack_require__(361);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};























var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_laptop_laptop__["a" /* LaptopPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_category_category__["a" /* CategoryPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_detail_detail__["a" /* DetailPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_manage_manage__["a" /* ManagePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_17__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_12_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_19_angularfire2_firestore__["a" /* AngularFirestoreModule */],
                __WEBPACK_IMPORTED_MODULE_20_angularfire2_storage__["a" /* AngularFireStorageModule */],
                __WEBPACK_IMPORTED_MODULE_14__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_15_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_16__enviroments_enviroment__["a" /* enviroment */].firebase),
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/manage/manage.module#ManagePageModule', name: 'manage-page', segment: 'manage', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_laptop_laptop__["a" /* LaptopPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_category_category__["a" /* CategoryPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_detail_detail__["a" /* DetailPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_manage_manage__["a" /* ManagePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_13__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_18__providers_database_database__["a" /* DatabaseProvider */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_transfer__["a" /* Transfer */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_camera__["a" /* Camera */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 620:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_auth_service_auth_service__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_category_category__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__enviroments_enviroment__ = __webpack_require__(405);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, auth) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.auth = auth;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */] },
            { title: 'Category', component: __WEBPACK_IMPORTED_MODULE_6__pages_category_category__["a" /* CategoryPage */] },
            { title: 'Logout', component: __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
        __WEBPACK_IMPORTED_MODULE_8_firebase___default.a.initializeApp(__WEBPACK_IMPORTED_MODULE_9__enviroments_enviroment__["a" /* enviroment */].firebase);
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\skynguyen79\Desktop\git\Project1\src\app\app.html"*/'<ion-menu [content]="content">\n\n  <ion-header>\n\n    <ion-toolbar color="primary">\n\n      <ion-title>Menu</ion-title>\n\n    </ion-toolbar>\n\n  </ion-header>\n\n\n\n  <ion-content>\n\n    <ion-list>\n\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n        {{p.title}}\n\n      </button>\n\n    </ion-list>\n\n  </ion-content>\n\n\n\n</ion-menu>\n\n\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\Users\skynguyen79\Desktop\git\Project1\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_0__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2_database__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase_firestore__ = __webpack_require__(557);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase_firestore__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// We MUST import both the firebase AND firestore modules like so


var DatabaseProvider = (function () {
    function DatabaseProvider(http, af) {
        this.http = http;
        this.af = af;
        // Initialise access to the firestore
        this._DB = __WEBPACK_IMPORTED_MODULE_4_firebase__["firestore"]();
    }
    //  createAndPopulateDocument
    //  collectionObj    {String}           The database collection we want to create
    //  docID            {String}           The document ID
    //  dataObj          {Any}              The document key/values to be added
    DatabaseProvider.prototype.createAndPopulateDocument = function (collectionObj, docID, dataObj) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._DB
                .collection(collectionObj)
                .doc(docID)
                .set(dataObj, { merge: true })
                .then(function (data) {
                resolve(data);
                console.log(collectionObj, docID, dataObj);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    //  getDocuments
    //  collectionObj: The database collection we want to retrieve records from
    DatabaseProvider.prototype.getDocuments = function (collectionObj) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._DB.collection(collectionObj)
                .get()
                .then(function (querySnapshot) {
                // Declare an array which we'll use to store retrieved documents
                var obj = [];
                // Iterate through each document, retrieve the values for each field
                // and then assign these to a key in an object that is pushed into the
                // obj array
                querySnapshot
                    .forEach(function (doc) {
                    obj.push({
                        id: doc.id,
                        categoryId: doc.data().categoryId,
                        model: doc.data().model,
                        // category: doc.data().category,
                        quantity: doc.data().quantity,
                        // picture: doc.data().picture,
                        thumbnail: doc.data().thumbnail,
                        state: doc.data().state,
                        description: doc.data().description
                    });
                });
                // Resolve the completed array that contains all of the formatted data
                // from the retrieved documents
                resolve(obj);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    // addDocument
    // collectionObj:The database collection we want to add a new document to
    // docObj : The key/value object we want to add
    // {Promise}
    DatabaseProvider.prototype.addDocument = function (collectionObj, dataObj) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._DB.collection(collectionObj).add(dataObj)
                .then(function (obj) {
                resolve(obj);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    // deleteDocument
    // collectionObj: The database collection we want to delete a document from
    // docObj: The document we wish to delete
    DatabaseProvider.prototype.deleteDocument = function (collectionObj, docID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._DB
                .collection(collectionObj)
                .doc(docID)
                .delete()
                .then(function (obj) {
                resolve(obj);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    // updateDocument
    // collectionObj: The database collection to be used
    // docID: The document ID
    // dataObj: The document key/values to be updated
    DatabaseProvider.prototype.updateDocument = function (collectionObj, docID, dataObj) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._DB
                .collection(collectionObj)
                .doc(docID)
                .update(dataObj)
                .then(function (obj) {
                resolve(obj);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    DatabaseProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_0_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], DatabaseProvider);
    return DatabaseProvider;
}());

//# sourceMappingURL=database.js.map

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export User */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable__ = __webpack_require__(621);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var User = (function () {
    function User(name, email, role) {
        this.name = name;
        this.emai = this.emai;
        this.role = role;
    }
    return User;
}());

var AuthServiceProvider = (function () {
    function AuthServiceProvider() {
    }
    AuthServiceProvider.prototype.login = function (credentials) {
        var _this = this;
        if (credentials.emai === null || credentials.name === null) {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_observable__["Observable"].throw("Please insert credentials");
        }
        else if (credentials.password === "pass" && credentials.email === "user1") {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_observable__["Observable"].create(function (observer) {
                var access = true;
                _this.currentUser = new User("Kenny", "kenny123@gmail.com", false);
                console.log('user1 login');
                observer.next(access);
                observer.complete();
            });
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_observable__["Observable"].create(function (observer) {
                var access = (credentials.password === "pass" && credentials.email === "admin");
                _this.currentUser = new User("John", "jonhjohn123@gmail.com", true);
                console.log('Admin login');
                observer.next(access);
                observer.complete();
            });
        }
    };
    AuthServiceProvider.prototype.getUserInfo = function () {
        return this.currentUser;
    };
    AuthServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], AuthServiceProvider);
    return AuthServiceProvider;
}());

//# sourceMappingURL=auth-service.js.map

/***/ })

},[423]);
//# sourceMappingURL=main.js.map