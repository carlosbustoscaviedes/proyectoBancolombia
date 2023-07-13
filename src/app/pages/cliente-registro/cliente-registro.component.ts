import { Component, OnInit } from '@angular/core';

/*---formulario reactivo---*/
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/*----------conectar servicios-----------*/
import { ServizService } from 'src/app/servicios/serviz.service';

import { Router } from '@angular/router';


import Swal from 'sweetalert2'


@Component({
  selector: 'app-cliente-registro',
  templateUrl: './cliente-registro.component.html',
  styleUrls: ['./cliente-registro.component.scss']
})



export class ClienteRegistroComponent implements OnInit {
  
  registroCliente:FormGroup;

  constructor(private usarRuta: Router, private conectarServicios:ServizService,  private fb:FormBuilder){
    
    this.registroCliente = this.fb.group({
      
      nombre     : ["",  [ Validators.required, Validators.minLength(10)] ],
      telefono   : ["", [ Validators.required, Validators.min(1044444444)] ],
      correo     : ["", [ Validators.required, Validators.minLength(13) ] ],
      pass       : ["", Validators.required],
      pass2      : ["", Validators.required]

    })

  }

  ngOnInit(): void {
    
  }


  get validarNombre(){
    
    return this.registroCliente.controls['nombre'].invalid  &&  this.registroCliente.controls['nombre'].touched
  }

  get validarTelefono(){
    
    return this.registroCliente.controls['telefono'].invalid  &&  this.registroCliente.controls['telefono'].touched
  }

  get validarCorreo(){
    
    return this.registroCliente.controls['correo'].invalid  &&  this.registroCliente.controls['correo'].touched

  }

  get validarPass(){
    
    return this.registroCliente.controls['pass'].invalid  &&  this.registroCliente.controls['pass'].touched
  }


  get validarPass2(){
      
    let valor1 = this.registroCliente.controls['pass'].value;
    let valor2 = this.registroCliente.controls['pass2'].value;

      if( valor1 == valor2 ){

        return false;

      }else{

        return true;
      }

  }




  enviarRegistroCliente(){
    
    if( this.registroCliente.invalid ){
    
      Object.values(  this.registroCliente.controls ).forEach( resp =>{
            
        resp.markAsTouched()
      
      })

    }else{
      
      console.log( this.registroCliente)
      /*---enviar registro---*/
      this.conectarServicios.registrarCliente( this.registroCliente )
          .subscribe( resp => {
  
            Swal.fire(
              '!Se ha registrado correctamente!',
              '¡ya puede ingresar por el login!',
              'success'
            )
            this.registroCliente.reset();

            this.usarRuta.navigate(['home']);

            console.log(resp)

          }, ( err => {

            console.log(err.error.error.message)

            if(err.error.error.message == "EMAIL_EXISTS"){
              
              Swal.fire({
                icon: 'error',
                title: 'El correo ya existe por favor cambielo',
              
              })

            }

            if(err.error.error.message == "WEAK_PASSWORD"){

              Swal.fire({
                icon: 'error',
                title: 'la contraseña debe tener mas de 6 caracteres',
              
              })

            }

            if(err.error.error.message == "INVALID_EMAIL"){
              
              Swal.fire({
                icon: 'error',
                title: 'el email no es valido',
              
              })
             
            }

            
          }))

    }

  }
}
