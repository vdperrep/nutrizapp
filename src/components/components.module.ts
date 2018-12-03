import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MealEntryComponent } from './meal-entry/meal-entry';
import { IonicModule } from "ionic-angular";

@NgModule({
	declarations: [MealEntryComponent],  
	imports: [IonicModule],
	exports: [MealEntryComponent],
	schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ComponentsModule {}
