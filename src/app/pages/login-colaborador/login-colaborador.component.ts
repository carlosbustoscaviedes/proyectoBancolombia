import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


/*----conectar servicios----*/
import { ServizService } from 'src/app/servicios/serviz.service';

/*--usar ruta--*/
import { Router } from '@angular/router';


import Swal from 'sweetalert2'


@Component({
  selector: 'app-login-colaborador',
  templateUrl: './login-colaborador.component.html',
  styleUrls: ['./login-colaborador.component.scss']
})


export class LoginColaboradorComponent {

  loginColaborador:FormGroup;

  correo:any
  clave:any

  constructor(private usarRuta:Router, private fb:FormBuilder, private conectarServicios:ServizService ){
    
    this.loginColaborador = this.fb.group({
  
      correo: [ "", Validators.required ],
      pass:   [ "", Validators.required ]
    
    })

  }


  get validarCorreo(){  
    return this.loginColaborador.controls['correo'].invalid && this.loginColaborador.controls['correo'].touched
  
  }

  get validarPass(){
    return this.loginColaborador.controls['pass'].invalid && this.loginColaborador.controls['pass'].touched
  
  }


  ingresarLogin(){

    if(this.loginColaborador.invalid){
        
      Object.values( this.loginColaborador.controls ).forEach( resp =>{
        
        resp.markAsTouched();

      } )

    }else{
          
      this.correo = this.loginColaborador.controls['correo'].value
      this.clave  = this.loginColaborador.controls['pass'].value

      this.conectarServicios.loginColaborador( this.loginColaborador )
          .subscribe( (resp:any) => {
            
            this.usarRuta.navigate(['/pantallaColaborador'])
            setTimeout(function(){
              window.location.reload()
            }, 200);
            
          
          }, (( err:any) => {
            
               
            Swal.fire({
              icon: 'error',
              title: 'el correo no es correcto',

            })

            
            
          }))
    }

  }

  

  ngOnInit(): void {
    
  }
}

