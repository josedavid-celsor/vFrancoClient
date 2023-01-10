import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Carrito } from '../interfaces/Carrito';
import { Producto } from '../interfaces/Producto';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  carritotoApi: string = "Carrito";

constructor(private restservice: RestService, private matsnackbar: MatSnackBar) { }

getCarrito(): Observable<Carrito> {
  return new Observable<Carrito>(observe => {
      this.restservice.peticionHttp(this.carritotoApi + "", "get"
      ).subscribe(respuestaapi => {
        /* console.log(respuestaapi) */
        observe.next(respuestaapi)
        observe.complete()
      })

  })
}


insert(producto: Producto){
  return new Observable<Carrito>(observe=>{
    this.restservice.peticionHttp(this.carritotoApi + "/" + producto.id, "post").subscribe(respuestaapi=>{
      this.matsnackbar.open("Se ha agregado tu producto al carrito", "X", {
        duration: 3000
      })
      observe.next(respuestaapi)
      observe.complete()
    })
  })
}

comprarTodo(){
  return new Observable<Carrito>(observe=>{
    this.restservice.peticionHttp(this.carritotoApi, "post").subscribe(respuestaapi=>{
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
