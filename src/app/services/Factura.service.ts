import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Factura } from '../interfaces/Factura';
import { Page } from '../interfaces/Page';
import { TipoProducto } from '../interfaces/TipoProducto';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  facturaApi: string = "Factura";
  constructor(private restservice: RestService, private oHttp: HttpClient, private matsnack: MatSnackBar) { }

getFacturaPlist(page?: number, size?: number, termino?: string, id_usertype?: number, strSortField?: string, strOrderDirection?: string): Observable<Page<Factura>> {

  let pagination = "?";
  if(page) pagination += `page=${page}&`
  if(size) pagination += `size=${size}&`
  if(termino) pagination += `filter=${termino}&`

  return new Observable(observer => {
    this.restservice.peticionHttp(this.facturaApi,'getPaginado',null,pagination).subscribe(respuesta => {
      observer.next(respuesta)
      observer.complete()
    })

  })
}


delete(id: number): Observable<boolean> {
  return new Observable<boolean>(observe => {
    this.restservice.peticionHttp(this.facturaApi + "/" + id, "delete").subscribe(respuestaapi => {

      observe.next(true)
      observe.complete()

    })

  })
}
}
