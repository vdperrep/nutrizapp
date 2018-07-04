import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User, Api } from '../../providers';
import { MainPage } from '../';

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
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  doSignup() {
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
  }
}
