import { Injectable } from '@angular/core';
import { Api } from '../providers/api/api';

@Injectable()
export class FoodService {

  private userFeed_lastPost: any;
  private userFeed_next: any;

  constructor(private api: Api) {}

  getUserFeed(user: number) {
    return new Promise((resolve, reject) => {
      this.api.getData(user + '', 'getuserfeed').then((res) => {
        resolve(res);
      }, (e) => {
        reject(e);
      })
    })
  }

  getFoodSuggestions(tosearch : string) {
    let payload : any = {};
    payload.tosearch = tosearch.trim().replace('%', '');

    return new Promise((resolve, reject) => {
      this.api.postData(payload, 'getfoodsuggestions').then((res) => {
        resolve(res);
      }, (e) => {
        reject(e);
      })
    })
  } 
}