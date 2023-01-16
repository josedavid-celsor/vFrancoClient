import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';
import { TipoProducto } from '../interfaces/TipoProducto';
import { Page } from '../interfaces/Page';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TipoProductoService {
tipoProductoapi: string = "TipoProducto";
constructor(private restservice: RestService, private oHttp: HttpClient, private matsnack: MatSnackBar) { }

/* http://localhost:8082/TipoProducto?page=1&size=5&direction=Sort.Direction.DESC */
getTipoProductoPlist(page?: number, size?: number, termino?: string, id_usertype?: number, strSortField?: string, strOrderDirection?: string): Observable<Page<TipoProducto>> {
 
  let pagination = "?";
  if(page) pagination += `page=${page}&`
  if(size) pagination += `size=${size}&`
  if(termino) pagination += `filter=${termino}&`
  return new Observable(observer => {
    this.restservice.peticionHttp(this.tipoProductoapi,'getPaginado',null,pagination).subscribe(respuesta => {
      observer.next(respuesta)
      observer.complete()
    })
   
  })
}

create(tipoProducto: TipoProducto){
  return new Observable<TipoProducto>(observe=>{
    this.restservice.peticionHttp(this.tipoProductoapi + "/", "post", tipoProducto).subscribe(respuestaapi=>{
      
      observe.next(respuestaapi)
      observe.complete()
    })
  })
}

edit(tipoProducto: TipoProducto){
  return new Observable<TipoProducto>(observe=>{
    this.restservice.peticionHttp(this.tipoProductoapi + "/" + tipoProducto.id, "put", tipoProducto).subscribe({
      next:(respuestaapi)=>{
        observe.next(respuestaapi)
        observe.complete()
      }, error:(err)=>{
        console.log(err)
        observe.error(err)
      }
    })
  })
}

delete(id: number ):Observable<boolean>{
  return new Observable<boolean>(observe=>{
    this.restservice.peticionHttp(this.tipoProductoapi +  "/" + id, "delete").subscribe({
      
      next:(respuestaapi)=>{
        observe.next(respuestaapi)
        observe.complete()
      }, error:(err)=>{
        console.log(err)
        this.matsnack.open("No se puede eliminar el tipo Producto porque hay productos que dependen de él", "cerrar", {duration: 3000, panelClass: "notierror"})
        observe.error(err)
      }
      
    })

  })
}
generate(){
  return new Observable<TipoProducto>(observe=>{
    this.restservice.peticionHttp(this.tipoProductoapi + "/generate", "post").subscribe(respuestaapi=>{
      
      observe.next(respuestaapi)
      observe.complete()
    })
  })
}

getAll(): Observable<TipoProducto[]>{
  return new Observable<TipoProducto[]>(observe=>{
    this.restservice.peticionHttp(this.tipoProductoapi + "/getAll", "get").subscribe(respuestaapi=>{
      
      observe.next(respuestaapi)
      observe.complete()
    })
  })
}
}
