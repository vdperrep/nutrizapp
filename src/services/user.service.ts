import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Api } from '../providers/api/api';

@Injectable()
export class UserService {

  loggedInUser: User;

  constructor(private api: Api) {
    this.logOutUser();
  }

  private logInUser(email: string, firstName: string, lastName: string, registerDate: Date) {
    this.loggedInUser = new User(firstName, lastName, email, registerDate);
  }

  private logOutUser() {
    this.loggedInUser = null;
  }
/*
  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      const auth = firebase.auth();
      var promise = auth.signInWithEmailAndPassword(email, password);
      //TODO: make sure username, name etc is also fetched & saved

      promise.then((user: any) => {
        
        // Fetch other data
        var prom_2 = this.api.db.collection('users').doc(email).get()
          .then((usr: any) => {
            if (usr.exists) {
              console.log("Document data:", usr.data());
              this.logInUser(email, usr.first_name, usr.last_name, usr.register_date);
              resolve(usr);
            } else {
              reject('user not found');
            }
          }).catch((error) => {
              reject(error);
          });
      })
      .catch(e => {
        reject(e);
      });      
    });
  }*/


  signup(accountInfo: any) {
    return new Promise((resolve, reject) => {
      this.api.postData(accountInfo, 'signup').then((res) => {
        resolve(res);
      }, (e) => {
        reject(e);
      })
    })
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      if (!email || !password) {
        reject(Error('No email or password given'));
      }

      let accountInfo = {email: '', password: ''};
      accountInfo.email = email;
      accountInfo.password = password;

      this.api.postData(accountInfo, 'login').then((res) => {
        resolve(res);
      }, (e) => {
        reject(e);
      })
    })
  }




/*
  register(accountInfo: any) {
      return new Promise((resolve, reject) => {
        const auth = firebase.auth();
        var promise = auth.createUserWithEmailAndPassword(accountInfo.email, accountInfo.password);
        //TODO: make sure username, name etc is also saved

        promise.then(user => {
          // this._loggedIn(user);
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
                  last_name: accountInfo.lastname,
                  register_date: new Date()
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
        })
        .catch(e => {
          reject(e);
        });      
    });
  }*/
}
