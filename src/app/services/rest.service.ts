import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID, EventEmitter, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { enviroment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
/** Servicio que prepara y ejecuta las peticiones */
@Injectable({
  providedIn:
    'root'
})
export class RestService {
  /** Cabeceras */
  private headers: HttpHeaders;
  /** Url de la API */
  public apiUrl: string;
  /** Para el control de carga del spinner */
  public isWaiting: EventEmitter<boolean>
  /** Número de solicitudes en curso */
  solicitudes: number = 0;
  private matsnackbar: MatSnackBar = inject(MatSnackBar)
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {

    this.headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });


    this.apiUrl = enviroment.api;
    this.isWaiting = new EventEmitter();
  }
  /**
   * Función para obtener un token
   * @returns El token
   */
  getToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
  }
  /** Setea token */
  setToken(): void {
    this.headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });

  }
  /**
   * Ejecuta la petición http
   * @param url Url
   * @param tipo Tipo de petición
   * @param valores Valores de la petición
   * @returns Observable con el resultado de la petición
   */
  peticionHttp(url: string, tipo: string, valores?: any, valoresPaginacion?: string): Observable<any> {

    this.isWaiting.emit(true);
    this.solicitudes++;
    this.setToken();
    let peticion: Observable<any>;
    switch (tipo) {
      case 'get':
        peticion = this.http.get(this.apiUrl + url, { observe: 'body', headers: this.headers });
        break;
      case 'getPaginado':
        peticion = this.http.get(this.apiUrl + url + valoresPaginacion, { observe: 'body', headers: this.headers });
        break;
      case 'post':
        peticion = this.http.post(this.apiUrl + url, valores, { observe: 'body', headers: this.headers });
        break;
      case 'put':
        peticion = this.http.put(this.apiUrl + url, valores, { observe: 'body', headers: this.headers });
        break;
      case 'delete':
        peticion = this.http.delete(this.apiUrl + url, { observe: 'body', headers: this.headers })
        break;
      case 'upFiles':
        peticion = this.http.post(this.apiUrl + url, valores, { observe: 'body', headers: this.headers });
        break;
      case 'upFile':
        const formDataUnique = new FormData();
        formDataUnique.append(valores[0].name, valores[0]);
        formDataUnique.append('verificationCode', valores[1]);
        peticion = this.http.post(this.apiUrl + url, formDataUnique, { observe: 'body', headers: this.headers });
        break;
    }
    return new Observable(observer => {
      peticion.subscribe((response: any) => {
        this.solicitudes--;
        if (this.solicitudes < 1) this.isWaiting.emit(false);
        if (!response?.error) {
          observer.next(response);
          observer.complete();
        } else {
          observer.next(false);
          observer.complete();
        }

      }, error => {
        this.solicitudes--;
        this.isWaiting.emit(false);
        observer.error(error);
        observer.complete();
        console.log(error)
        this.matsnackbar.open(error.error.message, "X", {
          duration: 3000
        })
      })
    })
  }
}
