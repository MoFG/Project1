webpackJsonp([1],{

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_action_sheet_action_sheet_controller__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__manage_manage__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_database_database__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__detail_detail__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__category_category__ = __webpack_require__(191);
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
    function HomePage(navCtrl, _DB, _ALERT, actionCtrl) {
        this.navCtrl = navCtrl;
        this._DB = _DB;
        this._ALERT = _ALERT;
        this.actionCtrl = actionCtrl;
        this._COLL = "items"; // Defines the name of the database collection
        this._DOC = ""; // Defines the initial document ID for the database collection
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__detail_detail__["a" /* DetailPage */], { item: item });
        console.log(item);
    };
    //  Go category page
    HomePage.prototype.goCategory = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__category_category__["a" /* CategoryPage */]);
    };
    //  Come back form Login
    HomePage.prototype.goLogin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
    };
    // Call retrieveCollection() to show list item
    HomePage.prototype.ionViewDidEnter = function () {
        this.retrieveCollection();
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__manage_manage__["a" /* ManagePage */]);
    };
    // Update item
    HomePage.prototype.updateDocument = function (obj) {
        var params = {
            collection: this._COLL,
            item: obj
        };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__manage_manage__["a" /* ManagePage */], { record: params, isEdited: true });
    };
    //  Delete item
    HomePage.prototype.deleteDocument = function (obj) {
        var _this = this;
        var alert = this._ALERT.create({
            title: "DELETE",
            message: "DO YOU REALLY WANT TO DELETE",
            buttons: [
                {
                    text: "NO",
                    handler: function (data) {
                        console.log("NO clicked!");
                    }
                },
                {
                    text: "YES",
                    handler: function () {
                        _this._DB
                            .deleteDocument(_this._COLL, obj.id)
                            .then(function (data) {
                            _this.displayAlert("Success", "The record " + obj.model + " was successfully removed");
                        })
                            .catch(function (error) {
                            _this.displayAlert("Error", error.message);
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.displayAlert = function (title, message) {
        var _this = this;
        var alert = this._ALERT.create({
            title: title,
            subTitle: message,
            buttons: [
                {
                    text: "Got It!",
                    handler: function () {
                        _this.retrieveCollection();
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: "page-home",template:/*ion-inline-start:"C:\Users\DELL.DELL-PC\Desktop\sidemenu\project01\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Asset List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-row class="ionrow-topcontent">\n    <ion-searchbar class="search" (ionInput)="getItems($event)"></ion-searchbar>\n  </ion-row>\n\n  <!-- Asset list get in Firebase -->\n  <ion-list class="list-asset">\n\n    <ion-item *ngFor="let item of filterItems">\n      <ion-row class="row-item" (click)="goDetail(item)">\n\n        <ion-col col-3 class="ioncol-thumbnail">\n          <ion-thumbnail item-start class="ionthumbnail">\n            <img src="{{item.thumbnail}}" class="thumb" />\n          </ion-thumbnail>\n        </ion-col>\n\n        <ion-col col-9>\n          <h2 class="name">{{item.model}}</h2>\n          <p class="cate">Category: {{item.category}}</p>\n          <p class="state">State: {{item.state}}</p>\n        </ion-col>\n\n        <!-- <ion-col col-4>\n          <ion-row>\n            <ion-icon (click)="goDetail(item)" ios="ios-arrow-dropright-outline" md="md-arrow-dropright-outline" class="btnDetail"></ion-icon>\n          </ion-row>\n          <ion-row>\n            <ion-icon ios="ios-create-outline" md="md-create-outline" (click)="updateDocument(item)" class="iconupdate"></ion-icon>\n          </ion-row>\n          <ion-row>\n            <ion-icon class="icondel" ios="ios-trash-outline" md="md-trash-outline" (click)="deleteDocument(item)"></ion-icon>\n          </ion-row>\n        </ion-col> -->\n\n      </ion-row>\n    </ion-item>\n\n  </ion-list>\n\n  <div class="btnadd">\n    <ion-icon class="ionicon-add" ios="ios-add-outline" md="md-add-outline" (click)="addDocument()"></ion-icon>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\DELL.DELL-PC\Desktop\sidemenu\project01\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_database_database__["a" /* DatabaseProvider */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_action_sheet_action_sheet_controller__["a" /* ActionSheetController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 190:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_auth_service_auth_service__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(188);
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
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
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
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\DELL.DELL-PC\Desktop\sidemenu\project01\src\pages\login\login.html"*/'<!-- <ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n\n</ion-header> -->\n\n\n<ion-content padding class="content">\n  <form (ngSubmit)="login()" #loginForm="ngForm">\n  <ion-grid>\n\n    <ion-row class="ionrow-title">\n      <ion-col col-12>\n          <h3 class="title">uAsset</h3>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n          <ion-list insert>\n            <ion-item class="item-email">\n              <ion-input class="txtEmail" type="text" placeholder="Username" name="email" [(ngModel)]="registerCredentials.email" required></ion-input>\n            </ion-item>\n\n            <ion-item class="item-pass">\n              <ion-input class="txtPass" type="password" placeholder="Password" name="password" [(ngModel)]="registerCredentials.password" required></ion-input>\n            </ion-item>\n          </ion-list>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col col-12 class="signup-col">\n        <button ion-button full class="submit-btn" type="submit" >Login</button>\n      </ion-col>\n    </ion-row>\n\n  </ion-grid>\n</form>\n</ion-content>\n'/*ion-inline-end:"C:\Users\DELL.DELL-PC\Desktop\sidemenu\project01\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 191:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__printer_printer__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__projector_projector__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__laptop_laptop__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_database_database__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(31);
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
    CategoryPage.prototype.goCateLaptop = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__laptop_laptop__["a" /* LaptopPage */]);
    };
    //Go to page Projector
    CategoryPage.prototype.goCateProjector = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__projector_projector__["a" /* ProjectorPage */]);
    };
    //Go to page Print
    CategoryPage.prototype.goCateprint = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__printer_printer__["a" /* PrinterPage */]);
    };
    CategoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-category',template:/*ion-inline-start:"C:\Users\DELL.DELL-PC\Desktop\sidemenu\project01\src\pages\category\category.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Top Category</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding class="cate-content">\n\n  <ion-row class="ionrow">\n    <ion-col col-12 class="ioncol-item" (click)="goCateLaptop()">\n      <div class="ioncol-picture">\n        <img src="/assets/imgs/mac.png" alt="">\n        <div class="ioncol-text">\n          <h3 class="ioncol-title">XPS</h3>\n          <div class="line"></div>\n          <p class="text">For the ultimate\n            <br> experience</p>\n        </div>\n      </div>\n    </ion-col>\n  </ion-row>\n\n  <!-- Binding data -->\n  <!-- <ion-list *ngFor="let item of filterItems" class="filter-list">\n    <ion-item>\n      <ion-row>\n\n        <ion-col col-4 class="ioncol-thumbnail">\n          <ion-thumbnail item-start>\n            <img src="{{item.thumbnail}}" class="thumb" />\n          </ion-thumbnail>\n        </ion-col>\n\n        <ion-col col-8>\n            <h2 class="name">{{item.model}}</h2>\n          <p class="cate">Category: {{item.category}}</p>\n          <p class="description">Infomation: {{item.description}}</p>\n        </ion-col>\n\n      </ion-row>\n    </ion-item>\n  </ion-list> -->\n  <!-- end -->\n\n  <ion-row class="ionrow">\n    <ion-col col-12 class="ioncol-item item2" (click)="goCateProjector()">\n      <div class="ioncol-picture">\n        <img src="/assets/imgs/projector.png" alt="">\n        <div class="ioncol-text">\n          <h3 class="ioncol-title">Sony</h3>\n          <div class="line"></div>\n          <p class="text">For the ultimate\n            <br> experience</p>\n        </div>\n      </div>\n    </ion-col>\n  </ion-row>\n\n  <ion-row class="ionrow">\n    <ion-col col-12 class="ioncol-item item3" (click)="goCateprint()">\n      <div class="ioncol-picture">\n        <img src="/assets/imgs/printer10.png" alt="">\n        <div class="ioncol-text">\n          <h3 class="ioncol-title">Toshiba</h3>\n          <div class="line"></div>\n          <p class="text">For the ultimate\n            <br> experience</p>\n        </div>\n      </div>\n    </ion-col>\n  </ion-row>\n\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\DELL.DELL-PC\Desktop\sidemenu\project01\src\pages\category\category.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_3__providers_database_database__["a" /* DatabaseProvider */]])
    ], CategoryPage);
    return CategoryPage;
}());

//# sourceMappingURL=category.js.map

/***/ }),

/***/ 192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_database_database__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(34);
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
        this.description = '';
        this.docID = '';
        this.isEditable = false;
        this.title = 'Add a new asset';
        this._COLL = "items";
        this.form = _FB.group({
            'model': ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('[a-zA-Z0-9 ]*'), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])],
            'categoryId': ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            'category': ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            'quantity': ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('^[0-9]*'), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(4), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])],
            'picture': ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            'thumbnail': ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            'state': ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
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
            this.description = record.item.description;
            this.docID = record.item.id;
            this.isEditable = true;
            this.title = 'Update this document';
        }
    }
    ManagePage.prototype.saveDocument = function (val) {
        var _this = this;
        var model = this.form.controls["model"].value, categoryId = this.form.controls["categoryId"].value, category = this.form.controls["category"].value, quantity = this.form.controls["quantity"].value, picture = this.form.controls["picture"].value, thumbnail = this.form.controls["thumbnail"].value, state = this.form.controls["state"].value, description = this.form.controls["description"].value;
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
                description: description
            })
                .then(function (data) {
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
        this.picture = '';
        this.thumbnail = '';
        this.state = '';
        this.description = '';
    };
    ManagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-manage',template:/*ion-inline-start:"C:\Users\DELL.DELL-PC\Desktop\sidemenu\project01\src\pages\manage\manage.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form [formGroup]="form" (ngSubmit)="saveDocument(form.value)">\n\n    <ion-item>\n      <ion-label floating>Asset Name</ion-label>\n      <ion-input type="text" formControlName="model" [(ngModel)]="model"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Category ID</ion-label>\n      <ion-select formControlName="categoryId" [(ngModel)]="categoryId">\n        <ion-option value="LT01">LT01</ion-option>\n        <ion-option value="MA01">MA01</ion-option>\n        <ion-option value="MC01">MC01</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Category</ion-label>\n      <ion-select formControlName="category" [(ngModel)]="category">\n        <ion-option value="Laptop">Laptop</ion-option>\n        <ion-option value="Camera">Camera</ion-option>\n        <ion-option value="Projector">Projector</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Asset Quantity</ion-label>\n      <ion-input type="text" formControlName="quantity" [(ngModel)]="quantity"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Asset Picture</ion-label>\n      <ion-input type="text" formControlName="picture" [(ngModel)]="picture"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Asset Thumbnail</ion-label>\n      <ion-input type="text" formControlName="thumbnail" [(ngModel)]="thumbnail"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>State</ion-label>\n      <ion-select formControlName="state" [(ngModel)]="state">\n        <ion-option value="open">Open</ion-option>\n        <ion-option value="close">Close</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Description</ion-label>\n      <ion-input type="text" formControlName="description" [(ngModel)]="description"></ion-input>\n    </ion-item>\n\n    <ion-item class="submit-button">\n      <button ion-button color="primary" small text-center padding-top padding-bottom [disabled]="!form.valid">\n        <div *ngIf="!isEditable">\n          Add a new document\n        </div>\n\n        <div *ngIf="isEditable">\n          Update this document\n        </div>\n      </button>\n    </ion-item>\n\n  </form>\n</ion-content>\n'/*ion-inline-end:"C:\Users\DELL.DELL-PC\Desktop\sidemenu\project01\src\pages\manage\manage.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1__providers_database_database__["a" /* DatabaseProvider */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["b" /* AlertController */]])
    ], ManagePage);
    return ManagePage;
}());

//# sourceMappingURL=manage.js.map

/***/ }),

/***/ 206:
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
webpackEmptyAsyncContext.id = 206;

/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/manage/manage.module": [
		595,
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
webpackAsyncContext.id = 246;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_toast_toast_controller__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_action_sheet_action_sheet_controller__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__manage_manage__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_database_database__ = __webpack_require__(94);
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
    function DetailPage(navCtrl, navParams, toastCtrl, actionSheetCtrl, afd, _DB, _ALERT) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.afd = afd;
        this._DB = _DB;
        this._ALERT = _ALERT;
        this.item = this.navParams.get('item');
        this._DOC = "";
        this._COLL = "items"; // Defines the name of the database collection
    }
    DetailPage.prototype.goDetail = function (item) {
        console.log(item);
        this.afd.list('/items').valueChanges().subscribe(function (res) {
            console.log(res);
        });
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__manage_manage__["a" /* ManagePage */], { record: params, isEdited: true });
    };
    //  Delete item
    DetailPage.prototype.deleteDocument = function (obj) {
        var _this = this;
        var alert = this._ALERT.create({
            title: 'DELETE',
            message: 'DO YOU REALLY WANT TO DELETE',
            buttons: [{
                    text: 'NO',
                    handler: function (data) {
                        console.log('NO clicked!');
                    }
                }, {
                    text: 'YES',
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
            selector: 'page-detail',template:/*ion-inline-start:"C:\Users\DELL.DELL-PC\Desktop\sidemenu\project01\src\pages\detail\detail.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Detail</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding class="content">\n\n  <ion-card>\n    <img src="{{item.picture}}" alt="">\n    <ion-card-content class="ioncard-content">\n      <h2 class="card-title">{{item.model}}</h2>\n      <p class="discription">{{item.description}}</p>\n    </ion-card-content>\n\n    <ion-list class="ionlist">\n\n      <ion-item class="iconitem">\n        <ion-icon class="eye" ios="ios-eye-outline" md="md-eye" item-start></ion-icon>\n        <h3 item-start class="iconitem-text">State</h3>\n        <ion-note item-end class="iconitem-end">{{item.state}}</ion-note>\n      </ion-item>\n\n      <ion-item class="iconitem">\n        <ion-icon class="eye" ios="ios-eye-outline" md="md-eye" item-start></ion-icon>\n        <h3 item-start class="iconitem-text">Quantity</h3>\n        <ion-note item-end class="iconitem-end">{{item.quantity}}</ion-note>\n      </ion-item>\n\n    </ion-list>\n  </ion-card>\n\n\n  <ion-fab top right edge>\n    <button ion-fab color="vibrant" mini>\n      <ion-icon name="add"></ion-icon>\n    </button>\n    <ion-fab-list>\n      <button ion-fab (click)="updateDocument(item)">\n          <ion-icon ios="ios-create-outline" md="md-create-outline"  class="iconupdate"></ion-icon>\n      </button>\n      <button ion-fab (click)="deleteDocument(item)">\n          <ion-icon class="icondel" ios="ios-trash-outline" md="md-trash-outline" ></ion-icon>\n      </button>\n    </ion-fab-list>\n  </ion-fab>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\DELL.DELL-PC\Desktop\sidemenu\project01\src\pages\detail\detail.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_toast_toast_controller__["a" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_toast_toast_controller__["a" /* ToastController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_action_sheet_action_sheet_controller__["a" /* ActionSheetController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_action_sheet_action_sheet_controller__["a" /* ActionSheetController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__providers_database_database__["a" /* DatabaseProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__providers_database_database__["a" /* DatabaseProvider */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]) === "function" && _g || Object])
    ], DetailPage);
    return DetailPage;
    var _a, _b, _c, _d, _e, _f, _g;
}());

//# sourceMappingURL=detail.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export User */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable__ = __webpack_require__(593);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(75);
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
    AuthServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], AuthServiceProvider);
    return AuthServiceProvider;
}());

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrinterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PrinterPage = (function () {
    function PrinterPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    PrinterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PrinterPage');
    };
    PrinterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-printer',template:/*ion-inline-start:"C:\Users\DELL.DELL-PC\Desktop\sidemenu\project01\src\pages\printer\printer.html"*/'\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>printer</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\DELL.DELL-PC\Desktop\sidemenu\project01\src\pages\printer\printer.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], PrinterPage);
    return PrinterPage;
}());

//# sourceMappingURL=printer.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProjectorPage = (function () {
    function ProjectorPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ProjectorPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProjectorPage');
    };
    ProjectorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-projector',template:/*ion-inline-start:"C:\Users\DELL.DELL-PC\Desktop\sidemenu\project01\src\pages\projector\projector.html"*/'\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>projector</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\DELL.DELL-PC\Desktop\sidemenu\project01\src\pages\projector\projector.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], ProjectorPage);
    return ProjectorPage;
}());

//# sourceMappingURL=projector.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LaptopPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
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
    function LaptopPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    LaptopPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LaptopPage');
    };
    LaptopPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-laptop',template:/*ion-inline-start:"C:\Users\DELL.DELL-PC\Desktop\sidemenu\project01\src\pages\laptop\laptop.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Top Laptop 2018</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n    <ion-item *ngFor="let item of items">\n      <ion-row class="row-item">\n\n        <ion-col col-6 class="ioncol-thumbnail">\n          <ion-thumbnail item-start>\n            <img src="{{item.thumbnail}}" class="thumb" />\n          </ion-thumbnail>\n        </ion-col>\n\n        <ion-col col-6>\n          <h2 class="name">{{item.model}}</h2>\n          <p class="cate">Category: {{item.category}}</p>\n          <p class="state">State: {{item.state}}</p>\n        </ion-col>\n\n      </ion-row>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\DELL.DELL-PC\Desktop\sidemenu\project01\src\pages\laptop\laptop.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], LaptopPage);
    return LaptopPage;
}());

//# sourceMappingURL=laptop.js.map

/***/ }),

/***/ 364:
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

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(383);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(549);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_laptop_laptop__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_category_category__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_detail_detail__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_login_login__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_manage_manage__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_printer_printer__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_projector_projector__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angularfire2_database__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_auth_service_auth_service__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_common_http__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angularfire2__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__enviroments_enviroment__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__angular_http__ = __webpack_require__(594);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_database_database__ = __webpack_require__(94);
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
                __WEBPACK_IMPORTED_MODULE_11__pages_manage_manage__["a" /* ManagePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_printer_printer__["a" /* PrinterPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_projector_projector__["a" /* ProjectorPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_19__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_14_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_16__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_17_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_18__enviroments_enviroment__["a" /* enviroment */].firebase),
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
                __WEBPACK_IMPORTED_MODULE_11__pages_manage_manage__["a" /* ManagePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_printer_printer__["a" /* PrinterPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_projector_projector__["a" /* ProjectorPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_15__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_20__providers_database_database__["a" /* DatabaseProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 549:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_category_category__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__enviroments_enviroment__ = __webpack_require__(364);
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
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Category', component: __WEBPACK_IMPORTED_MODULE_5__pages_category_category__["a" /* CategoryPage */] },
            { title: 'Logout', component: __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */] }
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
        __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.initializeApp(__WEBPACK_IMPORTED_MODULE_8__enviroments_enviroment__["a" /* enviroment */].firebase);
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\DELL.DELL-PC\Desktop\sidemenu\project01\src\app\app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\Users\DELL.DELL-PC\Desktop\sidemenu\project01\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_firestore__ = __webpack_require__(493);
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
        // Initialise access to the firestore
        this._DB = __WEBPACK_IMPORTED_MODULE_3_firebase__["firestore"]();
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
                        category: doc.data().category,
                        quantity: doc.data().quantity,
                        picture: doc.data().picture,
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
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], DatabaseProvider);
    return DatabaseProvider;
}());

//# sourceMappingURL=database.js.map

/***/ })

},[365]);
//# sourceMappingURL=main.js.map