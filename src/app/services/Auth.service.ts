import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/Producto';
import { Observable } from 'rxjs';
import { User } from '../interfaces/User';
import { UrlSerializer } from '@angular/router';
import { RestService } from './rest.service';

@Injectable()
export class AuthService {
login: boolean = false;
authapi: string = "Auth";
constructor(
  private restservice: RestService
) { }
  loginRequest(username:string, password:string ):Observable<User>{
    return new Observable<User>(observe=>{
      observe.next()
      this.restservice.peticionHttp(this.authapi + "/token", "post", {
        username,
        password
      }).subscribe(respuestaapi=>{
        if(respuestaapi){
          localStorage.setItem("token", respuestaapi.token)
        }
      })

    })
  }

  register(nombre:string, dni: string,
    apellido: string,
    apellido2: string,
    email: string,
    username: string, password:string ):Observable<User>{
    return new Observable<User>(observe=>{
      observe.next()
      this.restservice.peticionHttp(this.authapi + "/register", "post", {
        nombre,
        apellido,
        apellido2,
        email,
        username,
        password
      }).subscribe(respuestaapi=>{
        if(respuestaapi){
          localStorage.setItem("token", respuestaapi.token)
        }
      })

    })
  }
  recuperarProductos(): Promise<Producto[]>{
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
  }
}
