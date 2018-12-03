import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { MealService } from '../../services/meal.service';
import { MealEntry } from '../../models/mealentry';
import { MealEntryComponent } from '../../components/meal-entry/meal-entry';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})

export class FeedPage {

  private userFeed: MealEntry[] = null;

  constructor(public navCtrl: NavController, public mealService: MealService, public userService: UserService) {}

  private loadFeed() {
    this.mealService.getUserFeed_first(this.userService.loggedInUser.email)
      .then((result: MealEntry[]) => {
        this.userFeed = result;
        console.log(this.userFeed);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  private continueFeed(e) {
    this.mealService.getUserFeed_next(this.userService.loggedInUser.email)
      .then((result: MealEntry[]) => {
        for (var i = 0; i < result.length; i++) {
          this.userFeed.push(result[i]);
        }
        e.complete();
      })
      .catch((err) => {
        e.complete();
        console.log(err);
      });
  }

  ionViewDidLoad() {
    /*this.userFeed = [
      {
        "username": "pieterjanvdp",
        "profilepic":"/pieterjanvdp/profpic.png",
        "datetime":"19/06/2018 11:00:03",
        "foodpic":"/posts/1/foodpic.png",
        "meal_desc":"Spaghetti met Kaas",
        "ingredients":["Spaghetti", "Kaas"]
      }
      ,
      {
        "username": "pieterjanvdp",
        "profilepic":"/pieterjanvdp/profpic.png",
        "datetime":"19/06/2018 11:00:03",
        "foodpic":"/posts/1/foodpic.png",
        "meal_desc":"Spaghetti met Kaas",
        "ingredients":["Spaghetti", "Kaas"]
      }
      ,
      {
        "username": "pieterjanvdp",
        "profilepic":"/pieterjanvdp/profpic.png",
        "datetime":"19/06/2018 11:00:03",
        "foodpic":"/posts/1/foodpic.png",
        "meal_desc":"Spaghetti met Kaas",
        "ingredients":["Spaghetti", "Kaas"]
      }
    ]*/
    console.log('Loading feed...');
    this.loadFeed();
    console.log('Feed loaded');
  }
}