import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/Auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    //Para enrutamiento
    private router: Router ,

    //Inyectando authservice
    private authservice: AuthService

  ){}

  canActivate(): Observable<boolean> {
    return new Observable<boolean>(observe => {
        this.authservice.isAdminRequest().subscribe(isAdmin=>{
            if(isAdmin){
                observe.next(true) 
                observe.complete()
            }else{
                this.router.navigate(["inicio"]);
                observe.next(false) 
                observe.complete()
            }
        })
    })
  }

}