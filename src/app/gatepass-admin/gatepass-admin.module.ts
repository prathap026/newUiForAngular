import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GatepassAdminRoutingModule } from './gatepass-admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RedisComponent } from './redis/redis.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    DashboardComponent,
    RedisComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    GatepassAdminRoutingModule,
    NgxPaginationModule
  ]
})
export class GatepassAdminModule { }
