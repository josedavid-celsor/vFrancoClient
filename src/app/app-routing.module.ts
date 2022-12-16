import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrosComponent } from './registros/registros.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: "login", component: LoginComponent, title:"Login"},
  {path: "registro", component: RegistrosComponent, title: "Register", canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
