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


getTipoProductoPlist(page?: number, size?: number, termino?: string, id_usertype?: number, strSortField?: string, strOrderDirection?: string): Observable<Page<TipoProducto>> {
  let params = new HttpParams()
  if(page && size && termino){
    params.set("filter", termino)
    .set("page", page)
    .set("size", size);
  }
   
  if (id_usertype) {
    params = params.set("usertype", id_usertype);
  }
  if (strSortField) { //&sort=codigo,[asc|desc]
    if (strOrderDirection != "") {
      params = params.set("sort", strSortField + "," + strOrderDirection);
    } else {
      params = params.set("sort", strSortField);
    }
  }
  return new Observable(observer => {
    this.restservice.peticionHttp(this.tipoProductoapi,'getPaginado',null,params).subscribe(respuesta => {
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
      console.log(respuestaapi)
      
      observe.next(respuestaapi)
      observe.complete()
    })
  })
}

edit(tipoProducto: TipoProducto){
  return new Observable<TipoProducto>(observe=>{
    this.restservice.peticionHttp(this.tipoProductoapi + "/" + tipoProducto.id, "put", tipoProducto).subscribe(respuestaapi=>{
      console.log(respuestaapi)
      
      observe.next(respuestaapi)
      observe.complete()
    })
  })
}

delete(id: number ):Observable<boolean>{
  return new Observable<boolean>(observe=>{
    this.restservice.peticionHttp(this.tipoProductoapi +  "/" + id, "delete").subscribe(respuestaapi=>{
      console.log(respuestaapi)
      
        observe.next(true)
        observe.complete()
      
    })

  })
}

}
