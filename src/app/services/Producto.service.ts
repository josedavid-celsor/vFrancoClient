import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/Producto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page } from '../interfaces/Page';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

 productoApi: string = "Producto";
  constructor(private restservice: RestService, private oHttp: HttpClient) { }
  
  /* http://localhost:8082/producto?page=1&size=5&direction=Sort.Direction.DESC */
  getProductoPlist(page?: number, size?: number, termino?: string, id_usertype?: number, strSortField?: string, strOrderDirection?: string, id_tipoProducto?: number): Observable<Page<Producto>> {
   
    let pagination = "?";
    if(page) pagination += `page=${page}&`
    if(size) pagination += `size=${size}&`
    if(termino) pagination += `filter=${termino}&`
    if(id_tipoProducto) pagination += `tipoproducto=${id_tipoProducto}&`
    
     
  /*   if (id_usertype) {
      params = params.set("usertype", id_usertype);
      console.log("por que no funcionas?")
    }
    if (strSortField) { //&sort=codigo,[asc|desc]
      if (strOrderDirection != "") {
        params = params.set("sort", strSortField + "," + strOrderDirection);
        console.log("por que no funcionas?")
      } else {
        params = params.set("sort", strSortField);
        console.log("por que no funcionas?")
      }
    } */
   
    return new Observable(observer => {
      this.restservice.peticionHttp(this.productoApi,'getPaginado',null,pagination).subscribe(respuesta => {
        observer.next(respuesta)
        observer.complete()
      })
     
    })
  }
  
  create(producto: Producto){
    return new Observable<Producto>(observe=>{
      this.restservice.peticionHttp(this.productoApi + "/", "post", producto).subscribe(respuestaapi=>{
        
        observe.next(respuestaapi)
        observe.complete()
      })
    })
  }
  
  edit(producto: Producto){
    return new Observable<Producto>(observe=>{
      this.restservice.peticionHttp(this.productoApi + "/" + producto.id, "put", producto).subscribe(respuestaapi=>{
        
        observe.next(respuestaapi)
        observe.complete()
      })
    })
  }
  
  delete(id: number ):Observable<boolean>{
    return new Observable<boolean>(observe=>{
      this.restservice.peticionHttp(this.productoApi +  "/" + id, "delete").subscribe(respuestaapi=>{
        
          observe.next(true)
          observe.complete()
        
      })
  
    })
  }

  generate(){
    return new Observable<Producto>(observe=>{
      this.restservice.peticionHttp(this.productoApi + "/generate", "post").subscribe(respuestaapi=>{
        
        observe.next(respuestaapi)
        observe.complete()
      })
    })
  }
}
