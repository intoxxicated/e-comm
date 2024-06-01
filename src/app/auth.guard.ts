import {CanActivate, CanActivateFn} from '@angular/router';
import {SellerAuthService} from "./services/seller-auth.service";

export const authGuard: CanActivateFn = (route, state) => {

  if(localStorage.getItem('seller')){
    return true;
  }
  return false;
  // return this.sellerAuthService.isSellerLoggedIn.getValue();
};
class AlwaysAuthGuard implements CanActivate {
  canActivate() {
    console.log("AlwaysAuthGuard");
    return true;
  }
}
