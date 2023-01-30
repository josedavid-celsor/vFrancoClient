import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GFMasterSelectComponent, GFMatErrorMessagesDirective } from '@aramirezj/ngx-generic-form';
import { NgxPaymentCardModule } from 'ngx-payment-card';
import { CarritoService } from '../services/Carrito.service';


@Component({
  selector: 'app-pasarela-pago',
  standalone: true,
  imports: [NgxPaymentCardModule, ReactiveFormsModule, MatFormFieldModule, GFMasterSelectComponent, MatDialogModule,
    MatInputModule, MatButtonModule, GFMatErrorMessagesDirective],
  templateUrl: './pasarela-pago.component.html',
  styleUrls: ['./pasarela-pago.component.scss']
})
export class PasarelaPagoComponent {

  PaymentForm: FormGroup;
  carritoService: CarritoService = inject(CarritoService);
  dialogRef: MatDialogRef<PasarelaPagoComponent> = inject(MatDialogRef);

  //Para crear una interface dentro del componente
  ciudad: {id: number, name: string, iva: string} [] = [
    { id: 1, name: 'España', iva: '21%' },
    { id: 2, name: 'Islas Canarias', iva: '7%' },
];

  ngOnInit(){
    this.PaymentForm = new FormGroup({
      iban: new FormControl(null),
      cardNumber: new FormControl(null),
      securityCode: new FormControl(null),
      name: new FormControl(null),
      ciudad: new FormControl(null),
      expirationDate: new FormControl(null),
    });
   }

   comprarTodo() {
    this.carritoService.comprarTodo(this.PaymentForm.value.ciudad).subscribe(()=>{
      this.dialogRef.close()
    })
  }

  cancelar(){
    this.dialogRef.close()
  }
}
