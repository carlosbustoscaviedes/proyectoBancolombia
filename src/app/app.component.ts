import { Component, OnInit } from '@angular/core';

/*--conectar servicio------*/
import { ServizService } from './servicios/serviz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pruebaCarlosBustos';
  
  constructor(private conectarServicios:ServizService ){}

  ngOnInit(): void {
    
      /*----llamar script----*/
      this.conectarServicios.cargaJS(['funcion']);

  }
}
