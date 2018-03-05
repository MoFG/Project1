import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {Property} from '../../providers/firebase/pro';
import firebase from 'firebase';

@Injectable()
export class FirebaseProvider {
  

  constructor(public afd: AngularFireDatabase) {
    this.afd.list('/').subscribe(res => {
      console.log(res);
    })
    console.log('Hello FirebaseProvider Provider');

  }
  getShoppingItems() {
    return this.afd.list('/items');
  }
  addItem(name) {
    this.afd.list('/items').push(name);
  }
  removeItem(id) {
    this.afd.list('/items').remove(id);
  }
}
