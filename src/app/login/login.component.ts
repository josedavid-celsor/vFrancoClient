import { Component } from '@angular/core';
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
 
 constructor(private authservice: AuthService){

 }
 ngOnInit(){
/*   this.authservice.recuperarProductos().then(Productos=>{
    console.log(Productos)
  })
  this.authservice.recuperarProductosOBS().subscribe(Productos=>{
    console.log(Productos)
  }) */
  this.FormLogin = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    password: new FormControl(null, [Validators.required])
  });
 }

 inicioSesion(){
  //Para sacar el valor del control de un formulario
  const username: string = this.FormLogin.get('username').value;
  const password: string = this.FormLogin.value.password;
  this.authservice.loginRequest(username, password).subscribe()

 }
}
