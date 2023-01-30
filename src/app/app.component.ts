import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from './services/Auth.service';
import { User } from './interfaces/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userConect: User;
  constructor(
    public auth: AuthService,
    private cd:ChangeDetectorRef
  ){}

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
