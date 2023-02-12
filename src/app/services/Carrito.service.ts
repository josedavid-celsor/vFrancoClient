import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Carrito } from '../interfaces/Carrito';
import { Producto } from '../interfaces/Producto';
import { AuthService } from './Auth.service';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  carritotoApi: string = "Carrito";

constructor(private restservice: RestService, private matsnackbar: MatSnackBar, private auth: AuthService, private router: Router) { }

getCarrito(): Observable<Carrito[]> {
  return new Observable<Carrito[]>(observe => {
      this.restservice.peticionHttp(this.carritotoApi + "", "get"
      ).subscribe(respuestaapi => {
        observe.next(respuestaapi)
        observe.complete()
      })

  })
}


insert(producto: Producto){
  return new Observable<Carrito>(observe=>{
    if(this.auth.getUserConnected()){
      this.restservice.peticionHttp(this.carritotoApi + "/" + producto.id, "post").subscribe(respuestaapi=>{
        this.matsnackbar.open("Se ha agregado tu producto al carrito", "X", {
          duration: 3000
        })
        observe.next(respuestaapi)
        observe.complete()
      })
    }else{
      this.matsnackbar.open("Debes iniciar sesión", "X", {
        duration: 3000
      })
      this.router.navigate(['login'])
    }
  })
}

comprarTodo(idIva: number){
  return new Observable<Carrito>(observe=>{
    this.restservice.peticionHttp(this.carritotoApi + "/compra/" + idIva, "post").subscribe(respuestaapi=>{
      this.matsnackbar.open("Se ha comprado todo", "X", {
        duration: 3000
      })
      observe.next(respuestaapi)
      observe.complete()
    })
  })
}

vaciarCarrito(){
  return new Observable<Carrito>(observe=>{
    this.restservice.peticionHttp(this.carritotoApi, "delete").subscribe(respuestaapi=>{
      this.matsnackbar.open("Se ha borrado todo", "X", {
        duration: 3000
      })
      observe.next(respuestaapi)
      observe.complete()
    })
  })
}
}
