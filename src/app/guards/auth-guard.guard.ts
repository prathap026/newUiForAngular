// import { CanActivateFn } from '@angular/router';

// export const authGuardGuard: CanActivateFn = (route, state) => {
//   return true;
// };
import { inject } from '@angular/core';
import { CanActivateFn,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const router = inject(Router);
  const token = localStorage.getItem('Token');
  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

