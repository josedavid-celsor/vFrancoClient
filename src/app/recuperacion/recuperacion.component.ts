import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/Auth.service';

@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.component.html',
  styleUrls: ['./recuperacion.component.scss']
})
export class RecuperacionComponent {

  FormRecover: FormGroup;
  actRouted: ActivatedRoute = inject(ActivatedRoute)
  router: Router = inject(Router)
  authservice: AuthService = inject(AuthService)
  codeVerify: boolean = false;
  verficationCode: string;

  ngOnInit(){
    this.actRouted.params.subscribe(params=>{
      if(params.passwordCode){
        this.authservice.verifyRecover(params.passwordCode).subscribe(verificado=>{
          if(verificado){
            this.codeVerify = true;
            this.verficationCode = params.passwordCode;
          }else{
            //Proximamente mostrar mensaje de error(Porfa no me olvides)
          }
        })
      }
    })
   this.FormRecover = new FormGroup({
     password1: new FormControl(null, [Validators.required]),
     password2: new FormControl(null, [Validators.required]),
   });
  }

  changePassword(){
    this.authservice.recover(this.verficationCode, this.FormRecover.value.password1, this.FormRecover.value.password2).subscribe(correcto=>{
      this.router.navigate(['login'])
    })
  }
}
