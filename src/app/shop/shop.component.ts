import { Component } from '@angular/core';
import { TipoProductoService } from '../services/TipoProducto.service';
import { TipoProducto } from '../interfaces/TipoProducto';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  listadoTipoProducto: TipoProducto[]
  columnasTipo: string[] = ["ID", "Nombre"]
  modeloTipo: string[]  = ["id", "nombre"]
  constructor(private tipoProducto: TipoProductoService){
  }

  ngOnInit(){
    this.tipoProducto.getTipoProductoPlist().subscribe(productos=>{
      this.listadoTipoProducto = productos.content
    })
  }
}
