import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
let apiUrl = 'http://localhost/index.php/';
let userData: any = null;

@Injectable()
export class Api {
  constructor (public http: HttpClient,
               public storage: Storage) {}

  postData(data, type) {
    return new Promise((resolve, reject) => {
      
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };

      this.http.post(apiUrl + type, JSON.stringify(data), httpOptions).subscribe(res => {
        resolve(res);
      }, (e) => {
        reject(e);
      });
    });
  }

  getData(data : string, type : string) {
    return new Promise((resolve, reject) => {
      let httpOptions;
      
      if (!userData) {
        this.storage.get('userData').then((res) => {
          console.log('Userdata found (get):', res);
          userData = res;

          httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Basic ' + userData.token
            })
          };

          console.log('sent with auth header');
          
          this.http.get(apiUrl + type + '/' + data, httpOptions).subscribe(res => {
            resolve(res);
          }, (e) => {
            reject(e);
          });    

        }, (e) => {
          reject(e);
        });
      }
      else
      {
        httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'Basic ' + userData.token
          })
        };

        console.log('sent with auth header');
        
        this.http.get(apiUrl + type + '/' + data, httpOptions).subscribe(res => {
          resolve(res);
        }, (e) => {
          reject(e);
        });    
      }
      /*
      if (userdata) {
        httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'Basic ' + userdata.token
          })
        };

        console.log('sent with auth header');
      } else {
        httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
        };
        console.log('sent withOUT auth header');
      }
       
      this.http.get(apiUrl + type + '/' + data, httpOptions).subscribe(res => {
        resolve(res);
      }, (e) => {
        reject(e);
      });*/
    });
  }
}




  /*
  url: string = "https://mealshare-app.firebaseio.com";
  public db: any;

  constructor(public http: HttpClient) {
    //console.log('testje toont ne keer ok');
    console.log('test nummer 2');
    firebase.initializeApp({
      apiKey: "AIzaSyD6FCHJrAspvZ6zhEg-uZ1oENVhtWy-hLs",
      authDomain: "mealshare-app.firebaseapp.com",
      databaseURL: "https://mealshare-app.firebaseio.com",
      projectId: "mealshare-app",
      storageBucket: "mealshare-app.appspot.com",
      messagingSenderId: "335620795224"
    });
  
    this.db = firebase.firestore(); // Get a firebase firestore reference to the root
    const settings = {/* your settings...  timestampsInSnapshots: true};
    this.db.settings(settings);
    
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
}*/
