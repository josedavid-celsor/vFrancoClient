import { Component, inject } from '@angular/core';
import { CarritoService } from '../services/Carrito.service';
import { Carrito } from '../interfaces/Carrito';
import { ProductoService } from '../services/Producto.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PasarelaPagoComponent } from '../pasarela-pago/pasarela-pago.component';
import { enviroment } from 'src/environments/environment';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {
  activatedRouted: ActivatedRoute = inject(ActivatedRoute);
  carritoService: CarritoService = inject(CarritoService);
  matDialog: MatDialog = inject(MatDialog);
  carritoFilter: Array<Carrito>;
  apibackEnd: string = enviroment.api;

  ngOnInit() {
    this.getCarrito()

  }

  abrirPasarela(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "50vw";
    const dialogRef = this.matDialog.open(PasarelaPagoComponent, dialogConfig)
  }

  vaciarCarrito() {
    this.carritoService.vaciarCarrito().subscribe(()=>{
      this.carritoFilter = []
    });
    
  }

  getCarrito() {
    /** Recogemos al menos 50 productos del tipo de producto elegido */
    this.carritoService.getCarrito().subscribe(resp =>{
      //Recorremos cada carrito, sacamos el producto y decimos que el array de fotos sera el split de la cadena de imagenes por el -
      resp.forEach(carrito =>{
        carrito.producto.fotos = carrito.producto.images.split("-")
      })
      this.carritoFilter = resp;
      console.log(this.carritoFilter);
    })
  }
}
