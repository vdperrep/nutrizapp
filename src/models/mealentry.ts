export class MealEntry {

  email: string;
  profilePic: string;
  datetime: Date;
  foodPics: string[];
  mealDesc: string;
  foods: string[];
  comment: string;

  constructor(email, profilePic, datetime, foodpic, mealDesc, foods, comment) {
    this.email = email;
    this.profilePic = profilePic;
    this.datetime = datetime;
    this.mealDesc = mealDesc;
    this.foods = foods;
    this.comment = comment;
  }

  public copyInto(json: any) {
    console.log('ja dees zoekte nu ok', json);
    this.email = json.email;
    this.profilePic = json.profile_pic;
    this.datetime = json.datetime.toDate();
    console.log(json.datetime);
    console.log(this.datetime);
    this.mealDesc = json.meal_desc;
    this.comment = json.comment;

    // Loop through foods and foodpics and insert them into the array
    this.foods = new Array();
    for (var i = 0; i < json.ingredients.length; i++) {
      this.foods[i] = json.ingredients[i];
    }

    this.foodPics = new Array();
    for (i = 0; i < json.food_pics.length; i++) {
      this.foodPics[i] = json.food_pics[i];
    }
  }
}