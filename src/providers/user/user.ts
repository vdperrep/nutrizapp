import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as firestore from 'firebase/firestore';
import { Api } from '../api/api';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any = { email: '' };

  constructor(public api: Api) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    return new Promise((resolve, reject) => {
      const auth = firebase.auth();
      var promise = auth.signInWithEmailAndPassword(accountInfo.email, accountInfo.password);
      //var giovanni = auth.updateCurrentUser()
      //TODO: make sure username, name etc is also saved

      promise.then(user => {
        this._loggedIn(user);
        resolve(user);
      })
      .catch(e => {
        reject(e);
      });      
    });

    /*

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;*/
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  register(accountInfo: any) {
      return new Promise((resolve, reject) => {
        const auth = firebase.auth();
        var promise = auth.createUserWithEmailAndPassword(accountInfo.email, accountInfo.password);
        //var giovanni = auth.updateCurrentUser()
        //TODO: make sure username, name etc is also saved

        promise.then(user => {
          this._loggedIn(user);
          console.log(user);

          var db = firebase.firestore();
          var userRef = db.collection("users").where("email", "==", user.user.email);

          userRef.get().then(function(snapshot) {
            
              snapshot.forEach((u) => 
              {
                console.log("ERROR: USER ALREADY EXISTS", u);
              });    
                
              console.log("Happy path: user does not exist yet in our own DB. Creating user ...");
              db.collection("users").doc(user.user.email).set({
                  email: user.user.email,
                  first_name: accountInfo.firstname,
                  last_name: accountInfo.lastname
              })
              .then(function() {
                  resolve(user);
              })
              .catch(function(error) {
                  console.error("Error creating custom user reference: ", error);
              });

          }).catch(function(error) {
              console.log("Error reading user document:", error);
          });

          //resolve(user);
        })
        .catch(e => {
          reject(e);
        });      
    });
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }
}
