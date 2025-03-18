import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GatepassAdminRoutingModule } from './gatepass-admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RedisComponent } from './redis/redis.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DeletedCompanyComponent } from './deleted-company/deleted-company.component';

// Angular Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    DashboardComponent,
    RedisComponent,
    NavbarComponent,
    DeletedCompanyComponent
  ],
  imports: [
    CommonModule,
    GatepassAdminRoutingModule,
    NgxPaginationModule,
    MatTableModule, // Add Angular Material Table Module
    MatPaginatorModule, // Add Angular Material Paginator Module
    MatSortModule,MatIconModule
  ]
})
export class GatepassAdminModule { }
