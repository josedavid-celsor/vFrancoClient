import { Component, inject } from '@angular/core';
import { ProductoService } from '../services/Producto.service';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../interfaces/Producto';
import { CarritoService } from '../services/Carrito.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  //Para injectar sin el constructor angular 14
  productoService: ProductoService = inject(ProductoService)
  activatedRouted: ActivatedRoute = inject(ActivatedRoute)
  carritoService: CarritoService = inject(CarritoService)
  productosFilter: Array<Producto>

  ngOnInit(){
    /** Recogemos desde la url el id del tipo de producto   */
    this.activatedRouted.params.subscribe(params=>{
      console.log(params)
      this.getProductByType(params.idTipo)
    })
  }

  getProductByType(idTipo: number){
    /** Recogemos al menos 50 productos del tipo de producto elegido */
    this.productoService.getProductoPlist(0,50,null,null,null,null,idTipo).subscribe(filteredData=>{
      
      
      this.productosFilter = filteredData.content
    })
  }

  addCarrito(producto: Producto){
    this.carritoService.insert(producto).subscribe();
  }
}
