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
  resp: any;

  ngOnInit() {
    this.getCarrito()

  }

  comprarTodo() {
    this.carritoService.comprarTodo().subscribe()
  }

  vaciarCarrito() {
    this.carritoService.vaciarCarrito().subscribe()
  }

  getCarrito() {
    /** Recogemos al menos 50 productos del tipo de producto elegido */
    this.carritoService.getCarrito().subscribe({
      next: (resp: any) => {
        //console.log(resp);
        this.carritoFilter = resp;
        console.log(this.carritoFilter);
      }
  });
    /* this.carritoService.getCarrito().subscribe(filteredData => {
      console.log(filteredData)
      this.carritoFilter = filteredData;
      console.log(this.carritoFilter)
    }) */
  }
}
