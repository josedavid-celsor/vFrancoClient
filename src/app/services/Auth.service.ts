import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../interfaces/User';
import { RestService } from './rest.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  login: boolean = false;
  authapi: string = "Auth";
  usuariConectado: User;
  usuarioConectado$: Subject<User> = new Subject();

  constructor(
    private restservice: RestService,
    private routed: Router
  ) {
    if (localStorage.getItem('user')) {

      this.usuariConectado = JSON.parse(localStorage.getItem('user'))
      this.usuarioConectado$.next(JSON.parse(localStorage.getItem('user')))
      /* console.log(this.usuarioConectado$) */
    }
  }


  loginRequest(username: string, password: string): Observable<User> {
    return new Observable<User>(observe => {
      observe.next()
      this.restservice.peticionHttp(this.authapi + "/token", "post", {
        username,
        password
      }).subscribe(respuestaapi => {
        if (respuestaapi) {
          localStorage.setItem("token", respuestaapi.token)
          localStorage.setItem("user", JSON.stringify(respuestaapi))
          this.usuarioConectado$.next(respuestaapi);
          this.routed.navigate(['inicio']);
        }
      })

    })
  }

  register(usuario: User): Observable<User> {
    return new Observable<User>(observe => {
      observe.next()
      this.restservice.peticionHttp(this.authapi + "/register", "post",
        usuario
      ).subscribe(respuestaapi => {
        if (respuestaapi) {
          localStorage.setItem("token", respuestaapi.token)
          this.usuarioConectado$.next(respuestaapi);
        }
      })

    })
  }

  logout() {
    localStorage.clear();
    this.usuarioConectado$.next(null);
    this.routed.navigate(['inicio'])
  }

  isAdminRequest(): Observable<boolean> {
    return new Observable<boolean>(observe => {
      const token: string =localStorage.getItem('token')
      if (token) {
        this.restservice.peticionHttp(this.authapi + "/verifyadmin" + "?tokenadmin=" + token, "get"
        ).subscribe(respuestaapi => {
          observe.next(respuestaapi)
          observe.complete()
        })
      } else {
        observe.next(false)
        observe.complete()
      }
    })
  }

  isAdmin(): boolean {
    const user: User = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      return false
    }
    return user.authority.id === 1
  }

  getUserConnected(): boolean {
    if (localStorage.getItem('user')) {
      return true;
    }
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  verifyEmail(verification_code: string): Observable<boolean> {
    return new Observable<boolean>(observe => {
      if (verification_code) {
        this.restservice.peticionHttp(this.authapi + "/verifyMail" + "?verification_code=" + verification_code, "get"
        ).subscribe(respuestaapi => {
          observe.next(respuestaapi)
          observe.complete()
        })
      } else {
        observe.next(false)
        observe.complete()
      }
    })
  }

  verifyRecover(passworCode: string): Observable<boolean> {
    return new Observable<boolean>(observe => {
      if (passworCode) {
        this.restservice.peticionHttp(this.authapi + "/verifyRecover" + "?passworCode=" + passworCode, "get"
        ).subscribe(respuestaapi => {
          observe.next(respuestaapi)
          observe.complete()
        })
      } else {
        observe.next(false)
        observe.complete()
      }
    })
  }

  recover(recoverCode: string, password1: string, password2: string): Observable<string> {
    const request = {recoverCode, password1, password2};
    return new Observable<string>(observe => {
      if (recoverCode) {
        this.restservice.peticionHttp(this.authapi + "/recover", "post", request
        ).subscribe(respuestaapi => {
          observe.next(respuestaapi)
          observe.complete()
        })
      } else {
        observe.next("No hay codigo de recuperación")
        observe.complete()
      }
    })
  }

  startRecover(usuario: string): Observable<boolean> {
    return new Observable<boolean>(observe => {
      if (usuario) {
        this.restservice.peticionHttp(this.authapi + "/iniciarRecover" + "?usuario=" + usuario, "get"
        ).subscribe(respuestaapi => {
          observe.next(respuestaapi)
          observe.complete()
        })
      } else {
        observe.next(false)
        observe.complete()
      }
    })
  }

}
