import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/Auth.service';
import { User } from '../interfaces/User';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.scss']
})
export class RegistrosComponent {
  hide = true;

  FormRegistro: FormGroup;
  authservice: AuthService = inject(AuthService)


  ngOnInit(){
   this.FormRegistro = new FormGroup({
     username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
     password: new FormControl(null, [Validators.required]),
     apellido: new FormControl(null, [Validators.required]),
     email: new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
     nombre: new FormControl(null, [Validators.required]),
     apellido2: new FormControl(null),
     dni: new FormControl(null, [Validators.required])
   });
  }

  register(){
   //Para sacar el valor del control de un formulario
  if(this.FormRegistro.valid){
    const usuario: User = this.FormRegistro.value
    this.authservice.register(usuario).subscribe()
  }else{
    //Mostrar notificación de error PROXIMAMENTE

   }
  }
}
