import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';
import { TipoProducto } from '../interfaces/TipoProducto';
import { Page } from '../interfaces/Page';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubTipoProducto } from '../interfaces/SubTipoProducto';

@Injectable()
export class SubTipoProductoService {
    subTipoProductoapi: string = "Subtipo";
    constructor(private restservice: RestService, private oHttp: HttpClient, private matsnack: MatSnackBar) { }

    /* http://localhost:8082/TipoProducto?page=1&size=5&direction=Sort.Direction.DESC */
    getSubTipoProductoPlist(page?: number, size?: number, termino?: string, id_usertype?: number, strSortField?: string, strOrderDirection?: string): Observable<Page<SubTipoProducto>> {

        let pagination = "?";
        if (page) pagination += `page=${page}&`
        if (size) pagination += `size=${size}&`
        if (termino) pagination += `filter=${termino}&`

        return new Observable(observer => {
            this.restservice.peticionHttp(this.subTipoProductoapi, 'getPaginado', null, pagination).subscribe(respuesta => {
                observer.next(respuesta)
                observer.complete()
            })

        })
    }

    create(subTipoProducto: SubTipoProducto) {
        return new Observable<TipoProducto>(observe => {
            this.restservice.peticionHttp(this.subTipoProductoapi + "/", "post", subTipoProducto).subscribe(respuestaapi => {

                observe.next(respuestaapi)
                observe.complete()
            })
        })
    }

    edit(subTipoProducto: SubTipoProducto) {
        return new Observable<TipoProducto>(observe => {
            this.restservice.peticionHttp(this.subTipoProductoapi + "/" + subTipoProducto.id, "put", subTipoProducto).subscribe({
                next: (respuestaapi) => {
                    observe.next(respuestaapi)
                    observe.complete()
                }, error: (err) => {
                    observe.error(err)
                }
            })
        })
    }

    delete(id: number): Observable<boolean> {
        return new Observable<boolean>(observe => {
            this.restservice.peticionHttp(this.subTipoProductoapi + "/" + id, "delete").subscribe({

                next: (respuestaapi) => {
                    observe.next(respuestaapi)
                    observe.complete()
                }, error: (err) => {
                    this.matsnack.open("No se puede eliminar el Sub-Tipo Producto porque hay productos que dependen de él", "cerrar", { duration: 3000, panelClass: "notierror" })
                    observe.error(err)
                }

            })

        })
    }
    generate(tipoProducto: TipoProducto ) {
        return new Observable<SubTipoProducto>(observe => {
            this.restservice.peticionHttp(this.subTipoProductoapi + "/generate/" + tipoProducto.id, "post").subscribe(respuestaapi => {
                observe.next(respuestaapi)
                observe.complete()
            })
        })
    }

    getByTipoProducto(tipoProducto: TipoProducto) {
        return new Observable<TipoProducto>(observe => {
            this.restservice.peticionHttp(this.subTipoProductoapi + "/TipoProducto/" + tipoProducto.id, "get").subscribe(respuestaapi => {

                observe.next(respuestaapi)
                observe.complete()
            })
        })
    }
    
    getSubtiposProductoByCodigo(codigo: string){
        return new Observable<SubTipoProducto[]>(observe => {
            this.restservice.peticionHttp(this.subTipoProductoapi + "/TipoProducto/codigo/" + codigo, "get").subscribe(respuestaapi => {
                observe.next(respuestaapi)
                observe.complete()
            })
        })
    }
}
