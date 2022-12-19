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
    private auth: AuthService
  ){}

  title = 'vFrancoClient';

  logout(){
    this.auth.logout();
  }
  ngOnInit(){
    this.userConect = this.auth.usuariConectado
    console.log(this.auth.usuariConectado)
  }
}
