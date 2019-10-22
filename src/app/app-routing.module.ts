import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserManagementComponent } from '@um/components/user-management.component';
import { RollonComponent } from '@rollon/components/rollon.component';

const routes: Routes = [
  {
    path: 'um', component: UserManagementComponent
  },
  {
    path: 'rollon', component: RollonComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
