import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FoodService } from '../../services/food.service';

@IonicPage()
@Component({
  selector: 'page-create-post',
  templateUrl: 'createpost.html'
})
export class CreatePostPage {
  private post : any;
  private ipt : string;
  private suggestions : any; // Array of {fod_name, fod_id}
  private init : boolean = true;

  constructor(public navCtrl: NavController, public foodService : FoodService) { 
    this.post = { "foods" : []};
    this.suggestions = [];
  }

  add(type : string, fod_id : number = null) {  // CTXT, NEW, EXIST (Context, New food, Existing food)
    if (!this.post.foods) {
      this.post.foods = new Array();
      this.suggestions = [];
    }

    let temp : any = {"fod_name" : null, "fod_id" : null, "edt_join" : null};

    if (type == 'CTXT') {
      temp.edt_join = this.ipt;
    }
    else if (type == 'NEW') {
      temp.fod_name = this.ipt;
    }
    else if (type == 'EXIST') {
      temp.fod_id = fod_id;
    }

    this.post.foods.push(temp);
    this.ipt = '';
  }

  removeFood(idx : number) {
    console.log('remove number ' + idx + ' from the food array.');
  }

  refreshSuggestions() {
    if (this.ipt.length < 1 || this.ipt.length > 15 || (this.init == false && this.suggestions.length == 0)) {
      return;
    }
    console.log('refreshing suggestions ... '); 
    this.foodService.getFoodSuggestions(this.ipt).then((res : any) => {
      this.suggestions = res.data;
      this.init = false;
    })
  }
}
