import { Component, inject } from '@angular/core';
import { ProductoService } from '../services/Producto.service';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../interfaces/Producto';
import { CarritoService } from '../services/Carrito.service';
import { FormControl, FormGroup } from '@angular/forms';
import { SubTipoProducto } from '../interfaces/SubTipoProducto';
import { SubTipoProductoService } from '../services/SubTipoProduto.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, shareReplay } from 'rxjs';

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
  subTipoProductoService: SubTipoProductoService = inject(SubTipoProductoService)
  productosFilter: Array<Producto>
  FormSearch: FormGroup;
  codigo: string;
  termino: string;
  subTipoElegido: string;
  listaSubtipos: SubTipoProducto[]; 
  listaSubtiposElegidos: SubTipoProducto[] = [];
  breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  cols: number = 4;
  /** Observable para el responsive del sidenav */
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    
    ngOnInit(){
    this.FormSearch = new FormGroup({
      subTipos: new FormControl(null),
      search: new FormControl(null), 
    });

    
    /** Recogemos desde la url el id del tipo de producto   */
    this.activatedRouted.params.subscribe(params=>{
      console.log(params)
      this.codigo = params.codigo
      console.log(this.codigo);
      this.getProductByType()
      this.getSubtipos()
    })
    this.FormSearch.get('search').valueChanges.subscribe(valor => {
      this.termino = valor;
      this.getProductByType();
    })
    this.FormSearch.get('subTipos').valueChanges.subscribe(valor=>{
      this.subTipoElegido = valor;
      this.getProductByType()
    })
  }

  ngAfterViewInit(){
      this.isHandset$.subscribe(value=>{
        this.cols = value?1:4
      })
  }
  getProductByType(){
    /** Recogemos al menos 50 productos del tipo de producto elegido */
    this.productoService.getProductoPlist(0,50,this.termino,null,null,null,this.codigo, this.subTipoElegido).subscribe(filteredData=>{
      this.productosFilter = filteredData.content
    })
  }

  addCarrito(producto: Producto){
    this.carritoService.insert(producto).subscribe();
  }

  getSubtipos(){
    this.subTipoProductoService.getSubtiposProductoByCodigo(this.codigo).subscribe(subtiposProductos =>{
      this.listaSubtipos = subtiposProductos
    })
  }

/* getSubtiposElegidos(subtipo: SubTipoProducto){
    if(this.listaSubtiposElegidos.includes(subtipo)){
      this.listaSubtiposElegidos.splice(this.listaSubtiposElegidos.indexOf(subtipo),1)
    }else{
      this.listaSubtiposElegidos.push(subtipo)
    }
  } */

  resetButton(subtipo: SubTipoProducto) {
    if (subtipo.codigo === this.FormSearch.value.subTipos) {
      this.FormSearch.get("subTipos").reset(null)
    }
  }
}
