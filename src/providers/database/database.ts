import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
// We MUST import both the firebase AND firestore modules like so
import * as firebase from 'firebase';
import 'firebase/firestore';

@Injectable()
export class DatabaseProvider {
  // Defines an object for handling interfacing with the Cloud Firestore
  private _DB: any;


  constructor(public http: HttpClient, public af: AngularFireDatabase) {
    // Initialise access to the firestore
    this._DB = firebase.firestore();

  }

  //  createAndPopulateDocument
  //  collectionObj    {String}           The database collection we want to create
  //  docID            {String}           The document ID
  //  dataObj          {Any}              The document key/values to be added

  createAndPopulateDocument(collectionObj: string,
    docID: string,
    dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._DB
        .collection(collectionObj)
        .doc(docID)
        .set(dataObj, { merge: true })
        .then((data: any) => {
          resolve(data);
          console.log(collectionObj, docID, dataObj);

        })
        .catch((error: any) => {
          reject(error);
        });
    });

  }


  //  getDocuments
  //  collectionObj: The database collection we want to retrieve records from
  getDocuments(collectionObj: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._DB.collection(collectionObj)
        .get()
        .then((querySnapshot) => {

          // Declare an array which we'll use to store retrieved documents
          let obj: any = [];
          // Iterate through each document, retrieve the values for each field
          // and then assign these to a key in an object that is pushed into the
          // obj array
          querySnapshot
            .forEach((doc: any) => {
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
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  // addDocument
  // collectionObj:The database collection we want to add a new document to
  // docObj : The key/value object we want to add
  // {Promise}
  addDocument(collectionObj: string,
    dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._DB.collection(collectionObj).add(dataObj)
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  // deleteDocument
  // collectionObj: The database collection we want to delete a document from
  // docObj: The document we wish to delete
  deleteDocument(collectionObj: string,
    docID: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._DB
        .collection(collectionObj)
        .doc(docID)
        .delete()
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }


  // updateDocument
  // collectionObj: The database collection to be used
  // docID: The document ID
  // dataObj: The document key/values to be updated

  updateDocument(collectionObj: string,
    docID: string,
    dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._DB
        .collection(collectionObj)
        .doc(docID)
        .update(dataObj)
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

}
