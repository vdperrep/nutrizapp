import { Injectable } from '@angular/core';

import { MealEntry } from '../../models/mealentry';
import { Api } from '../api/api';

@Injectable()
export class MealEntries {

  constructor(public api: Api) { }


}
