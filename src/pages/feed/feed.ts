import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Api } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})
export class FeedPage {

  constructor(public navCtrl: NavController, public api: Api) { }

  ionViewDidLoad() {

    // Add a second document with a generated ID.
    this.api._db.collection("users").add({
      first: "Alan",
      middle: "Mathison",
      last: "Turing",
      born: 1912
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }

}
