import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Producto } from '../interfaces/Producto';

@Component({
  selector: 'app-carta-producto',
  templateUrl: './carta-producto.component.html',
  styleUrls: ['./carta-producto.component.scss']
})
export class CartaProductoComponent {
  @Input() producto: Producto

  //Para mandar información a su componente padre mediante un evento
  @Output() add: EventEmitter<void> = new EventEmitter()
  ngOnInit(){
    this.producto.fotos = this.producto.images.split("-")
  }
  addCarrito(){
    this.add.emit()
  }


}
