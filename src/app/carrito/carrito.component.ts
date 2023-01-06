import { Component, inject } from '@angular/core';
import { CarritoService } from '../services/Carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {
  carritoService: CarritoService = inject(CarritoService); 

  ngOnInit(){
    this.carritoService.getCarrito().subscribe()

  }
  
  comprarTodo(){
    this.carritoService.comprarTodo().subscribe()
  }

  vaciarCarrito(){
    this.carritoService.vaciarCarrito().subscribe()
  }
}
