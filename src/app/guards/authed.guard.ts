import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/Auth.service';

@Injectable()
export class AuthedGuard implements CanActivate {
  constructor(
    //Para enrutamiento
    private router: Router ,

    //Inyectando authservice
    private authservice: AuthService
  ){}

  canActivate(): boolean {
    if(this.authservice.getUserConnected()){
      this.router.navigate(["inicio"]);
      return false;
    }else{
      return true;
    }
    
  }

}
