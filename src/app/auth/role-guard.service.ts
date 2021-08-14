import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router,private tokenStorage:TokenStorageService) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;

    if (!this.auth.isAuthenticated()){
      this.router.navigate(['login']);
      return false;
    }
    if(!this.tokenStorage.getAuthorities().includes(expectedRole)) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
