import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GFFormService, GF_Form, GF_TypeForm } from '@aramirezj/ngx-generic-form';
import { AuthService } from '../services/Auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;

 FormLogin: FormGroup;
 formOpen: GF_Form<{user: string}> = new GF_Form(GF_TypeForm.CREATION, ["user"], ["User"], "Creación");
 authservice: AuthService = inject(AuthService)
  formService: GFFormService = inject(GFFormService);

 ngOnInit(){
  this.FormLogin = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    password: new FormControl(null, [Validators.required])
  });
 }

 inicioSesion(){
  //Sacamos el usuario y password y lanzamos la api de login
  const username: string = this.FormLogin.get('username').value;
  const password: string = this.FormLogin.value.password;
  this.authservice.loginRequest(username, password).subscribe()
  return false;
 }

 abrirForm() {
  this.formOpen.changeTypeForm(null, GF_TypeForm.CREATION, "Enter your user to recover")
  this.formService.openForm(this.formOpen).subscribe(response => {
   const usuario: string = response.user;
   this.authservice.startRecover(usuario).subscribe(notify=>{
    //Proximamente se envia un correo de notificacion pop app
   })
  });
}
}
