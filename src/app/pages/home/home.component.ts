/*---llamar scrip-- https://mamasoyjuanito.dev/article/como-cargar-un-script-desde-un-componente-en-angular---*/

import { Component, OnInit } from '@angular/core';

/*-----importar servicios-------*/
import { ServizService } from 'src/app/servicios/serviz.service';

/*-----usar router-----*/
import { Router } from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  
  serviciosAseo:any = []

  constructor( private usarRuta: Router,  private conectarServicios:ServizService ){

  }

  ngOnInit(): void {
  
      /*---traemos servicios de aseo---*/
      this.serviciosAseo = this.conectarServicios.getServicios()
      console.log(this.serviciosAseo);
        
  }






  /*-----selecconar usuario-----*/
  agendarServicio(parametro:any){
      
    this.usarRuta.navigate(['escojerColaborador', parametro])
  }



}
