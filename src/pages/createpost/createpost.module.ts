import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { CreatePostPage } from './createpost';

@NgModule({
  declarations: [
    CreatePostPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatePostPage),
    TranslateModule.forChild()
  ],
  exports: [
    CreatePostPage
  ]
})
export class CreatePostPageModule { }
