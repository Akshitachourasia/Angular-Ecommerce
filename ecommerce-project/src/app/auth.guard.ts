import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { SellersService } from './services/sellers.service';

export const authGuard: CanActivateFn = (route, state) => {
  const sellersService = inject(SellersService);
  if (localStorage.getItem('seller')) {
    return true
  }
  return sellersService.isSellerLoggedIn;

};
