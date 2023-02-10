import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from './services/Auth.service';
import { User } from './interfaces/User';
import { RestService } from './services/rest.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userConect: User;
  isWaiting = false;
  constructor(
    public auth: AuthService,
    private cd:ChangeDetectorRef,
    private rest:RestService,
    private spiner:NgxSpinnerService
  ){
    this.rest.isWaiting.subscribe(resp=>{
      this.isWaiting = resp;
      if(this.isWaiting){
        this.spiner.show()
      }else{
        this.spiner.hide()
      }
    })
  }

  title = 'vFrancoClient';

  /** Click del logout desde la vista */
  logout(){
    this.auth.logout();
  }

  ngAfterViewChecked(){
    this.cd.detectChanges();
  }
  ngAfterViewInit(){
    //Nos suscribimos al evento del usuario conectado por si hacemos un unlogin
    this.auth.usuarioConectado$.subscribe(usuario=>{
     this.userConect = usuario;
    })

    //Si no tenemos el usuario, y el usuario está conectado, lo recuperamos
    if(!this.userConect && this.auth.getUserConnected()){
      this.userConect = this.auth.getUser();
    }
  }
}
