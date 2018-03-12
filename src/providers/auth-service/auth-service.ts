import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/observable';
import 'rxjs/add/operator/map';


export class User{
  name: string;
  emai:string;
  role: boolean;
  constructor(name: string, email:string, role: boolean){
    this.name = name;
    this.emai = this.emai;
    this.role = role;
  }


}
@Injectable()
export class AuthServiceProvider {
  currentUser : User;

  public login(credentials){
    if(credentials.emai === null || credentials.name === null){
      return Observable.throw("Please insert credentials");
    }else if(credentials.password === "pass" && credentials.email ==="user1"){
      return Observable.create(observer =>{
        let access = true;
        this.currentUser = new User("Kenny","kenny123@gmail.com",false);
        console.log('user1 login');
        observer.next(access);
        observer.complete();
      });
    }else{
      return Observable.create(observer =>{
        let access = (credentials.password === "pass" && credentials.email ==="admin");
        this.currentUser = new User("John","jonhjohn123@gmail.com", true);
        console.log('Admin login');
        observer.next(access);
        observer.complete();
      });
    }
  }

  public getUserInfo(){
    return this.currentUser;
  }

  // public logout(){
  //   return Observable.create( observer =>{
  //     this.currentUser = null;
  //     observer.next(true);
  //     observer.complete();
  //   });
  // }

}
