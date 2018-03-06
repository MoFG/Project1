webpackJsonp([1],{

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_firestore__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase_firestore__);
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
    function DatabaseProvider(http) {
        this.http = http;
        this._DB = __WEBPACK_IMPORTED_MODULE_3_firebase__["firestore"]();
    }
    /**
      * Create the database collection and defines an initial document
      * Note the use of merge : true flag within the returned promise  - this
      * is needed to ensure that the collection is not repeatedly recreated should
      * this method be called again (we DON'T want to overwrite our documents!)
      *
      * @public
      * @method createAndPopulateDocument
      * @param  collectionObj    {String}           The database collection we want to create
      * @param  docID            {String}           The document ID
      * @param  dataObj          {Any}              The document key/values to be added
      * @return {Promise}
      */
    DatabaseProvider.prototype.createAndPopulateDocument = function (collectionObj, docID, dataObj) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._DB
                .collection(collectionObj)
                .doc(docID)
                .set(dataObj, { merge: true })
                .then(function (data) {
                resolve(data);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    /**
      * Return documents from specific database collection
      *
      * @public
      * @method getDocuments
      * @param  collectionObj    {String}           The database collection we want to retrieve records from
      * @return {Promise}
      */
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
                        category: doc.data().category,
                        quantity: doc.data().quantity,
                        picture: doc.data().picture,
                        thumbnail: doc.data().thumbnail,
                        logo: doc.data().logo,
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
    /**
        * Add a new document to a selected database collection
        *
        * @public
        * @method addDocument
        * @param  collectionObj    {String}           The database collection we want to add a new document to
        * @param  docObj           {Any}              The key/value object we want to add
        * @return {Promise}
        */
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
    /**
      * Delete an existing document from a selected database collection
      *
      * @public
      * @method deleteDocument
      * @param  collectionObj    {String}           The database collection we want to delete a document from
      * @param  docObj           {Any}              The document we wish to delete
      * @return {Promise}
      */
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
    /**
      * Update an existing document within a selected database collection
      *
      * @public
      * @method updateDocument
      * @param  collectionObj    {String}           The database collection to be used
      * @param  docID            {String}           The document ID
      * @param  dataObj          {Any}              The document key/values to be updated
      * @return {Promise}
      */
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
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
    ], DatabaseProvider);
    return DatabaseProvider;
    var _a;
}());

//# sourceMappingURL=database.js.map

/***/ }),

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__property_property__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_auth_service_auth_service__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(37);
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
                //login success -> Property Page (asset list)
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__property_property__["a" /* PropertyPage */]);
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
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\skynguyen79\Desktop\git\Project1\src\pages\login\login.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Login</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding class="content">\n\n  <form (ngSubmit)="login()" #loginForm="ngForm">\n\n  <ion-grid>\n\n\n\n    <ion-row class="ionrow-title">\n\n      <ion-col col-12>\n\n          <h3 class="title">uAsset</h3>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n    <ion-row>\n\n      <ion-col>\n\n          <ion-list insert>\n\n            <ion-item class="item-email">\n\n              <ion-input class="txtEmail" type="text" placeholder="Your Email" name="email" [(ngModel)]="registerCredentials.email" required></ion-input>\n\n            </ion-item>\n\n\n\n            <ion-item class="item-pass">\n\n              <ion-input class="txtPass" type="password" placeholder="Your Password" name="password" [(ngModel)]="registerCredentials.password" required></ion-input>\n\n            </ion-item>\n\n          </ion-list>\n\n\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n    <ion-row>\n\n      <ion-col col-12 class="signup-col">\n\n        <button ion-button full class="submit-btn" type="submit" >Login</button>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n  </ion-grid>\n\n</form>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\skynguyen79\Desktop\git\Project1\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* LoadingController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 191:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_database_database__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(32);
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
    function ManagePage(navCtrl, navParams, _FB, _DB, _ALERT) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._FB = _FB;
        this._DB = _DB;
        this._ALERT = _ALERT;
        this.model = '';
        this.categoryId = '';
        this.category = '';
        this.quantity = '';
        this.picture = '';
        this.thumbnail = '';
        this.state = '';
        this.logo = '';
        this.description = '';
        this.docID = '';
        this.isEditable = false;
        this.title = 'Add a new document';
        this._COLL = "items";
        this.form = _FB.group({
            'model': ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            'categoryId': ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            'category': ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            'quantity': ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            'picture': ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            'thumbnail': ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            'state': ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            'logo': ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            'description': ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required]
        });
        if (navParams.get('isEdited')) {
            var record = navParams.get('record');
            this.model = record.item.model;
            this.categoryId = record.item.categoryId;
            this.category = record.item.category;
            this.quantity = record.item.quantity;
            this.picture = record.item.picture;
            this.thumbnail = record.item.thumbnail;
            this.state = record.item.state;
            this.logo = record.item.logo;
            this.description = record.item.description;
            this.docID = record.item.id;
            this.isEditable = true;
            this.title = 'Update this document';
        }
    }
    ManagePage.prototype.saveDocument = function (val) {
        var _this = this;
        var model = this.form.controls["model"].value, categoryId = this.form.controls["categoryId"].value, category = this.form.controls["category"].value, quantity = this.form.controls["quantity"].value, picture = this.form.controls["picture"].value, thumbnail = this.form.controls["thumbnail"].value, state = this.form.controls["state"].value, logo = this.form.controls["logo"].value, description = this.form.controls["description"].value;
        // If we are editing an existing record then handle this scenario
        if (this.isEditable) {
            // Call the DatabaseProvider service and pass/format the data for use
            // with the updateDocument method
            this._DB.updateDocument(this._COLL, this.docID, {
                model: model,
                categoryId: categoryId,
                category: category,
                quantity: quantity,
                picture: picture,
                thumbnail: thumbnail,
                state: state,
                logo: logo,
                description: description
            })
                .then(function (data) {
                _this.clearForm();
                _this.displayAlert('Success', 'The document ' + model + ' was successfully updated');
            })
                .catch(function (error) {
                _this.displayAlert('Updating document failed', error.message);
            });
        }
        else {
            // Call the DatabaseProvider service and pass/format the data for use
            // with the addDocument method
            this._DB.addDocument(this._COLL, {
                model: model,
                categoryId: categoryId,
                category: category,
                quantity: quantity,
                picture: picture,
                thumbnail: thumbnail,
                state: state,
                logo: logo,
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
    /**
    * Clear all form data
    *
    * @public
    * @method clearForm
    * @return {none}
    */
    ManagePage.prototype.clearForm = function () {
        this.model = '';
        this.categoryId = '';
        this.category = '';
        this.quantity = '';
        this.picture = '';
        this.thumbnail = '';
        this.state = '';
        this.logo = '';
        this.description = '';
    };
    ManagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-manage',template:/*ion-inline-start:"C:\Users\skynguyen79\Desktop\git\Project1\src\pages\manage\manage.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form [formGroup]="form" (ngSubmit)="saveDocument(form.value)">\n\n    <ion-item>\n      <ion-label stacked>Model:</ion-label>\n      <ion-input type="text" formControlName="model" [(ngModel)]="model"></ion-input>\n    </ion-item>\n\n\n    <ion-item>\n      <ion-label stacked>CategoryId:</ion-label>\n      <ion-input type="text" formControlName="categoryId" [(ngModel)]="categoryId"></ion-input>\n    </ion-item>\n\n\n    <ion-item>\n      <ion-label stacked>Category:</ion-label>\n      <ion-input type="text" formControlName="categoryId" [(ngModel)]="category"></ion-input>\n    </ion-item>\n\n\n    <ion-item>\n      <ion-label stacked>Quantity:</ion-label>\n      <ion-input type="text" formControlName="quantity" [(ngModel)]="quantity"></ion-input>\n    </ion-item>\n\n\n    <ion-item>\n      <ion-label stacked>Picture:</ion-label>\n      <ion-input type="text" formControlName="picture" [(ngModel)]="picture"></ion-input>\n    </ion-item>\n\n\n    <ion-item>\n      <ion-label stacked>Thumbnail:</ion-label>\n      <ion-input type="text" formControlName="thumbnail" [(ngModel)]="thumbnail"></ion-input>\n    </ion-item>\n\n\n    <ion-item>\n      <ion-label stacked>State:</ion-label>\n      <ion-input type="text" formControlName="state" [(ngModel)]="state"></ion-input>\n    </ion-item>\n\n\n    <ion-item>\n      <ion-label stacked>Logo:</ion-label>\n      <ion-input type="text" formControlName="logo" [(ngModel)]="logo"></ion-input>\n    </ion-item>\n\n\n    <ion-item>\n      <ion-label stacked>Description:</ion-label>\n      <ion-input type="text" formControlName="description" [(ngModel)]="description"></ion-input>\n    </ion-item>\n\n\n    <ion-item>\n      <button ion-button block color="primary" text-center padding-top padding-bottom>\n        <div *ngIf="!isEditable">\n          Add a new document\n        </div>\n\n        <div *ngIf="isEditable">\n          Update this document\n        </div>\n      </button>\n    </ion-item>\n\n  </form>\n</ion-content>'/*ion-inline-end:"C:\Users\skynguyen79\Desktop\git\Project1\src\pages\manage\manage.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1__providers_database_database__["a" /* DatabaseProvider */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["a" /* AlertController */]])
    ], ManagePage);
    return ManagePage;
}());

//# sourceMappingURL=manage.js.map

/***/ }),

/***/ 201:
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
webpackEmptyAsyncContext.id = 201;

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_toast_toast_controller__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_action_sheet_action_sheet_controller__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jquery__);
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
    function DetailPage(navCtrl, navParams, toastCtrl, actionSheetCtrl, afd) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.afd = afd;
        this.items = this.navParams.get('items');
    }
    DetailPage.prototype.goForm = function () {
        __WEBPACK_IMPORTED_MODULE_5_jquery__('.createForm').toggleClass('showForm');
        __WEBPACK_IMPORTED_MODULE_5_jquery__('.wrapper').addClass('showWrapper');
    };
    DetailPage.prototype.outForm = function () {
        __WEBPACK_IMPORTED_MODULE_5_jquery__('.wrapper').removeClass('showWrapper');
        __WEBPACK_IMPORTED_MODULE_5_jquery__('.createForm').removeClass('showForm');
    };
    DetailPage.prototype.goDetail = function (items) {
        console.log(items);
        this.afd.list('/items').subscribe(function (res) {
            console.log(res);
        });
    };
    DetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-detail',template:/*ion-inline-start:"C:\Users\skynguyen79\Desktop\git\Project1\src\pages\detail\detail.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Detail</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding class="content">\n\n\n\n  <!-- <ion-card *ngIf="items.id">\n\n    <img src="{{items.picture}}" alt="">\n\n    <ion-card-content class="ioncard-content">\n\n      <h2 class="card-title">{{items.model}}</h2>\n\n      <p class="discription">{{items.discription}}</p>\n\n    </ion-card-content>\n\n\n\n    <ion-list class="ionlist">\n\n\n\n      <ion-item class="iconitem">\n\n        <ion-icon ios="ios-eye-outline" md="md-eye" item-start></ion-icon>\n\n        <h3 item-start class="iconitem-text">State</h3>\n\n        <ion-note item-end class="iconitem-end">{{items.status}}</ion-note>\n\n      </ion-item>\n\n\n\n      <ion-item class="iconitem">\n\n        <ion-icon ios="ios-eye-outline" md="md-eye" item-start></ion-icon>\n\n        <h3 item-start class="iconitem-text">Quantity</h3>\n\n        <ion-note item-end class="iconitem-end">{{items.quantity}}</ion-note>\n\n      </ion-item>\n\n\n\n      <ion-item class="iconitem-state">\n\n        <button ion-button icon-left clear item-left class="item-button" (click)="goForm()">\n\n          <ion-icon ios="ios-build-outline" md="md-build"></ion-icon>\n\n          Edit\n\n        </button>\n\n        <button ion-button icon-left clear item-right class="item-button">\n\n          <ion-icon ios="ios-trash-outline" md="md-trash"></ion-icon>\n\n          Remove\n\n        </button>\n\n      </ion-item>\n\n\n\n    </ion-list>\n\n  </ion-card> -->\n\n\n\n  <ion-card class="ioncard-img">\n\n    <img src="/assets/imgs/saleoff.jpg" alt="">\n\n  </ion-card>\n\n\n\n  <!-- Form create & edit, display:none -->\n\n  <form class="createForm">\n\n    <ion-col>\n\n      <ion-list insert>\n\n        <h3 class="ion-title">Asset Infomation</h3>\n\n\n\n        <ion-item class="ionitem-form">\n\n          <input type="text" placeholder="Asset id" [(ngModel)]="id" name="id" item-start required>\n\n        </ion-item>\n\n\n\n        <ion-item class="ionitem-form">\n\n          <input type="text" placeholder="Asset name" [(ngModel)]="model" name="model" item-start required>\n\n        </ion-item>\n\n        \n\n        <ion-item class="ionitem-form">\n\n          <input type="text" placeholder="Asset Category" [(ngModel)]="category" name="category" item-start required>\n\n        </ion-item>\n\n\n\n        <ion-item class="ionitem-form">\n\n          <input type="number" placeholder="Asset quantity" [(ngModel)]="quantity" name="quantity" item-start required>\n\n        </ion-item>\n\n\n\n        <ion-item class="ionitem-form">\n\n          <input type="text" placeholder="Asset description" [(ngModel)]="description" item-start name="description">\n\n        </ion-item>\n\n\n\n        <ion-item class="ionitem-form">\n\n          <input type="text" placeholder="Asset thumbnail" [(ngModel)]="thumbnail" item-start name="thumbnail">\n\n        </ion-item>\n\n        <hr>\n\n        <ion-item class="ionitem-form">\n\n          <button ion-button item-start class="btnClear">Clear</button>\n\n          <button ion-button item-end class="btnOk">OK</button>\n\n          <!-- (click)="updateAsset(id, model, category, quantity, description, thumbnail) -->\n\n        </ion-item>\n\n\n\n      </ion-list>\n\n    </ion-col>\n\n\n\n  </form>\n\n\n\n  <!--hide form -->\n\n  <div class="wrapper" (click)="outForm()"></div>\n\n</ion-content>\n\n\n\n\n\n'/*ion-inline-end:"C:\Users\skynguyen79\Desktop\git\Project1\src\pages\detail\detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_toast_toast_controller__["a" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_action_sheet_action_sheet_controller__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], DetailPage);
    return DetailPage;
}());

//# sourceMappingURL=detail.js.map

/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/manage/manage.module": [
		572,
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
webpackAsyncContext.id = 244;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PropertyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__manage_manage__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_database_database__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__detail_detail__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__category_category__ = __webpack_require__(348);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var PropertyPage = (function () {
    function PropertyPage(navCtrl, _DB, _ALERT) {
        this.navCtrl = navCtrl;
        this._DB = _DB;
        this._ALERT = _ALERT;
        this.searchKey = "";
        this.newItem = "";
        this._COLL = "items";
        this._DOC = "Xy76Re34SdFR1";
        this._CONTENT = {
            categoryId: 'CT1',
            model: "HP 250X",
            category: "Laptop",
            quantity: "20",
            picture: "https://images-na.ssl-images-amazon.com/images/I/71yyt-7PlxL._SX355_.jpg",
            thumbnail: "https://images-na.ssl-images-amazon.com/images/I/41bwvPP3qZL._AC_SY200_.jpg",
            state: "Open",
            logo: "https://images-na.ssl-images-amazon.com/images/I/51GJs9CSkML._AC_SY200_.jpg",
            description: "8Gb RAM, SSD512Gb, Intel Core i9 9989HQ"
        };
    }
    PropertyPage.prototype.gomenu = function () {
        __WEBPACK_IMPORTED_MODULE_5_jquery__(".propertymenu").toggleClass("showMenu");
        __WEBPACK_IMPORTED_MODULE_5_jquery__(".list-asset").toggleClass("hide");
    };
    PropertyPage.prototype.goDetail = function (items) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__detail_detail__["a" /* DetailPage */], { items: items });
        console.log(items.id);
    };
    PropertyPage.prototype.goCategory = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__category_category__["a" /* CategoryPage */]);
    };
    PropertyPage.prototype.pushAssets = function () {
        return this.gomenu();
    };
    PropertyPage.prototype.goLogin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
    };
    PropertyPage.prototype.goForm = function () {
        __WEBPACK_IMPORTED_MODULE_5_jquery__('.createForm').toggleClass('showForm');
        __WEBPACK_IMPORTED_MODULE_5_jquery__('.wrapper').addClass('showWrapper');
    };
    PropertyPage.prototype.outForm = function () {
        __WEBPACK_IMPORTED_MODULE_5_jquery__('.wrapper').removeClass('showWrapper');
        __WEBPACK_IMPORTED_MODULE_5_jquery__('.createForm').removeClass('showForm');
    };
    //remove text in form
    // clearForm():void {
    // }
    PropertyPage.prototype.ionViewDidEnter = function () {
        this.retrieveCollection();
    };
    PropertyPage.prototype.generateCollectionAndDocument = function () {
        this._DB.createAndPopulateDocument(this._COLL, this._DOC, this._CONTENT)
            .then(function (data) {
            console.dir(data);
        })
            .catch(function (error) {
            console.dir(error);
        });
    };
    /**
      * Retrieve all documents from the specified collection using the
      * getDocuments method of the DatabaseProvider service
      *
      * @public
      * @method retrieveCollection
      * @return {none}
      */
    PropertyPage.prototype.retrieveCollection = function () {
        var _this = this;
        this._DB.getDocuments(this._COLL)
            .then(function (data) {
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
    PropertyPage.prototype.addDocument = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__manage_manage__["a" /* ManagePage */]);
    };
    PropertyPage.prototype.updateDocument = function (obj) {
        var params = {
            collection: this._COLL,
            item: obj
        };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__manage_manage__["a" /* ManagePage */], { record: params, isEdited: true });
    };
    PropertyPage.prototype.deleteDocument = function (obj) {
        var _this = this;
        this._DB.deleteDocument(this._COLL, obj.id)
            .then(function (data) {
            _this.displayAlert('Success', 'The record ' + obj.model + ' was successfully removed');
        })
            .catch(function (error) {
            _this.displayAlert('Error', error.message);
        });
    };
    PropertyPage.prototype.displayAlert = function (title, message) {
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
    PropertyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: "page-property",template:/*ion-inline-start:"C:\Users\skynguyen79\Desktop\git\Project1\src\pages\property\property.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <button class="button-toggle" ion-button item-start (click)="gomenu()">\n\n      <ion-icon ios="ios-menu-outline" md="md-menu" name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title item-start>Asset List</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-row class="ionrow-topcontent">\n\n\n\n    <ion-searchbar class="search"></ion-searchbar>\n\n  </ion-row>\n\n\n\n  <!-- Asset list get in Firebase -->\n\n  <ion-list class="list-asset" *ngFor="let item of items">\n\n    <ion-item>\n\n      <ion-thumbnail item-start>\n\n        <img src="{{item.thumbnail}}" />\n\n      </ion-thumbnail>\n\n      <h2 class="name">{{item.model}}</h2>\n\n      <p>Category: {{item.category}}</p>\n\n      <p class="state">State: {{item.state}}</p>\n\n      <button ion-button outline small item-end (click)="goDetail(items)" class="btnDetail">Detail</button>\n\n    </ion-item>\n\n    <button ion-button color="secondary" item-end (click)="updateDocument(location)" class="btnupdate">\n\n      Update\n\n    </button>\n\n    <button ion-button color="danger" item-end (click)="deleteDocument(location)" class="btndel">\n\n      Delete\n\n    </button>\n\n  </ion-list>\n\n\n\n  <div class="btnsearch">\n\n    <button ion-button ouline small class="btnAdd" (click)="addDocument()">Add</button>\n\n  </div>\n\n\n\n  <!-- Menu bar -->\n\n  <div class="propertymenu">\n\n    <ion-card class="card-wallpaper">\n\n      <div class="info">\n\n        <img src="/assets/imgs/ava1.jpg" alt="" class="avatar">\n\n        <div class="userinfo">\n\n          <h2 class="username">Donal J.Trump</h2>\n\n          <p class="useremail">trumpd@dxc.com</p>\n\n        </div>\n\n      </div>\n\n    </ion-card>\n\n\n\n    <ion-list>\n\n\n\n      <ion-item class="button-item" item-start (click)="pushAssets()">\n\n        <button ion-button color="light">\n\n          <ion-icon ios="ios-list-outline" md="md-list" class="ioncol-icon"></ion-icon>\n\n          Asset List\n\n        </button>\n\n      </ion-item>\n\n\n\n      <ion-item class="button-item" item-start (click)="goCategory()">\n\n        <button ion-button color="light">\n\n          <ion-icon ios="ios-folder-open-outline" md="md-list" class="ioncol-icon"></ion-icon>\n\n          Category\n\n        </button>\n\n      </ion-item>\n\n\n\n      <ion-item class="button-item" item-start (click)="goSetting()">\n\n        <button ion-button color="light">\n\n          <ion-icon ios="ios-settings-outline" md="md-list" class="ioncol-icon"></ion-icon>\n\n          Settings\n\n        </button>\n\n      </ion-item>\n\n\n\n      <ion-item class="button-item" item-start (click)="goLogin()">\n\n        <button ion-button color="light">\n\n          <ion-icon ios="ios-log-out" md="md-log-out" class="ioncol-icon"></ion-icon>\n\n          Log out\n\n        </button>\n\n      </ion-item>\n\n\n\n    </ion-list>\n\n  </div>\n\n  <!-- end propertymenu -->\n\n\n\n  <!-- Form create & edit, display:none -->\n\n  <form class="createForm">\n\n    <ion-col>\n\n      <ion-list insert class="ionlist-input">\n\n        <h3 class="ion-title">Asset Infomation</h3>\n\n\n\n        <!-- <ion-item class="ionitem-form">\n\n          <input type="text" placeholder="Asset id" [(ngModel)]="id" name="id" required>\n\n        </ion-item> -->\n\n        <ion-item class="ionitem-form">\n\n          <input type="text" placeholder="Asset Category ID" [(ngModel)]="categoryId" name="categoryId" required>\n\n        </ion-item>\n\n\n\n        <ion-item class="ionitem-form">\n\n          <input type="text" placeholder="Asset name" [(ngModel)]="model" name="model" required>\n\n        </ion-item>\n\n\n\n        <ion-item class="ionitem-form">\n\n          <input type="text" placeholder="Asset Category" [(ngModel)]="category" name="category" required>\n\n        </ion-item>\n\n\n\n\n\n        <ion-item class="ionitem-form">\n\n          <input type="number" placeholder="Asset quantity" [(ngModel)]="quantity" name="quantity" equired>\n\n        </ion-item>\n\n\n\n\n\n        <ion-item class="ionitem-form">\n\n          <input type="text" placeholder="Asset Picture" [(ngModel)]="picture" name="picture" equired>\n\n        </ion-item>\n\n\n\n        <ion-item class="ionitem-form">\n\n          <input type="text" placeholder="Asset thumbnail" [(ngModel)]="thumbnail" name="thumbnail">\n\n        </ion-item>\n\n\n\n        <ion-item class="ionitem-form">\n\n          <input type="text" placeholder="Asset state" [(ngModel)]="state" name="state">\n\n        </ion-item>\n\n\n\n        <ion-item class="ionitem-form">\n\n          <input type="text" placeholder="Asset logo" [(ngModel)]="logo" name="logo">\n\n        </ion-item>\n\n\n\n        <ion-item class="ionitem-form">\n\n          <input type="text" placeholder="Asset description" [(ngModel)]="description" name="description">\n\n        </ion-item>\n\n\n\n\n\n        <ion-item class="ionitem-form" item start>\n\n          <button class="btnClear" (click)="clearForm()">Clear</button>\n\n          <button class="btnOk" (click)="addDocument()">OK</button>\n\n        </ion-item>\n\n\n\n      </ion-list>\n\n    </ion-col>\n\n\n\n  </form>\n\n\n\n  <!--hide form -->\n\n  <div class="wrapper" (click)="outForm()"></div>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\skynguyen79\Desktop\git\Project1\src\pages\property\property.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__providers_database_database__["a" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */]])
    ], PropertyPage);
    return PropertyPage;
}());

//# sourceMappingURL=property.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export User */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable__ = __webpack_require__(559);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var User = (function () {
    function User(name, email) {
        this.name = name;
        this.emai = this.emai;
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
        else {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_observable__["Observable"].create(function (observer) {
                var access = (credentials.password === "pass" && credentials.email === "email");
                _this.currentUser = new User("John", "jonhjohn123@gmail.com");
                observer.next(access);
                observer.complete();
            });
        }
    };
    AuthServiceProvider.prototype.getUserInfo = function () {
        return this.currentUser;
    };
    AuthServiceProvider.prototype.logout = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_observable__["Observable"].create(function (observer) {
            _this.currentUser = null;
            observer.next(true);
            observer.complete();
        });
    };
    AuthServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], AuthServiceProvider);
    return AuthServiceProvider;
}());

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(37);
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
    function CategoryPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // this.firebaseProvider.getShoppingItems().subscribe(res => {
        //   this.shoppingItems = res;
        // })
    }
    CategoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-category',template:/*ion-inline-start:"C:\Users\skynguyen79\Desktop\git\Project1\src\pages\category\category.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Category</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding class="cate-content">\n\n  <h2 class="category-title">Top Categories</h2>\n\n\n\n  <!-- <ion-list>\n\n    <ion-item *ngFor="let items of shoppingItems | async">\n\n      <p>{{items.category}}</p>\n\n    </ion-item>\n\n  </ion-list> -->\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\skynguyen79\Desktop\git\Project1\src\pages\category\category.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], CategoryPage);
    return CategoryPage;
}());

//# sourceMappingURL=category.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(372);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_detail_detail__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_property_property__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(568);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_login_login__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_auth_service_auth_service__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_http__ = __webpack_require__(570);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_database__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_category_category__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_setting_setting__ = __webpack_require__(571);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_database_database__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_manage_manage__ = __webpack_require__(191);
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
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_2__pages_property_property__["a" /* PropertyPage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_detail_detail__["a" /* DetailPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_category_category__["a" /* CategoryPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_setting_setting__["a" /* SettingPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_manage_manage__["a" /* ManagePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_11__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_12_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["b" /* HttpClientModule */],
                // AngularFireModule.initializeApp(enviroment),
                __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/manage/manage.module#ManagePageModule', name: 'manage-page', segment: 'manage', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_2__pages_property_property__["a" /* PropertyPage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_detail_detail__["a" /* DetailPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_category_category__["a" /* CategoryPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_setting_setting__["a" /* SettingPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_manage_manage__["a" /* ManagePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_4__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_10__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_15__providers_database_database__["a" /* DatabaseProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 568:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enviroments_enviroment__ = __webpack_require__(569);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
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
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */];
        this.pages = [
            { title: 'Login', component: __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */] }
        ];
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
        });
        __WEBPACK_IMPORTED_MODULE_6_firebase___default.a.initializeApp(__WEBPACK_IMPORTED_MODULE_0__enviroments_enviroment__["a" /* enviroment */].firebase);
    }
    MyApp.prototype.openPage = function (page) {
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\skynguyen79\Desktop\git\Project1\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\skynguyen79\Desktop\git\Project1\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 569:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return enviroment; });
var enviroment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyDGf_Qbcl51IgwEvcCssigGUpgAN2zNezg",
        authDomain: "ionicpro1-447cd.firebaseapp.com",
        projectId: "ionicpro1-447cd"
    }
};
//# sourceMappingURL=enviroment.js.map

/***/ }),

/***/ 571:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SettingPage = (function () {
    function SettingPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    SettingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingPage');
    };
    SettingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-setting',template:/*ion-inline-start:"C:\Users\skynguyen79\Desktop\git\Project1\src\pages\setting\setting.html"*/'<!--\n\n  Generated template for the SettingPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>setting</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\skynguyen79\Desktop\git\Project1\src\pages\setting\setting.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], SettingPage);
    return SettingPage;
}());

//# sourceMappingURL=setting.js.map

/***/ })

},[353]);
//# sourceMappingURL=main.js.map