import { Injectable } from '@angular/core';
import { Api } from '../providers/api/api';

@Injectable()
export class FoodService {

  private userFeed_lastPost: any;
  private userFeed_next: any;

  constructor(private api: Api) {}

  

 
}