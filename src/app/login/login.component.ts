import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/Auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;

 FormLogin: FormGroup;
 authservice: AuthService = inject(AuthService)

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
}
