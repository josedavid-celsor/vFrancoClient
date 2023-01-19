import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compra } from '../interfaces/Compra';
import { Factura } from '../interfaces/Factura';
import { RestService } from './rest.service';

@Injectable()
export class CompraService {
  
  compraApi: string = "Compra";
  constructor(private restservice: RestService) { }

  getAllByUsuario(): Observable<Compra[]>{
    return new Observable<Compra[]>(observe=>{
      this.restservice.peticionHttp(this.compraApi + "/getAll", "get").subscribe(respuestaapi=>{
        observe.next(respuestaapi??[])
        observe.complete()
      })
    })
  }

  getByFactura(factura: Factura): Observable<Compra[]>{
    return new Observable<Compra[]>(observe=>{
      this.restservice.peticionHttp(this.compraApi + "/" + factura.id , "get").subscribe(respuestaapi=>{
        observe.next(respuestaapi??[])
        observe.complete()
      })
    })
  }

}
