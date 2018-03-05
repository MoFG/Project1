webpackJsonp([0],{

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(141);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FirebaseProvider = (function () {
    function FirebaseProvider(afd) {
        this.afd = afd;
        this.afd.list('/').subscribe(function (res) {
            console.log(res);
        });
        console.log('Hello FirebaseProvider Provider');
    }
    FirebaseProvider.prototype.getShoppingItems = function () {
        return this.afd.list('/items');
    };
    FirebaseProvider.prototype.addItem = function (name) {
        this.afd.list('/items').push(name);
    };
    FirebaseProvider.prototype.removeItem = function (id) {
        this.afd.list('/items').remove(id);
    };
    FirebaseProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _a || Object])
    ], FirebaseProvider);
    return FirebaseProvider;
    var _a;
}());

//# sourceMappingURL=firebase.js.map

/***/ }),

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PropertyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_firebase_firebase__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__detail_detail__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_properties_service__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__(445);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__category_category__ = __webpack_require__(298);
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
    function PropertyPage(navCtrl, propertySvc, firebaseProvider, menu) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.propertySvc = propertySvc;
        this.firebaseProvider = firebaseProvider;
        this.menu = menu;
        this.searchKey = "";
        this.newItem = "";
        this.findAll();
        this.shoppingItems = this.firebaseProvider.getShoppingItems();
        this.assetRef = __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.database().ref('/items');
        this.assetRef.on('value', function (assetList) {
            var assets = [];
            assetList.forEach(function (items) {
                assets.push(items.val());
                return false;
            });
            _this.assetList = assets;
            _this.loadedAssetList = assets;
        });
    }
    PropertyPage.prototype.initializeItems = function () {
        this.assetList = this.loadedAssetList;
    };
    PropertyPage.prototype.getItems = function (searchbar) {
        this.initializeItems();
        //set q to the value of the searchbar
        var q = searchbar.target.value;
        if (!q) {
            return;
        }
        this.assetList = this.assetList.filter(function (v) {
            if (v.model && q) {
                if (v.model.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                    return true;
                }
                return false;
            }
        });
        console.log(q, this.assetList.length);
    };
    PropertyPage.prototype.onInput = function (event) {
        var _this = this;
        this.propertySvc
            .findByName(this.searchKey)
            .then(function (data) {
            _this.properties = data;
        })
            .catch(function (error) { return alert(JSON.stringify(error)); });
    };
    PropertyPage.prototype.onCancel = function (event) {
        this.findAll();
    };
    PropertyPage.prototype.findAll = function () {
        var _this = this;
        this.propertySvc
            .findAll()
            .then(function (data) { return (_this.properties = data); })
            .catch(function (error) { return alert(error); });
    };
    PropertyPage.prototype.gomenu = function () {
        __WEBPACK_IMPORTED_MODULE_5_jquery__(".propertymenu").toggleClass("showMenu");
        __WEBPACK_IMPORTED_MODULE_5_jquery__(".list-asset").toggleClass("hide");
    };
    PropertyPage.prototype.goDetail = function (items) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__detail_detail__["a" /* DetailPage */], { items: items });
        console.log(items.id);
    };
    PropertyPage.prototype.goCategory = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__category_category__["a" /* CategoryPage */]);
    };
    // addItem(){
    //   this.firebaseProvider.addItem(this.newItem);
    // }
    PropertyPage.prototype.removeItem = function (id) {
        this.firebaseProvider.removeItem(id);
    };
    PropertyPage.prototype.pushAssets = function () {
        return this.gomenu();
    };
    PropertyPage.prototype.goLogin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
    };
    PropertyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: "page-property",template:/*ion-inline-start:"C:\Users\DELL.DELL-PC\Desktop\Project1-master\Project1-master\src\pages\property\property.html"*/'<ion-header>\n\n  <ion-navbar>\n    <button class="button-toggle" ion-button item-start (click)="gomenu()">\n      <ion-icon ios="ios-menu-outline" md="md-menu" name="menu"></ion-icon>\n    </button>\n    <ion-title item-start>Asset List</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n  <ion-row class="ionrow-topcontent">\n    <!-- search bar use local data -->\n    <!-- <ion-searchbar class="search" [(ngModel)]="searchKey" (ionInput)="onInput($event)" (ionCancel)="onCancel($event)"></ion-searchbar> -->\n\n    <!-- search bar use firebase data -->\n    <ion-searchbar class="search" (ionInput)="getItems($event)" [(ngModel)]="searchKey"></ion-searchbar>\n  </ion-row>\n\n  <!-- Asset list get in Firebase -->\n  <ion-list class="list-asset">\n    <ion-item *ngFor="let items of shoppingItems | async">\n      <ion-thumbnail item-start>\n        <img src="{{items.thumbnail}}" />\n      </ion-thumbnail>\n      <h2 class="name">{{items.model}}</h2>\n      <p>Category: {{items.category}}</p>\n      <p class="state">State: {{items.status}}</p>\n      <button ion-button outline small item-end color="dark" (click)="goDetail(items)">Detail</button>\n    </ion-item>\n  </ion-list>\n\n  <div class="btnsearch">\n    <button ion-button ouline small class="btnAdd">Add</button>\n  </div>\n\n  <!-- Menu bar -->\n  <div class="propertymenu">\n    <ion-card class="card-wallpaper">\n      <div class="info">\n        <img src="/assets/imgs/ava1.jpg" alt="" class="avatar">\n        <div class="userinfo">\n          <h2 class="name">Donal J.Trump</h2>\n          <p>trumpd@dxc.com</p>\n        </div>\n      </div>\n    </ion-card>\n\n    <ion-list>\n\n      <ion-item class="button-item" item-start (click)="pushAssets()">\n        <button ion-button color="light">\n          <ion-icon ios="ios-list-outline" md="md-list" class="ioncol-icon"></ion-icon>\n          Asset List\n        </button>\n      </ion-item>\n\n      <ion-item class="button-item" item-start (click)="goCategory()">\n        <button ion-button color="light">\n          <ion-icon ios="ios-folder-open-outline" md="md-list" class="ioncol-icon"></ion-icon>\n          Category\n        </button>\n      </ion-item>\n\n      <ion-item class="button-item" item-start (click)="goSetting()">\n        <button ion-button color="light">\n          <ion-icon ios="ios-settings-outline" md="md-list" class="ioncol-icon"></ion-icon>\n          Settings\n        </button>\n      </ion-item>\n\n      <ion-item class="button-item" item-start (click)="goLogin()">\n        <button ion-button color="light">\n          <ion-icon ios="ios-log-out" md="md-log-out" class="ioncol-icon"></ion-icon>\n          Log out\n        </button>\n      </ion-item>\n\n    </ion-list>\n  </div>\n<!-- end propertymenu -->\n\n</ion-content>'/*ion-inline-end:"C:\Users\DELL.DELL-PC\Desktop\Project1-master\Project1-master\src\pages\property\property.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_properties_service__["a" /* PropertyService */],
            __WEBPACK_IMPORTED_MODULE_0__providers_firebase_firebase__["a" /* FirebaseProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* MenuController */]])
    ], PropertyPage);
    return PropertyPage;
}());

//# sourceMappingURL=property.js.map

/***/ }),

/***/ 167:
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
webpackEmptyAsyncContext.id = 167;

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_properties_service__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_toast_toast_controller__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_action_sheet_action_sheet_controller__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_firebase_firebase__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jquery__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_jquery__);
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
    function DetailPage(navCtrl, navParams, propertySvc, toastCtrl, actionSheetCtrl, firebaseProvider, afd) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.propertySvc = propertySvc;
        this.toastCtrl = toastCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.firebaseProvider = firebaseProvider;
        this.afd = afd;
        this.items = this.navParams.get('items');
        // this.property = this.navParams.data;
        this.shoppingItems = this.firebaseProvider.getShoppingItems();
    }
    DetailPage.prototype.goForm = function () {
        __WEBPACK_IMPORTED_MODULE_7_jquery__('.createForm').toggleClass('showForm');
        __WEBPACK_IMPORTED_MODULE_7_jquery__('.wrapper').addClass('showWrapper');
    };
    DetailPage.prototype.outForm = function () {
        __WEBPACK_IMPORTED_MODULE_7_jquery__('.wrapper').removeClass('showWrapper');
        __WEBPACK_IMPORTED_MODULE_7_jquery__('.createForm').removeClass('showForm');
    };
    DetailPage.prototype.goDetail = function (items) {
        console.log(items);
        this.afd.list('/items').subscribe(function (res) {
            console.log(res);
        });
    };
    DetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-detail',template:/*ion-inline-start:"C:\Users\DELL.DELL-PC\Desktop\Project1-master\Project1-master\src\pages\detail\detail.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Detail</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding class="content">\n\n  <ion-card *ngIf="items.id">\n    <img src="{{items.picture}}" alt="">\n    <ion-card-content class="ioncard-content">\n      <h2 class="card-title">{{items.model}}</h2>\n      <p class="discription">{{items.discription}}</p>\n    </ion-card-content>\n\n    <ion-list class="ionlist">\n\n      <ion-item class="iconitem">\n        <ion-icon ios="ios-eye-outline" md="md-eye" item-start></ion-icon>\n        <h3 item-start class="iconitem-text">State</h3>\n        <ion-note item-end class="iconitem-end">{{items.status}}</ion-note>\n      </ion-item>\n\n      <ion-item class="iconitem">\n        <ion-icon ios="ios-eye-outline" md="md-eye" item-start></ion-icon>\n        <h3 item-start class="iconitem-text">Quantity</h3>\n        <ion-note item-end class="iconitem-end">{{items.quantity}}</ion-note>\n      </ion-item>\n\n      <ion-item class="iconitem-state">\n        <button ion-button icon-left clear item-left class="item-button" (click)="goForm()">\n          <ion-icon ios="ios-build-outline" md="md-build"></ion-icon>\n          Edit\n        </button>\n        <button ion-button icon-left clear item-right class="item-button">\n          <ion-icon ios="ios-trash-outline" md="md-trash"></ion-icon>\n          Remove\n        </button>\n      </ion-item>\n\n    </ion-list>\n  </ion-card>\n\n  <ion-card class="ioncard-img">\n    <img src="/assets/imgs/saleoff.jpg" alt="">\n  </ion-card>\n\n  <!-- Form create & edit, display:none -->\n  <form class="createForm">\n    <ion-col>\n      <ion-list insert>\n        <h3 class="ion-title">Asset Infomation</h3>\n\n        <ion-item class="ionitem-form">\n          <input type="text" placeholder="Asset id" [(ngModel)]="id" name="id" item-start required>\n        </ion-item>\n\n        <ion-item class="ionitem-form">\n          <input type="text" placeholder="Asset name" [(ngModel)]="model" name="model" item-start required>\n        </ion-item>\n        \n        <ion-item class="ionitem-form">\n          <input type="text" placeholder="Asset Category" [(ngModel)]="category" name="category" item-start required>\n        </ion-item>\n\n        <ion-item class="ionitem-form">\n          <input type="number" placeholder="Asset quantity" [(ngModel)]="quantity" name="quantity" item-start required>\n        </ion-item>\n\n        <ion-item class="ionitem-form">\n          <input type="text" placeholder="Asset description" [(ngModel)]="description" item-start name="description">\n        </ion-item>\n\n        <ion-item class="ionitem-form">\n          <input type="text" placeholder="Asset thumbnail" [(ngModel)]="thumbnail" item-start name="thumbnail">\n        </ion-item>\n        <hr>\n        <ion-item class="ionitem-form">\n          <button ion-button item-start class="btnClear">Clear</button>\n          <button ion-button item-end class="btnOk">OK</button>\n          <!-- (click)="updateAsset(id, model, category, quantity, description, thumbnail) -->\n        </ion-item>\n\n      </ion-list>\n    </ion-col>\n\n  </form>\n\n  <!--hide form -->\n  <div class="wrapper" (click)="outForm()"></div>\n</ion-content>\n\n\n'/*ion-inline-end:"C:\Users\DELL.DELL-PC\Desktop\Project1-master\Project1-master\src\pages\detail\detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__providers_properties_service__["a" /* PropertyService */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_toast_toast_controller__["a" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_action_sheet_action_sheet_controller__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_5__providers_firebase_firebase__["a" /* FirebaseProvider */],
            __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], DetailPage);
    return DetailPage;
}());

//# sourceMappingURL=detail.js.map

/***/ }),

/***/ 208:
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
webpackEmptyAsyncContext.id = 208;

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export User */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable__ = __webpack_require__(443);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(444);
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

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryPage; });
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


var CategoryPage = (function () {
    function CategoryPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CategoryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CategoryPage');
    };
    CategoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-category',template:/*ion-inline-start:"C:\Users\DELL.DELL-PC\Desktop\Project1-master\Project1-master\src\pages\category\category.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Category</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <h2 class="category-title">Top Categories</h2>\n  <ion-grid>\n\n    <ion-row>\n      <ion-col col-6>\n        <ion-card>\n          <img src="/assets/imgs/laptop.png" alt="">\n          <ion-card-title>\n            Laptop\n          </ion-card-title>\n        </ion-card>\n      </ion-col>\n\n      <ion-col col-6>\n          <ion-card>\n              <img src="/assets/imgs/tv.jpg" alt="">\n              <ion-card-title>\n                Desktop and Screen\n              </ion-card-title>\n            </ion-card>\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row>\n      <ion-col col-6>\n          <ion-card>\n              <img src="/assets/imgs/printer.png" alt="">\n              <ion-card-title>\n                Printer\n              </ion-card-title>\n            </ion-card>\n      </ion-col>\n\n      <ion-col col-6>\n          <ion-card>\n              <img src="/assets/imgs/cab.jpg" alt="">\n              <ion-card-title>\n                Accessories\n              </ion-card-title>\n            </ion-card>\n        </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col col-6>\n          <ion-card>\n              <img src="/assets/imgs/cab.jpg" alt="">\n              <ion-card-title>\n                Accessories\n              </ion-card-title>\n            </ion-card>\n      </ion-col>\n    </ion-row>\n\n  </ion-grid>\n</ion-content>'/*ion-inline-end:"C:\Users\DELL.DELL-PC\Desktop\Project1-master\Project1-master\src\pages\category\category.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], CategoryPage);
    return CategoryPage;
}());

//# sourceMappingURL=category.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__property_property__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(85);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DashboardPage = (function () {
    function DashboardPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    DashboardPage.prototype.findAll = function () {
        this.properties = [];
    };
    DashboardPage.prototype.pushAssets = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__property_property__["a" /* PropertyPage */]);
    };
    DashboardPage.prototype.goLogin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    };
    DashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-dashboard',template:/*ion-inline-start:"C:\Users\DELL.DELL-PC\Desktop\Project1-master\Project1-master\src\pages\dashboard\dashboard.html"*/'<!-- start ion-header -->\n<ion-header>\n  <ion-navbar>\n\n    <ion-title>\n      Your Dashboard\n    </ion-title>\n\n  </ion-navbar>\n</ion-header>\n<!-- end ion-header -->\n<!-- start ion-content -->\n<ion-content class="content">\n\n  <ion-card class="card-wallpaper">\n    <div class="info">\n      <img src="/assets/imgs/ava1.jpg" alt="" class="avatar">\n      <div class="userinfo">\n        <h2 class="name">Donal J.Trump</h2>\n        <p>trumpd@dxc.com</p>\n      </div>\n    </div>\n  </ion-card>\n\n  <!-- start option -->\n  <div class="option">\n    <ion-grid>\n\n      <ion-row class="ionrow-list">\n        <ion-col col-12 class="ioncol-list">\n          <h2 (click)="pushAssets()" class="assets" menuClose="menu1" detail-none>\n            <ion-icon ios="ios-list-outline" md="md-list" class="ioncol-icon"></ion-icon>\n            Assets\n          </h2>\n        </ion-col>\n      </ion-row>\n\n      <ion-row class="ionrow-list">\n        <ion-col col-12 class="ioncol-list">\n          <h2 class="assets">\n            <ion-icon ios="ios-folder-open-outline" md="md-list" class="ioncol-icon"></ion-icon>\n            Category\n          </h2>\n        </ion-col>\n      </ion-row>\n\n      <ion-row class="ionrow-list">\n        <ion-col col-12 class="ioncol-list">\n          <h2 class="assets">\n            <ion-icon ios="ios-settings-outline" md="md-list" class="ioncol-icon"></ion-icon>\n            Settings\n          </h2>\n        </ion-col>\n      </ion-row>\n\n    </ion-grid>\n  </div>\n  <!-- end option -->\n\n  <ion-row class="ionrow-list">\n    <ion-col col-12 class="ioncol-list">\n      <h2 class="assets" (click)="goLogin()">\n        <ion-icon ios="ios-log-out" md="md-log-out" class="ioncol-icon"></ion-icon>\n        Log out\n      </h2>\n    </ion-col>\n  </ion-row>\n\n</ion-content>'/*ion-inline-end:"C:\Users\DELL.DELL-PC\Desktop\Project1-master\Project1-master\src\pages\dashboard\dashboard.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */]])
    ], DashboardPage);
    return DashboardPage;
}());

//# sourceMappingURL=dashboard.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(324);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_detail_detail__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_property_property__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_dashboard_dashboard__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_auth_service_auth_service__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_properties_service__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_firebase_firebase__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_http__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angularfire2_database__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angularfire2__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_category_category__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_setting_setting__ = __webpack_require__(485);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var firebaseConfig = {
    apiKey: "AIzaSyA4bdVxe4tjPgG89P2gt8-Optvjj_pgxLM",
    authDomain: "assetmanagement-20f41.firebaseapp.com",
    databaseURL: "https://assetmanagement-20f41.firebaseio.com",
    projectId: "assetmanagement-20f41",
    storageBucket: "assetmanagement-20f41.appspot.com",
    messagingSenderId: "440302531046"
};
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_dashboard_dashboard__["a" /* DashboardPage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_property_property__["a" /* PropertyPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_detail_detail__["a" /* DetailPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_category_category__["a" /* CategoryPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_setting_setting__["a" /* SettingPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_13__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_14_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_15_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
                __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_dashboard_dashboard__["a" /* DashboardPage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_property_property__["a" /* PropertyPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_detail_detail__["a" /* DetailPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_category_category__["a" /* CategoryPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_setting_setting__["a" /* SettingPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_3__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_10__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_11__providers_properties_service__["a" /* PropertyService */],
                __WEBPACK_IMPORTED_MODULE_12__providers_firebase_firebase__["a" /* FirebaseProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var properties = [
    {
        id: 1,
        model: 'Lenovo Thinkpad X50',
        category: 'Laptop',
        thumbnail: 'assets/imgs/pic1.png',
        quantity: 50,
        status: 'Open',
        picture: 'https://cdn.tgdd.vn/Products/Images/44/143285/asus-a541ua-i3-6006u-dm2135t-dai-dien-450x300.jpg',
        discription: 'Laptop Lenovo Thinkpad X50 14IKB i3 7130U/4GB/500GB/Win10/(80X80106VN)'
    },
    {
        id: 2,
        model: 'Dell Inspiron T4',
        category: 'Laptop',
        thumbnail: 'assets/imgs/pic2.png',
        quantity: 50,
        status: 'Open',
        picture: 'https://cdn.tgdd.vn/Products/Images/44/139279/lenovo-yoga-520-14ikb-i3-7130u-8080106vn-450x300.jpg',
        discription: 'Laptop Dell Inspiron T4 14IKB i3 7130U/4GB/500GB/Win10/(80X80106VN)'
    },
    {
        id: 3,
        model: 'Brother FAX-2840',
        category: 'Fax',
        thumbnail: 'assets/imgs/pic3.jpg',
        quantity: 50,
        status: 'Open',
        picture: 'https://images-na.ssl-images-amazon.com/images/I/81PWwHGBDQL._SX450_.jpg',
        discription: 'Brother FAX-2840 High Speed Mono Laser Fax Machine'
    },
    {
        id: 4,
        model: 'Brother Fax 5750e',
        category: 'Fax',
        thumbnail: 'assets/imgs/pic4.jpg',
        quantity: 50,
        status: 'Open',
        picture: 'https://images-na.ssl-images-amazon.com/images/I/41XHgYkptLL._SX425_.jpg',
        discription: 'Brother 5750e Intellifax Fax Machine'
    },
    {
        id: 5,
        model: 'Malier 118 Cable ',
        category: 'Cable',
        thumbnail: 'assets/imgs/pic5.jpg',
        quantity: 50,
        status: 'Open',
        picture: 'https://images-na.ssl-images-amazon.com/images/I/51sj08%2BGPlL._SX425_.jpg',
        discription: 'Malier 118 Cable Management Sleeves with Free Cable Clips and Cable Ties, Cord Organizer System for TV, Computer, Home Entertainment, Adjustable, Black and White Reversible'
    },
    {
        id: 6,
        model: 'Desktop Screen Retina',
        category: 'Desktop',
        thumbnail: 'assets/imgs/pic6.jpg',
        quantity: 50,
        status: 'Open',
        picture: 'https://images-na.ssl-images-amazon.com/images/I/71Qy9Mp3tgL._SX425_.jpg',
        discription: 'Acrylic Monitor Stand, Clear Acrylic Computer Monitor Screen Riser for Office Home Desktop (1 Pack)'
    },
    {
        id: 7,
        model: 'Brother Fax Machine FAX-575',
        category: 'Fax',
        thumbnail: 'assets/imgs/pic7.jpg',
        quantity: 50,
        status: 'Close',
        picture: 'https://images-na.ssl-images-amazon.com/images/I/51oCPJQoitL._SX425_.jpg',
        discription: 'Brother FAX-575 9600bps Enva Fax en 15segundos.'
    },
    {
        id: 8,
        model: 'Printer HP',
        category: 'Printer',
        thumbnail: 'assets/imgs/pic8.jpg',
        quantity: 50,
        status: 'Open',
        picture: 'https://images-na.ssl-images-amazon.com/images/I/81gt29o23gL._SX425_.jpg',
        discription: 'HP DeskJet 1112 Compact Printer (F5S23A)'
    },
    {
        id: 9,
        model: 'Fax Canon MX492',
        category: 'Fax',
        thumbnail: 'assets/imgs/pic9.jpg',
        quantity: 50,
        status: 'Open',
        picture: 'https://images-na.ssl-images-amazon.com/images/I/6194eVj7mXL._SX425_.jpg',
        discription: 'Canon PIXMA MX492 WiFi All-In-One Compact Size Printer Scanner Copier Fax (0013C002) with High Speed 6-foot USB Printer Cable & Corel Paint Shop Pro X9'
    },
    {
        id: 10,
        model: 'Desktop Screen Sony X9',
        category: 'Desktop',
        thumbnail: 'assets/imgs/pic10.jpg',
        quantity: 50,
        status: 'Close',
        picture: 'https://images-na.ssl-images-amazon.com/images/I/614M5K1upIL._SX425_.jpg',
        discription: 'Easeurlife Computer Monitor Riser Multi Media Desktop Stand (16.2 X 8.3 X 3.2 inch)'
    }
];
/* harmony default export */ __webpack_exports__["a"] = (properties);
//# sourceMappingURL=mock-properties.js.map

/***/ }),

/***/ 482:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_dashboard_dashboard__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(85);
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
        this.initializeApp();
        this.pages = [
            { title: 'Login', component: __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */] },
            { title: 'Dashboard', component: __WEBPACK_IMPORTED_MODULE_0__pages_dashboard_dashboard__["a" /* DashboardPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\DELL.DELL-PC\Desktop\Project1-master\Project1-master\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\DELL.DELL-PC\Desktop\Project1-master\Project1-master\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 485:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingPage; });
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
            selector: 'page-setting',template:/*ion-inline-start:"C:\Users\DELL.DELL-PC\Desktop\Project1-master\Project1-master\src\pages\setting\setting.html"*/'<!--\n  Generated template for the SettingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>setting</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\DELL.DELL-PC\Desktop\Project1-master\Project1-master\src\pages\setting\setting.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], SettingPage);
    return SettingPage;
}());

//# sourceMappingURL=setting.js.map

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__property_property__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_auth_service_auth_service__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(31);
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
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\DELL.DELL-PC\Desktop\Project1-master\Project1-master\src\pages\login\login.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding class="content">\n  <form (ngSubmit)="login()" #loginForm="ngForm">\n  <ion-grid>\n\n    <ion-row class="ionrow-title">\n      <ion-col col-12>\n          <h3 class="title">uAsset</h3>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n          <ion-list insert>\n            <ion-item class="item-email">\n              <ion-input class="txtEmail" type="text" placeholder="Your Email" name="email" [(ngModel)]="registerCredentials.email" required></ion-input>\n            </ion-item>\n\n            <ion-item class="item-pass">\n              <ion-input class="txtPass" type="password" placeholder="Your Password" name="password" [(ngModel)]="registerCredentials.password" required></ion-input>\n            </ion-item>\n          </ion-list>\n\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col col-12 class="signup-col">\n        <button ion-button full color="secondary" class="submit-btn" type="submit" >Login</button>\n      </ion-col>\n    </ion-row>\n\n  </ion-grid>\n</form>\n</ion-content>\n'/*ion-inline-end:"C:\Users\DELL.DELL-PC\Desktop\Project1-master\Project1-master\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* LoadingController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PropertyService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mock_properties__ = __webpack_require__(325);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var PropertyService = (function () {
    function PropertyService() {
    }
    PropertyService.prototype.findAll = function () {
        return Promise.resolve(__WEBPACK_IMPORTED_MODULE_1__mock_properties__["a" /* default */]);
    };
    PropertyService.prototype.findById = function (id) {
        return Promise.resolve(__WEBPACK_IMPORTED_MODULE_1__mock_properties__["a" /* default */][id - 1]);
    };
    PropertyService.prototype.findByName = function (searchKey) {
        var key = searchKey.toUpperCase();
        return Promise.resolve(__WEBPACK_IMPORTED_MODULE_1__mock_properties__["a" /* default */].filter(function (property) {
            return (property.id + property.model + ' ' + property.category).toUpperCase().indexOf(key) > -1;
        }));
    };
    PropertyService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], PropertyService);
    return PropertyService;
}());

//# sourceMappingURL=properties.service.js.map

/***/ })

},[304]);
//# sourceMappingURL=main.js.map