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


getTipoProductoPlist(page: number, size: number, termino: string, id_usertype: number, strSortField: string, strOrderDirection: string): Observable<Page<TipoProducto>> {
  let params = new HttpParams()
    .set("filter", termino)
    .set("page", page)
    .set("size", size);
  if (id_usertype != 0) {
    params = params.set("usertype", id_usertype);
  }
  if (strSortField != "") { //&sort=codigo,[asc|desc]
    if (strOrderDirection != "") {
      params = params.set("sort", strSortField + "," + strOrderDirection);
    } else {
      params = params.set("sort", strSortField);
    }
  }
  return this.oHttp.get<Page<TipoProducto>>(this.restservice.apiUrl + this.tipoProductoapi, { params: params });
}

/* getOne(id: number): Observable<ITipoproducto> {
  return this.http.get<ITipoproducto>(this.sURL + '/' + id, httpOptions);
}

newOne(oTipoProducto: ITipoproducto2Send): Observable<number> {
  return this.http.post<number>(this.sURL + '/', oTipoProducto, httpOptions);
}

updateOne(oTipoProducto: ITipoproducto2Send): Observable<number> {
  return this.http.put<number>(this.sURL + '/', oTipoProducto, httpOptions);
}

removeOne(id: number): Observable<number> {
  return this.http.delete<number>(this.sURL + '/' + id, httpOptions);
}  */
}
