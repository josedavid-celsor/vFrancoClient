import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/Auth.service';
import { User } from '../interfaces/User';
import { ActivatedRoute, Router } from '@angular/router';
import { DniValidator, tipoIdentificador } from '../validators/dni-validator.directive';
import { CustomEmailValidator } from '../validators/custom-email.validator';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.scss']
})
export class RegistrosComponent {
  hide = true;
  hide2 = true;

  FormRegistro: FormGroup;
  authservice: AuthService = inject(AuthService)
  //Sirve para recoger parametros por URL
  actRouted: ActivatedRoute = inject(ActivatedRoute)
  router: Router = inject(Router)



  ngOnInit(){
    this.actRouted.params.subscribe(params=>{
      if(params.verificationCode){
        this.authservice.verifyEmail(params.verificationCode).subscribe(verificado=>{
          if(verificado){
            this.router.navigate(['inicio']);
          }
        })
      }
    })
   this.FormRegistro = new FormGroup({
     username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(256)]),
     password: new FormControl(null, [Validators.required, Validators.maxLength(256)]),
     password2: new FormControl(null, [Validators.required, Validators.maxLength(256)]),
     apellido: new FormControl(null, [Validators.required, Validators.maxLength(256)]),
     email: new FormControl(null, [Validators.required, CustomEmailValidator, Validators.maxLength(256)]),
     nombre: new FormControl(null, [Validators.required, Validators.maxLength(256)]),
     apellido2: new FormControl(null, [Validators.maxLength(256)]),
     dni: new FormControl(null, [Validators.required, DniValidator()])
   });
  }

  register(){
   //Para sacar el valor del control de un formulario
  if(this.FormRegistro.valid){
    const usuario: User = this.FormRegistro.value
    this.authservice.register(usuario).subscribe()
  }
  }
}
