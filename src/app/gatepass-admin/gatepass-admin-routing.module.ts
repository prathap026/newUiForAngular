import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RedisComponent } from './redis/redis.component';
import { DeletedCompanyComponent } from './deleted-company/deleted-company.component';

const routes: Routes = [
  {
    path:"dashboard",component:DashboardComponent
  },
  {
    path:"redis",component:RedisComponent
  },
  {
    path:"deleted-company",component:DeletedCompanyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GatepassAdminRoutingModule { }
