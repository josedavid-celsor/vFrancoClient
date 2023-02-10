import { Component, EventEmitter, Input, Output } from '@angular/core';
import { enviroment } from 'src/environments/environment';
import { Producto } from '../interfaces/Producto';

@Component({
  selector: 'app-carta-producto',
  templateUrl: './carta-producto.component.html',
  styleUrls: ['./carta-producto.component.scss']
})
export class CartaProductoComponent {
  //Relación padre hijo permite redirigir información entre ellos
  @Input() producto: Producto
  apibackEnd: string = enviroment.api;

  //Para mandar información a su componente padre mediante un evento
  @Output() add: EventEmitter<void> = new EventEmitter()
  ngOnInit(){
    this.producto.fotos = this.producto.images.split("-")
  }
  addCarrito(){
    this.add.emit()
  }


}
