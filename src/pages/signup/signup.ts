import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { Storage } from "@ionic/storage";

import { User } from '../../providers';
import { UserService } from '../../services/user.service';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  
  account: { firstname: string
            ,email: string
            ,password: string
            ,lastname:string
            ,username:string } = {firstname: '', email: '', password: '', lastname: '', username:''};

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public translateService: TranslateService,
              public http: Http,
              public loadingCtrl: LoadingController,
              public userService: UserService,
              public storage: Storage
    ) {
      this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
        this.signupErrorString = value;
      })
  }

  doSignup() {
  /*  var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
*/
    let data = {
      firstname: this.account.firstname,
      lastname: this.account.lastname,
      username: this.account.username,
      password: this.account.password,
      email: this.account.email
    };

    console.log(data);

    let loader = this.loadingCtrl.create({
      //content: 'Processing please wait…',
    });

    loader.present().then(() => {

      this.userService.signup(data).then((res) => {
        console.log(res);
        loader.dismiss();

        // Save userdata (including the token) locally
        this.storage.set('userData', res);

        // Redirect to homepage
        this.navCtrl.push(TabsPage);
      }, (e) => {
        loader.dismiss();
        if (e.error && e.error.code == 'LOGIN_INVALID_CREDENTIALS') {
          var toast = this.toastCtrl.create({
            message: e.error.message,
            duration: 5000,
            position: 'top'
          });
          toast.present();
        }
        console.log(e);
      });


/*
      this.http.post('http://127.0.0.1/mobile/register.php', data, options)
        .subscribe((res) => {
          console.log(res);
        });*/

      //data.password = sha512(data.password);
    })
  }  
}




/*
    // Attempt to login in through our User service
    this.user.register(this.account).then((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {

      //this.navCtrl.push(MainPage);

      // Unable to sign up
      // Interpret reason and show corresponding message
      
      let toast: any;

      console.log(err);
      if (err.code == 'auth/email-already-in-use') {
        this.translateService.get('SIGNUP_ERR_EMAIL_EXISTS').subscribe((value) => {
          this.signupErrorString = value;
        })

        toast = this.toastCtrl.create({
          message: this.signupErrorString,
          duration: 5000,
          position: 'top'
        });
        toast.present();
      } 
      else 
      {
        toast = this.toastCtrl.create({
          message: this.signupErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
      

      
    });
    
    
    

    this.http.post('http://127.0.0.1/mobile/register.php', data, options)
        .map(res => res.json())
        .subscribe(res => {
          loader.dismiss()
          
          if (res == "Registration successfull") {  // success
            let alert = this.toastCtrl.create({
              message:(res)
            });
            
            alert.present();
            this.navCtrl.push(MainPage);
          } else {
            let alert = this.toastCtrl.create({  // error
              message:(res)
            });
            
            alert.present();
          }
        })      
    
    */
