import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { Storage } from "@ionic/storage";

import { User } from '../../providers';
import { MainPage } from '../';
//import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'pieterjanvdp@gmail.com',
    password: 'giovanni'
  };

  loading: any;

  // Our translated text strings
  loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public userService: UserService,
    public loadingCtrl: LoadingController,
    public storage: Storage
    ) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });

    this.loading = this.loadingCtrl.create({});
  }

  ionViewDidLoad() {
    this.storage.get('userData').then((res) => {
      if (res) {
        console.log('Userdata found (auto login):', res);
        //this.navCtrl.push('TabsPage');
      }
    }, (e) => {
      // Do nothing
    });
  }

  login() {
    this.loading.present();
    var toast: any;
    this.userService.login(this.account.email, this.account.password).then((res: any) => {      
      this.storage.set('userData', res.data);
      this.storage.get('userData').then((res) => {
        console.log('userData from local storage', res);
      });

      this.loading.dismiss();
      this.navCtrl.push('TabsPage');
    }, (e) => {
      this.loading.dismiss();
      if (e.error && e.error.code == 'LOGIN_INVALID_CREDENTIALS') {
        toast = this.toastCtrl.create({
          message: this.loginErrorString,
          duration: 5000,
          position: 'top'
        });
        toast.present();
      }
      console.log(e);
    });
  }
/*
  // Attempt to login in through our User service
  doLogin() {
    this.loading.present();

    this.userService.login(this.account.email, this.account.password).then((resp) => {
      this.loading.dismiss();
      this.navCtrl.push(MainPage);
    }, (err) => {
      // Unable to log in
      this.loading.dismiss();
      var toast: any;

      this.translateService.get('LOGIN_ERR_INVALID_PASSWORD').subscribe((value) => {
        this.loginErrorString = value;
      });

      toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 5000,
        position: 'top'
      });
      toast.present();
    });
  }*/
}
