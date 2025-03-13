import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RedisComponent } from './redis/redis.component';

const routes: Routes = [
  {
    path:"dashboard",component:DashboardComponent
  },
  {
    path:"redis",component:RedisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GatepassAdminRoutingModule { }
