import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.scss']
})
export class RegistrosComponent {
  hide = true;

  FormRegistro: FormGroup; 
  
  ngOnInit(){
   this.FormRegistro = new FormGroup({
     username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
     password: new FormControl(null, [Validators.required]),
     surname: new FormControl(null),
     email: new FormControl(null, [Validators.required]),
     name: new FormControl(null, [Validators.required]),
     lastname: new FormControl(null, [Validators.required]),
   });
  }
 
  register(){
   //Para sacar el valor del control de un formulario
   const username: string = this.FormRegistro.get('username').value;
   const password: string = this.FormRegistro.value.password;
   const email: string = this.FormRegistro.get('email').value;
   const lastname: string = this.FormRegistro.value.lastname;

 
  }
}
