import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { AdduserComponent } from './adduser/adduser.component';
import { ViewuserComponent } from './viewuser/viewuser.component';

const routes: Routes = [
  {path:'',component:UserComponent},
 {path:'add',component:AdduserComponent},
  {path:'view/:id',component:ViewuserComponent},
  {path:'edit/:id',component:AdduserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
