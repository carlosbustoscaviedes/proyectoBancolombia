import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ClienteLoginComponent } from './pages/cliente-login/cliente-login.component';
import { ClienteRegistroComponent } from './pages/cliente-registro/cliente-registro.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { EscojerColaboradorComponent } from './pages/escojer-colaborador/escojer-colaborador.component';
import { RegistroColaboradorComponent } from './pages/registro-colaborador/registro-colaborador.component';
import { LoginColaboradorComponent } from './pages/login-colaborador/login-colaborador.component';
import { PantallaColaboradorComponent } from './pages/pantalla-colaborador/pantalla-colaborador.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

/*---importar formularios----*/
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/*---usar httmpclientmodule---*/
import { HttpClientModule } from "@angular/common/http"


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClienteLoginComponent,
    ClienteRegistroComponent,
    InicioComponent,
    EscojerColaboradorComponent,
    RegistroColaboradorComponent,
    LoginColaboradorComponent,
    PantallaColaboradorComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
