import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*-----------paginas----------*/

import { InicioComponent } from './pages/inicio/inicio.component';
import { HomeComponent } from './pages/home/home.component';
import { EscojerColaboradorComponent } from './pages/escojer-colaborador/escojer-colaborador.component';
import { ClienteRegistroComponent } from './pages/cliente-registro/cliente-registro.component';
import { ClienteLoginComponent } from './pages/cliente-login/cliente-login.component';


import { LoginColaboradorComponent } from './pages/login-colaborador/login-colaborador.component';
import { RegistroColaboradorComponent } from './pages/registro-colaborador/registro-colaborador.component';
import { PantallaColaboradorComponent } from './pages/pantalla-colaborador/pantalla-colaborador.component';


import { SeguridadGuard } from './guard/seguridad.guard';

import { ColaboradorGuard } from './guard/colaborador.guard';

const routes: Routes = [
  
  { path:"inicio", component: InicioComponent },
  { path:"home", component: HomeComponent },
  { path:"escojerColaborador/:id", component: EscojerColaboradorComponent},
  { path:"clienteRegistro", component: ClienteRegistroComponent},
  { path:"clienteLogin", component: ClienteLoginComponent}, 
  { path:"loginColaborador", component: LoginColaboradorComponent },
  { path:"registroColaborador", component: RegistroColaboradorComponent},
  { path:"pantallaColaborador", component: PantallaColaboradorComponent },
  { path:"**", pathMatch:"full", redirectTo:"inicio" }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
