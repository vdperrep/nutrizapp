import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';

import { FeedPage } from './feed';

@NgModule({
  declarations: [
    FeedPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
  exports: [
    FeedPage
  ]
})
export class FeedPageModule { }