import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;

 FormLogin: FormGroup; 
 
 ngOnInit(){
  this.FormLogin = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    password: new FormControl(null, [Validators.required])
  });
 }

 inicioSesion(){
  //Para sacar el valor del control de un formulario
  const username: string = this.FormLogin.get('username').value;
  const password: string = this.FormLogin.value.password;
  if(username == "admin" && password == "123"){
    alert("inicio correcto");
  }

 }
}
