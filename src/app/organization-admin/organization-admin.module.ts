import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationAdminRoutingModule } from './organization-admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarforOrganizationComponent } from './navbarfor-organization/navbarfor-organization.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NavbarforOrganizationComponent
  ],
  imports: [
    CommonModule,
    OrganizationAdminRoutingModule
  ]
})
export class OrganizationAdminModule { }
