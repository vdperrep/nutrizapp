import { Component, Input } from '@angular/core';
import { MealEntry } from '../../models/mealentry';

/**
 * Generated class for the MealEntryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'meal-entry',
  templateUrl: 'meal-entry.html'
})
export class MealEntryComponent {
  @Input() mealEntry: MealEntry;

  constructor() {}

  public getTimeStamp(d: Date) {
    let date1 = new Date(d);
    let date2 = new Date();
    let timeDiff = Math.abs(date2.getTime() - date1.getTime());
    let hDiff = Math.ceil(timeDiff / (1000 * 60)); // Difference in minutes

    if (hDiff > 720*60) return Math.round(hDiff / 60 / 24 / 30) + ' months';
    if (hDiff > 168*60) return Math.round(hDiff / 60 / 24 / 7) + 'w';
    if (hDiff > 24*60)  return Math.round(hDiff / 60 / 24) + 'd';
    if (hDiff >= 60)    return Math.round(hDiff / 60) + 'h';
    else return Math.round(hDiff) + 'm';
  }
}
