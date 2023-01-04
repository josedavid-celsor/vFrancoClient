import { Component, inject } from '@angular/core';
import { ProductoService } from '../services/Producto.service';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../interfaces/Producto';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  //Para injectar sin el constructor angular 14
  productoService: ProductoService = inject(ProductoService)
  activatedRouted: ActivatedRoute = inject(ActivatedRoute)
  productosFilter: Array<Producto>

  ngOnInit(){
    this.activatedRouted.params.subscribe(params=>{
      console.log(params)
      this.getProductByType(params.idTipo)
    })
  }

  getProductByType(idTipo: number){
    this.productoService.getProductoPlist(0,50,null,null,null,null,idTipo).subscribe(filteredData=>{
      this.productosFilter = filteredData.content
    })
  }
}
