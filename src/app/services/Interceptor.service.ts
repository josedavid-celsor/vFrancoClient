import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { AuthService } from './Auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  private authService: AuthService = inject(AuthService);
  
/**
   * Función de interceptación
   * @param req Petición
   * @param next Response
   * @returns Evento
   */
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  return next.handle(req)
    .pipe(tap(
      event => ()=>{   },//,
      error => this.gestionaErrores(error)
    ), finalize(() => {
    })
    );
}

/**
 * Gestiona los errores de las peticiones
 * @param error Error en cuestión
 */
gestionaErrores(error: HttpErrorResponse) {
  switch (error.status) {
    case 401:
      this.authService.logout();
      break;
  }

}

}
