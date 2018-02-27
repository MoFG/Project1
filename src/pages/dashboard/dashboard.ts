import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  properties: Array<any>;

  findAll() {
    this.properties = [
      {
        id: 1,
        model: 'Devide 1',
        category: 'Laptop',
        thumbnail: 'assets/imgs/pic1.png',
        quantity: 50,
        status: 1
      },
      {
        id: 2,
        model: 'Devide 1',
        category: 'Laptop',
        thumbnail: 'assets/imgs/pic1.png',
        quantity: 50,
        status: 2
      },
      {
        id: 3,
        model: 'Devide 1',
        category: 'Laptop',
        thumbnail: 'assets/imgs/pic1.png',
        quantity: 50,
        status: 1
      },
      {
        id: 4,
        model: 'Devide 1',
        category: 'Laptop',
        thumbnail: 'assets/imgs/pic1.png',
        quantity: 50,
        status: 2
      },
      {
        id: 5,
        model: 'Devide 1',
        category: 'Laptop',
        thumbnail: 'assets/imgs/pic1.png',
        quantity: 50,
        status: 1
      },
      {
        id: 6,
        model: 'Devide 1',
        category: 'Laptop',
        thumbnail: 'assets/imgs/pic1.png',
        quantity: 50,
        status: 1
      },
      {
        id: 7,
        model: 'Devide 1',
        category: 'Laptop',
        thumbnail: 'assets/imgs/pic1.png',
        quantity: 50,
        status: 3
      },
      {
        id: 8,
        model: 'Devide 1',
        category: 'Laptop',
        thumbnail: 'assets/imgs/pic1.png',
        quantity: 50,
        status: 1
      },
      {
        id: 9,
        model: 'Devide 1',
        category: 'Laptop',
        thumbnail: 'assets/imgs/pic1.png',
        quantity: 50,
        status: 1
      },
      {
        id: 10,
        model: 'Devide 1',
        category: 'Laptop',
        thumbnail: 'assets/imgs/pic1.png',
        quantity: 50,
        status: 2
      }
    ]
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
