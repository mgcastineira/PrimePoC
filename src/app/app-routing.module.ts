import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserManagementComponent } from '@um/components/user-management.component';
import { RollonComponent } from '@rollon/components/rollon.component';
import { RolloffComponent } from '@rolloff/components/rolloff.component';
import { WbsManagementComponent } from '@wbsmanagement/components/wbs-management.component';
import { NewsComponent } from '@news/components/news.component';
import { MyDataComponent } from './mydata/components/mydata.component';
import { UploadComponent } from './file-upload/components/upload.component';
import { MyteamComponent } from './myteam/components/myteam.component';

const routes: Routes = [
  {
    path: 'um', component: UserManagementComponent
  },
  {
    path: 'rollon', component: RollonComponent
  },
  {
    path: 'rolloff', component: RolloffComponent
  },
  {
    path: 'wbsmanagement', component: WbsManagementComponent
  }
  ,
  {
    path: 'news', component: NewsComponent
  },
  {
    path: 'upload', component: UploadComponent
  }
  ,
  {
    path: 'mydata', component: MyDataComponent
  }
  ,
  {
    path: 'myteam', component: MyteamComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
