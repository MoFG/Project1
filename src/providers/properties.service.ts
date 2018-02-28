import { Injectable } from '@angular/core';
import properties from './mock-properties';
import { Http, RequestOptions } from '@angular/http';



@Injectable()
export class PropertyService{

    findAll(){
        return Promise.resolve(properties);
    }

    findById(id){
        return Promise.resolve(properties[id - 1]);
    }

    findByName(searchKey: string){
        let key: string = searchKey.toUpperCase();
        return Promise.resolve(properties.filter((property:any)=>
        (property.id + property.model + ' ' + property.category).toUpperCase().indexOf(key) > -1));
    }
}