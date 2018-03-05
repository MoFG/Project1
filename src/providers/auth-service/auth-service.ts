import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/observable';
import 'rxjs/add/operator/map';


export class User{
  name: string;
  emai:string;

  constructor(name: string, email:string){
    this.name = name;
    this.emai = this.emai;
  }


}
@Injectable()
export class AuthServiceProvider {
  currentUser : User;

  public login(credentials){
    if(credentials.emai === null || credentials.name === null){
      return Observable.throw("Please insert credentials");
    }else{
      return Observable.create(observer =>{
        let access = (credentials.password === "pass" && credentials.email ==="email");
        this.currentUser = new User("John","jonhjohn123@gmail.com");
        observer.next(access);
        observer.complete();
      });
    }
  }

  public getUserInfo(){
    return this.currentUser;
  }

  public logout(){
    return Observable.create( observer =>{
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

}
