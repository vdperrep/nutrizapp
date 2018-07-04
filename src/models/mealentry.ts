/**
 * A generic model that our Master-Detail pages list, create, and delete.
 *
 * Change "Item" to the noun your app will use. For example, a "Contact," or a
 * "Customer," or a "Animal," or something like that.
 *
 * The Items service manages creating instances of Item, so go ahead and rename
 * that something that fits your app as well.
 */
export class MealEntry {

  private username: string;
  private profilepic: string;
  private datetime: Date;
  private foodpic: string;
  private meal_desc: string;
  private ingredients: Array<string>;

  constructor(username, profilepic, datetime, foodpic, meal_desc, ingredients) {
    this.username = username;
    this.profilepic = profilepic;
    this.datetime = datetime;
    this.meal_desc = meal_desc;
    this.ingredients = ingredients;
  }
}
/*
export interface Item {
  [prop: string]: any;
}*/
