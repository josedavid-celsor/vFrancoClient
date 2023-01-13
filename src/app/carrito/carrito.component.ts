import { Component, inject } from '@angular/core';
import { CarritoService } from '../services/Carrito.service';
import { Carrito } from '../interfaces/Carrito';
import { ProductoService } from '../services/Producto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {
  activatedRouted: ActivatedRoute = inject(ActivatedRoute)
  carritoService: CarritoService = inject(CarritoService);
  carritoFilter: Array<Carrito>;

  ngOnInit() {
    this.getCarrito()

  }

  comprarTodo() {
    this.carritoService.comprarTodo().subscribe()
  }

  vaciarCarrito() {
    this.carritoService.vaciarCarrito().subscribe();
    this.getCarrito();
  }

  getCarrito() {
    /** Recogemos al menos 50 productos del tipo de producto elegido */
    this.carritoService.getCarrito().subscribe(resp =>{
      //Recorremos cada carrito, sacamos el producto y decimos que el array de fotos sera el split de la cadena de imagenes por el -
      resp.forEach(carrito =>{
        carrito.producto.fotos = carrito.producto.images.split("-")
      })
      this.carritoFilter = resp;
      console.log(this.carritoFilter);
    })
  }
}
