import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

// include firebase core
import * as firebase from 'firebase/app'
// include services that you want
import 'firebase/auth'
import 'firebase/database'
// servervalue timestamp is here
import { ServerValue } from '@firebase/database'
// types are in these packages
import { FirebaseApp } from '@firebase/app-types'
import { FirebaseAuth } from '@firebase/auth-types'
import { DataSnapshot, Reference, FirebaseDatabase } from '@firebase/database-types'


/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()

export class Api {
  url: string = "https://mealshare-app.firebaseio.com";
  public _db: any;
  private _mealEntriesRef: any;  

  constructor(public http: HttpClient) {
    //console.log('testje toont ne keer ok');
    console.log('test nummer 2');
    var app: firebase.app.App = firebase.initializeApp({
      apiKey: "AIzaSyD6FCHJrAspvZ6zhEg-uZ1oENVhtWy-hLs",
      authDomain: "mealshare-app.firebaseapp.com",
      databaseURL: "https://mealshare-app.firebaseio.com",
      projectId: "mealshare-app",
      storageBucket: "mealshare-app.appspot.com",
      messagingSenderId: "335620795224"
    });
  
    // Access the real-time database in the initialized application.
    var db: firebase.database.Database = app.database();

    this._db = firebase.database().ref('/'); // Get a firebase reference to the root
    this._mealEntriesRef = firebase.database().ref('/meal_entries'); // Get a firebase reference to the meal entries

    // Attach an asynchronous callback to read the data at our posts reference
    this._mealEntriesRef.on("value", function(snapshot) {
      console.log(snapshot.val());
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }

  public registerUserWithEmailAndPassword(email, pass) {
    return new Promise((resolve, reject) => {
      const auth = firebase.auth();
      var promise = auth.createUserWithEmailAndPassword(email, pass);

      promise.then(user => {
        resolve(user);
      })
      .catch(e => {
        reject(e);
      });
      
    });
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }
}
