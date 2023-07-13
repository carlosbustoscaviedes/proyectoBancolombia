import { Component, OnInit } from '@angular/core';

import { ServizService } from 'src/app/servicios/serviz.service';

/*---usar router---*/
import { Router } from '@angular/router';

import Swal from 'sweetalert2'




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {

  key:any;

  menuInicio   = true;
  textregistro = true;


  registro = false;
  login = false;
  
  baseTrabajos = false;
  baseNotificacions = false;
  baseUsuario = false;

  baseMensajes = false;
  baseColaborador = false;
  baseCalificar = false;
  
  nombreLogueado:any =  "" 
  
  
  correoCliente:any

  mensajeDeColaborador:any
  mensajeServicioTerminado:any
  circuloNotificar:boolean = false;
  circuloTerminados:boolean = false;

  correoColaborador:any
  mensajeDeColaboradorCliente:any
  

  /*-----calificacion----*/
  nombreCalificado:any;    
  emailCalificado:any  
  correoQuienCalifica:any 
  nombreQuienCalifica:any 
  
  calificacion:any;
  
  mensajeTXT:any;

  formularioCalfica:any;

  constructor(private usarRuta:Router,  private conectarServicios: ServizService){
  }


  ngOnInit(): void {
    
  
    /*--token--*/
    if( localStorage.getItem('Token') ){
        
      this.textregistro = false;

      this.baseUsuario = true;
      this.baseTrabajos = true;
      this.baseNotificacions = true;

      this.menuInicio   = false;
     

      /*------cargar Notificaciones------*/
      this.correoCliente = localStorage.getItem('correo');
      this.conectarServicios.cargarNotificaciones( this.correoCliente )
              .subscribe( resp => {
                console.log(resp);

                   this.mensajeDeColaborador = resp;
                   if(resp.length > 0){
                      
                    this.circuloNotificar = true;

                   }

              })


      /*---------cargar Trabajos terminados----------*/
      this.conectarServicios.cargarTerminados( this.correoCliente )
            .subscribe( resp => {
              console.log(resp);

              this.mensajeServicioTerminado = resp
    
     

              if(resp.length > 0){
                
                this.circuloTerminados = true;
              
              } 

            })

      

    }


    /*--correo--*/
    if( localStorage.getItem('correo') ){
      

      this.textregistro = false;
      this.baseUsuario = true;
      this.menuInicio   = false;
      this.baseNotificacions = true;


      /*-----cargar notificacion pagos---*/
      this.conectarServicios.cargarPagos( localStorage.getItem('correo') )
          .subscribe( resp => {
            this.circuloNotificar = true;
            console.log(resp);
            this.mensajeDeColaboradorCliente = resp;
          })
     
    }

    /*---nombre--*/
    if( localStorage.getItem('nombre') ){
        
      this.nombreLogueado = localStorage.getItem('nombre');
    }

    
  }
  

  preder1(){
    
    this.login = false;

    if(this.registro){

      this.registro = false;

    }else{

      this.registro = true;
    }
  }

  preder2(){

    this.registro = false;

    if(this.login){

      this.login = false;

    }else{

      this.login = true;
     
    }
  }



  cerrarSesion(){

    this.conectarServicios.destruirTokenYnombre();
    this.usarRuta.navigate(['/clienteLogin'])
    
    this.menuInicio   = true;
    this.textregistro = true;
  
  
    this.registro = false;
    this.login = false;
    
    this.baseTrabajos = false;
    this.baseNotificacions = false;
    this.baseUsuario = false;
  
    this.baseMensajes = false;
    this.baseColaborador = false;
  }


  contratados(){
    
    this.circuloTerminados = false
    this.baseMensajes = false;


    if(this.baseColaborador){

      this.baseColaborador = false;

    }else{

      this.baseColaborador = true;
    
    }

  }


  notificaciones(){
  
    this.baseCalificar = false;
    this.circuloNotificar = false;
    this.baseColaborador = false;

    

    if(this.baseMensajes){

      this.baseMensajes = false;

    }else{

      this.baseMensajes = true;
    
    }
  }


  pagar( indice:any ){
      
    const detallePago = {
      
      nombrePagador      : this.nombreLogueado,
      correoPagador      : this.correoCliente,
      emailAlQueLePagan  : this.mensajeServicioTerminado[indice].emailQuienMandaNotificacion,
      estado: "pagado"

    }
    
    console.log(detallePago)
    this.conectarServicios.registrarPago(detallePago)
          .subscribe( resp => {

            //alert("el pago se ha registrado correctamente");
            
            this.borrarTerminadosCuandoPaga(   this.mensajeServicioTerminado[indice].id  );
             
            Swal.fire(
              '¡Muy Bien!',
              '!su pago se ha realizado con exito!',
              'success'
            )
            
            
          })

  }



  borrarTerminadosCuandoPaga( id:any ){
      
    this.conectarServicios.borrarTerminados( id )    
        .subscribe( resp => {  
          console.log(resp)

          /*---cargar pagina---*/
          setTimeout(function(){
            window.location.reload()
          }, 200);
           /*---cargar pagina---*/

        })

  }





  calificar( Vindice:any ){
      
    this.baseColaborador = false;
    this.baseCalificar = true;
    
 
    this.nombreCalificado    =  this.mensajeServicioTerminado[Vindice].nombreQuienMandaNotificacion ,  
    this.emailCalificado     =  this.mensajeServicioTerminado[Vindice].emailQuienMandaNotificacion,
    this.correoQuienCalifica =  this.mensajeServicioTerminado[Vindice].correoCliente, 
    this.nombreQuienCalifica =  this.mensajeServicioTerminado[Vindice].nombreCliente

  }

  cerrar(){
    this.baseCalificar = false;
    this.baseColaborador = false;
    this.baseMensajes = false;
  }

  
  /*------calificar mensaje-------*/
  radioBotton(valor:any){
      
    this.calificacion = valor;

  }

  /*------------------------*/
  enviarCalificacion(){

    let datosCalificacion = {

      nombreCalif :      this.nombreCalificado,
      emailCalif  :      this.emailCalificado,
      correoQuienCal :   this.correoQuienCalifica,
      nombreQuienCalif : this.nombreQuienCalifica,
      calificacion : this.calificacion,
      mensaje: this.mensajeTXT

    }
    console.log(datosCalificacion);
  
    this.baseCalificar = false;

    /*---------conectar servicio-----------*/
    this.conectarServicios.RegistrarCalificacionColaborador( datosCalificacion )
        .subscribe( resp => {
          console.log(resp);
          Swal.fire(
            '¡La calificacion de ha neviado correctamente!',
            '¡podras leerla en el perfil d ela personas!',
            'success'
          )
        })
    
    
  }


  cerrarR(){
  
    this.registro = false;
  }

  cerrarL(){
  
    this.login = false;
  }

  

}
