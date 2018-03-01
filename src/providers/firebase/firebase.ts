import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class FirebaseProvider {

  constructor(public afd: AngularFireDatabase) {
    this.afd.list('/').subscribe(res => {
      console.log(res);
    })
    console.log('Hello FirebaseProvider Provider');
  }
  getShoppingItems() {
    return this.afd.list('/item');
  }
  
  addItem(name) {
    this.afd.list('/item').push(name);
  }

  removeItem(id) {
    this.afd.list('/item').remove(id);
  }
}
