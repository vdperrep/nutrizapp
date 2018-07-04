import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { FeedPage } from './feed';

@NgModule({
  declarations: [
    FeedPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedPage),
    TranslateModule.forChild()
  ],
  exports: [
    FeedPage
  ]
})
export class FeedPageModule { }