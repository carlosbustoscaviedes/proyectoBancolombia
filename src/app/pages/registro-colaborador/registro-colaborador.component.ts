import { Component, OnInit } from '@angular/core';

/*---formulario reactivo---*/
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/*-----conectar servicios-----*/
import { ServizService } from 'src/app/servicios/serviz.service';

import Swal from 'sweetalert2'



@Component({
  selector: 'app-registro-colaborador',
  templateUrl: './registro-colaborador.component.html',
  styleUrls: ['./registro-colaborador.component.scss']
})
export class RegistroColaboradorComponent implements OnInit {
  
  tipoDeServicios:any = [];
  ciudadesColombia:any = [];
  registroColaborador:FormGroup;

  constructor(private conectarServicios:ServizService,  private fb:FormBuilder ){
  
    this.registroColaborador = this.fb.group({
      
      nombre         : ["",  [ Validators.required, Validators.minLength(10)] ],
      correo         : ["", [ Validators.required,  Validators.minLength(13) ] ],
      ciudad         : ["", Validators.required ],
      pass           : ["", Validators.required],
      pass2          : ["", Validators.required],
      Tiposervicio   : ["", Validators.required],
      servicio1      : ["", [ Validators.required,  Validators.minLength(6) ] ],
      tarifa1        : ["", [ Validators.required,  Validators.minLength(4) ] ],
      servicio2      : ["", [ Validators.required,  Validators.minLength(6) ] ],
      tarifa2        : ["", [ Validators.required,  Validators.minLength(4) ] ],
      servicio3      : ["", [ Validators.required,  Validators.minLength(6) ] ],
      tarifa3        : ["", [ Validators.required,  Validators.minLength(4) ] ],
      servicio4      : ["", [ Validators.required,  Validators.minLength(6) ] ],
      tarifa4        : ["", [ Validators.required,  Validators.minLength(4) ] ],

    })

  }
  

  get validarNombre(){
    
    return this.registroColaborador.controls['nombre'].invalid  &&  this.registroColaborador.controls['nombre'].touched
  }

  get validarCorreo(){
    
    return this.registroColaborador.controls['correo'].invalid  &&  this.registroColaborador.controls['correo'].touched
  }

  get validarCiudad(){
    
    return this.registroColaborador.controls['ciudad'].invalid  &&  this.registroColaborador.controls['ciudad'].touched
  }

  get validarPass(){
    
    return this.registroColaborador.controls['pass'].invalid  &&  this.registroColaborador.controls['pass'].touched
  }
  

  get validarPass2(){
      
    let valor1 = this.registroColaborador.controls['pass'].value;
    let valor2 = this.registroColaborador.controls['pass2'].value;

      if( valor1 == valor2 ){

        return false;

      }else{

        return true;
      }

  }


  get validarTiposervicio(){

    return this.registroColaborador.controls['Tiposervicio'].invalid  &&  this.registroColaborador.controls['Tiposervicio'].touched
  }

  get validarServicio1(){
    return this.registroColaborador.controls['servicio1'].invalid  &&  this.registroColaborador.controls['servicio1'].touched
  }

  get validarServicio2(){
    return this.registroColaborador.controls['servicio2'].invalid  &&  this.registroColaborador.controls['servicio2'].touched
  }

  get validarServicio3(){
    return this.registroColaborador.controls['servicio3'].invalid  &&  this.registroColaborador.controls['servicio3'].touched
  }

  get validarServicio4(){
    return this.registroColaborador.controls['servicio4'].invalid  &&  this.registroColaborador.controls['servicio4'].touched
  }

  get Tarifa1(){
    return this.registroColaborador.controls['tarifa1'].invalid  &&  this.registroColaborador.controls['tarifa1'].touched
  }

  get Tarifa2(){
    return this.registroColaborador.controls['tarifa2'].invalid  &&  this.registroColaborador.controls['tarifa2'].touched
  }

  get Tarifa3(){
    return this.registroColaborador.controls['tarifa3'].invalid  &&  this.registroColaborador.controls['tarifa3'].touched
  }

  get Tarifa4(){
    return this.registroColaborador.controls['tarifa4'].invalid  &&  this.registroColaborador.controls['tarifa4'].touched
  }





  

  ngOnInit(): void {
    
    /*----traer tipo de servicios----*/
    this.tipoDeServicios = this.conectarServicios.getServicios();


    /*----traer cidades de colombia----*/
    this.conectarServicios.cuidad()
        .subscribe( resp => {
          console.log(resp);
          this.ciudadesColombia = resp;
        
        })
  }


  registrarColaborador(){

   console.log(this.registroColaborador);

   if( this.registroColaborador.invalid ){
      Object.values( this.registroColaborador.controls ).forEach( campos => {
        
        campos.markAsTouched();
  
      })
   
    }else{

      /*---enviar infroamcion---*/
      this.conectarServicios.registrarColaborador( this.registroColaborador )
          .subscribe( resp => {
            console.log( resp );
            

            Swal.fire(
              'se ha resgitrado correctamente',
              
              'success'
            )

          
            this.registroColaborador.reset()
            

          }, (err => {
                console.log(err);
          }) )
    
    }
  
  }

}
