import { Injectable } from '@angular/core';
import { Api } from '../providers/api/api';
import { MealEntry } from '../models/mealentry';

@Injectable()
export class MealService {

  private userFeed_lastPost: any;
  private userFeed_next: any;

  constructor(private api: Api) {}

  private processSnapshot(snapshot: any): MealEntry[] {
    var rtval: MealEntry[] = new Array();
    var i: number = 0;

    snapshot.forEach(function(doc) {
      var a = doc.data();
      console.log(a);
      var temp: MealEntry = new MealEntry(null, null, null, null, null, null, null);
      temp.copyInto(a);
      rtval[i++] = temp;
    });

    this.userFeed_lastPost = snapshot.docs[snapshot.docs.length-1];

    return rtval;
  }
/*
  public getUserFeed_first(email: string) {
    var first = this.api.db.collection("meal_entries")
        .where('email', "==", email)
        .orderBy("datetime", "desc")
        .limit(10);

    return new Promise((resolve, reject) => {
      first.get().then((documentSnapshots) => {
        var rtval = this.processSnapshot(documentSnapshots);
        resolve(rtval);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  public getUserFeed_next(email: string) {
    // Construct a new query starting at this document
    // get the next 25 cities.
    this.userFeed_next = this.api.db.collection("meal_entries")
        .where('email', "==", email)
        .orderBy("datetime", "desc")
        .startAfter(this.userFeed_lastPost)
        .limit(15);
        
    return new Promise((resolve, reject) => {
      this.userFeed_next.get().then((documentSnapshots) => {
        var rtval = this.processSnapshot(documentSnapshots);
        resolve(rtval);
      })
      .catch((error) => {
        reject(error);
      }); 
    });
  }

  public getUserFeed(email: string) {
    return new Promise((resolve, reject) => {
      this.api.db.collection("meal_entries").where('email', "==", email).get()
        .then(function(querySnapshot) {
          var rtval = this.processSnapshot(querySnapshot);
          resolve(rtval);     
        })
        .catch((error) => {
          console.log('error fetching userfeed', error);
          reject(error);
        });
    });
  }*/
}