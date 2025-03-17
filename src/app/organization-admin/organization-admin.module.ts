import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationAdminRoutingModule } from './organization-admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarforOrganizationComponent } from './navbarfor-organization/navbarfor-organization.component';
import { UserinviteComponent } from './userinvite/userinvite.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { InviteDialogComponent } from './invite-dialog/invite-dialog.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarforOrganizationComponent,
    UserinviteComponent,
    InviteDialogComponent,
  ],
  imports: [
    CommonModule,
    OrganizationAdminRoutingModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatOptionModule, // Add this line
    MatFormFieldModule,
    MatSelectModule,
    NgxPaginationModule
  ],
})
export class OrganizationAdminModule {}
