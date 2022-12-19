import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/User';
import { RestService } from './rest.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
login: boolean = false;
authapi: string = "Auth";
usuariConectado: User;

constructor(
  private restservice: RestService,
  private routed: Router
) { 
  if(localStorage.getItem('user')){ 
    
    this.usuariConectado = JSON.parse(localStorage.getItem('user'))

  }
 }

  loginRequest(username:string, password:string ):Observable<User>{
    return new Observable<User>(observe=>{
      observe.next()
      this.restservice.peticionHttp(this.authapi + "/token", "post", {
        username,
        password
      }).subscribe(respuestaapi=>{
        if(respuestaapi){
          localStorage.setItem("token", respuestaapi.token)
          localStorage.setItem("user", JSON.stringify(respuestaapi))
          location.reload()
        }
      })

    })
  }

  register(usuario: User):Observable<User>{
    return new Observable<User>(observe=>{
      observe.next()
      this.restservice.peticionHttp(this.authapi + "/register", "post", 
        usuario
      ).subscribe(respuestaapi=>{
        if(respuestaapi){
          localStorage.setItem("token", respuestaapi.token)
        }
      })

    })
  } 

  logout(){
    localStorage.clear();
    location.reload();
  }
 /*  recuperarProductos(): Promise<Producto[]>{
    return new Promise<Producto[]>((resolve, reject)=>{
      console.log("holi aqui toy")
      resolve([{nombre: "producto1", cantidad:4}])
    })
  }

  recuperarProductosOBS(): Observable<Producto[]>{
    return new Observable<Producto[]>(observe=>{
      console.log("Me estoy ejecutando")
      observe.next([{nombre: "producto1", cantidad:4}])
      observe.complete()
    })
  } */
}
