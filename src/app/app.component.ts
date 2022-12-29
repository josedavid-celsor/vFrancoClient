import { Component } from '@angular/core';
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
    public auth: AuthService
  ){}

  title = 'vFrancoClient';

  logout(){
    this.auth.logout();
  }
  ngOnInit(){
 
    
  }
  ngAfterViewInit(){
    this.auth.usuarioConectado$.subscribe(usuario=>{
      this.userConect = usuario;
      console.log(this.userConect)
    })
    if(!this.userConect&& this.auth.getUserConnected()){
      this.userConect = this.auth.getUser();
    }
  }
}
