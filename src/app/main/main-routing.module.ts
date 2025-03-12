import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { MainComponent } from './main.component';
import { authGuard } from '../guards/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'user', canActivate: [authGuard],
        loadChildren: () => import('../user/user.module').then(m => m.UserModule)
      },
      
      {
        path: 'product', canActivate: [authGuard],
        loadChildren: () => import('../product/product.module').then(m => m.ProductModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
