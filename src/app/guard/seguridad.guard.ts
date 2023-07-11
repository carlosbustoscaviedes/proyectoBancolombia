import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

/*----conectar servicio----*/
import { ServizService } from '../servicios/serviz.service';

/*---usar ruta---*/
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})



export class SeguridadGuard implements CanActivate {

  constructor( private usarRuta:Router,  private conectarServicio: ServizService ){ }

  canActivate() {
     
    if( this.conectarServicio.validarToken() ){
      
      return true;

    }else{
      
      this.usarRuta.navigate( [ 'clienteLogin' ] )
      return false;
    
    }
   
  }
  
}
