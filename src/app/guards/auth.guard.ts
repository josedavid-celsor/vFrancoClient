import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/Auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    //Para enrutamiento
    private router: Router ,

    //Inyectando authservice
    private authservice: AuthService
  ){}

  canActivate(): boolean {
    /* console.log("holi aqui toy")
    this.router.navigate(['login']) */
    if(this.authservice.getUserConnected()){
      return true;
    }else{
      this.router.navigate(["login"]);
      return false;
    }
    
  }

}
