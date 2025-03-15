import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth-guard.guard';
import { MainComponent } from './main/main.component';
import { SignupComponent } from './signup/signup.component';
import { CompanyRegistrationComponent } from './company-registration/company-registration.component';
import { UserregistrationComponent } from './userregistration/userregistration.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'company-register', component: CompanyRegistrationComponent },
  { path: 'user-register', component: UserregistrationComponent },

  {
    path: 'gatapass-admin',
    loadChildren: () =>
      import('./gatepass-admin/gatepass-admin.module').then(
        (f) => f.GatepassAdminModule
      ),
  },
  {
    path: 'organization-admin',
    loadChildren: () =>
      import('./organization-admin/organization-admin.module').then(
        (f) => f.OrganizationAdminModule
      ),
  },
  // { path: 'main', component: MainComponent },
  // {
  //   path: 'user',
  //   loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate: [authGuard]
  // },
  // {
  //   path: 'main',
  //   canActivate: [authGuard],
  //   loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  // },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
