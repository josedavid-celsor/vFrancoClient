import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';
import { TipoProducto } from '../interfaces/TipoProducto';
import { Page } from '../interfaces/Page';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class TipoProductoService {
tipoProductoapi: string = "TipoProducto";
constructor(private restservice: RestService, private oHttp: HttpClient) { }

/* http://localhost:8082/TipoProducto?page=1&size=5&direction=Sort.Direction.DESC */
getTipoProductoPlist(page?: number, size?: number, termino?: string, id_usertype?: number, strSortField?: string, strOrderDirection?: string): Observable<Page<TipoProducto>> {
 
  let pagination = "?";
  if(page) pagination += `page=${page}&`
  if(size) pagination += `size=${size}&`
  if(termino) pagination += `filter=${termino}&`
  
   
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
    this.restservice.peticionHttp(this.tipoProductoapi,'getPaginado',null,pagination).subscribe(respuesta => {
      observer.next(respuesta)
      observer.complete()
    })
   
  })
}

/* getOne(id: number): Observable<TipoProducto> {
  return this.restservice.peticionHttp(this.tipoProductoapi, '?parametro=1')
}   */
/*
newOne(oTipoProducto: ITipoproducto2Send): Observable<number> {
  return this.http.post<number>(this.sURL + '/', oTipoProducto, httpOptions);
}

updateOne(oTipoProducto: ITipoproducto2Send): Observable<number> {
  return this.http.put<number>(this.sURL + '/', oTipoProducto, httpOptions);
}*/
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
    this.restservice.peticionHttp(this.tipoProductoapi + "/" + tipoProducto.id, "put", tipoProducto).subscribe(respuestaapi=>{
      
      observe.next(respuestaapi)
      observe.complete()
    })
  })
}

delete(id: number ):Observable<boolean>{
  return new Observable<boolean>(observe=>{
    this.restservice.peticionHttp(this.tipoProductoapi +  "/" + id, "delete").subscribe(respuestaapi=>{
      
        observe.next(true)
        observe.complete()
      
    })

  })
}

}
