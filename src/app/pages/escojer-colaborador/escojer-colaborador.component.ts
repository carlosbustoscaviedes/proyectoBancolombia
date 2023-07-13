import { Component, OnInit } from '@angular/core';

/*------------conectar servicios------------*/
import { ServizService } from 'src/app/servicios/serviz.service';

/*---------recibir parametro--------*/
import { ActivatedRoute, Router } from '@angular/router';

/*--usar formularios----*/
import { FormGroup,  FormBuilder, Validators } from '@angular/forms'

import Swal from 'sweetalert2'


@Component({
  selector: 'app-escojer-colaborador',
  templateUrl: './escojer-colaborador.component.html',
  styleUrls: ['./escojer-colaborador.component.scss']
})


export class EscojerColaboradorComponent implements OnInit {
  

  valueSelect:any;
  tipoDeServicios:any = [];
  tipoServicio:string = "Limpieza en el hogar";

  /*------detalle servicios----*/
  nombrePersona:any;
  domicilios:any;
  servicio1:any;
  tarifa1:any;
  servicio2:any;
  tarifa2:any;
  servicio3:any;
  tarifa3:any;
  servicio4:any;
  tarifa4:any;
  correo:any 


  busquedaColaboradores:any = []

  mensajeNoColaboradores:boolean = false;

  contratarServicio:FormGroup;




  predenPantallaServicio = false;


  /*--------valores check------------*/
      Vservicio1:any;   
      Vtarifa1:any = 0;     
      Vservicio2:any;   
      Vtarifa2:any = 0;    
      Vservicio3: any;  
      Vtarifa3:any = 0; 
      Vservicio4: any;  
      Vtarifa4:any = 0;      
      
      /*--ng model--*/
      direccion:any = ""
      fecha:any     = ""
      hora:any      = ""
      email:any     = ""

      
      valorTotal:any = 0;
      
      num:any = 0;
      num2:any = 0;
      num3:any = 0;
      num4:any = 0;

      guardarCorreoSolicitante:any;
      nombreCliente:any
      

      verPerfilCompleto:boolean = false

      cargarComentarios:any  

  constructor(private usarRuta:Router, private recibirParametro: ActivatedRoute, private fb: FormBuilder, private conectarServicios: ServizService ){

    this.contratarServicio = this.fb.group({
      
      servicio1:   this.Vservicio1,
      tarifa1a:    this.Vtarifa1,
      servicio2:   this.Vservicio2,
      tarifa2:     this.Vtarifa2,
      servicio3:   this.Vservicio3,
      tarifa3:     this.Vtarifa3,
      servicio4:   this.Vservicio4,
      tarifa4:     this.Vtarifa4,
      direccion:   "",
      fecha    :   "",
      hora     :   ""

    })

 }


 total(){

    this.valorTotal = parseInt(this.Vtarifa1) + parseInt(this.Vtarifa2) + parseInt(this.Vtarifa3) + parseInt(this.Vtarifa4);
  }
 

 check1(nombre:any, valor:any){
      
    
  
    if(this.num == 0){
      this.Vservicio1 = nombre; 
      this.Vtarifa1 = valor;
      this.num=1
    }else{
      this.num=0
      this.Vservicio1 = "no solicito servicio"; 
      this.Vtarifa1 = 0;
    }

    this.total()
    

 }

 check2(nombre:any, valor:any){
    

    if(this.num2 == 0){
      this.Vservicio2 = nombre;
      this.Vtarifa2 = valor;
      this.num2=1
    }else{
      this.num2=0
      this.Vservicio2 = "no solicito servicio";
      this.Vtarifa2 = 0;
    }

    this.total()
 }

 check3(nombre:any, valor:any){
    
    

    if(this.num3 == 0){
      this.Vservicio3 = nombre;
      this.Vtarifa3 = valor;
      this.num3=1
    }else{
      this.num3=0
      this.Vservicio3 = "no solicito servicio";
      this.Vtarifa3 = 0;
    }

    this.total()

 }

 check4(nombre:any, valor:any){
    

    if(this.num4 == 0){

      this.Vtarifa4 = valor;
      this.Vservicio4 = nombre; 
      this.num4=1

    }else{

      this.num4=0
      this.Vservicio4 = "no solicito servicio"; 
      this.Vtarifa4 = 0;

    }

    this.total()
    

 }


  ngOnInit(): void {
      
    /*---traer nombre de cliente---*/
    if( localStorage.getItem('nombre') ){

      this.nombreCliente = localStorage.getItem('nombre');
    }



    /*---traer email---*/
    if( localStorage.getItem('correo') ){
          
      this.guardarCorreoSolicitante = localStorage.getItem('correo');
    }


    this.tipoDeServicios = this.conectarServicios.getServicios();
    

    /*------traer colaboradores aleatorio desde el home---*/
    this.recibirParametro.params.subscribe( resp => {
      
      //console.log(resp['id'])

      this.conectarServicios.buscarColaboradores( resp['id'] )
      .subscribe( resp => {
      
        console.log(resp);

        if( resp.length == 0 ){
          
          /*----mostrar mensaje---*/
          this.mensajeNoColaboradores = true;
          
        }else{

          this.mensajeNoColaboradores = false;
        }


        this.busquedaColaboradores = resp;
      
      })

    })
  
  }



  /*---cambiar nombre----*/
  cambiar(valor:any){
      
    /*--
      let titulo = this.tipoDeServicios[valor].servicio
      this.tipoServicio = titulo;
      --*/
      console.log(valor);

      this.conectarServicios.buscarColaboradores(valor)
          .subscribe( resp => {
          
            console.log(resp);

            if( resp.length == 0 ){
          
              /*----mostrar mensaje---*/
              this.mensajeNoColaboradores = true;
              
            }else{
    
              this.mensajeNoColaboradores = false;
            }
        
            
            
            this.busquedaColaboradores = resp;
          
      })
  
  }



  /*----------ver servicios-------*/
  verServicios(valor:number){

    this.predenPantallaServicio = true;
      
    console.log( this.busquedaColaboradores[valor] );
    
    this.nombrePersona = this.busquedaColaboradores[valor].nombre
    this.domicilios    = this.busquedaColaboradores[valor].ciudad
    this.servicio1     = this.busquedaColaboradores[valor].servicio1
    this.tarifa1       = this.busquedaColaboradores[valor].tarifa1
    this.servicio2     = this.busquedaColaboradores[valor].servicio2
    this.tarifa2       = this.busquedaColaboradores[valor].tarifa2
    this.servicio3     = this.busquedaColaboradores[valor].servicio3
    this.tarifa3       = this.busquedaColaboradores[valor].tarifa3
    this.servicio4     = this.busquedaColaboradores[valor].servicio4
    this.tarifa4       = this.busquedaColaboradores[valor].tarifa4
    this.correo        = this.busquedaColaboradores[valor].correo
     
  }



  /*------agendar servicio----*/
  agendarServicio( ){
    
    console.log( this.contratarServicio);
    console.log(this.valorTotal);
  
  
    this.contratarServicio = this.fb.group({
      
      servicio1:   this.Vservicio1,
      tarifa1a:    this.Vtarifa1,
      servicio2:   this.Vservicio2,
      tarifa2:     this.Vtarifa2,
      servicio3:   this.Vservicio3,
      tarifa3:     this.Vtarifa3,
      servicio4:   this.Vservicio4,
      tarifa4:     this.Vtarifa4,
      direccion:   this.direccion,
      fecha    :   this.fecha,
      hora     :   this.hora,
      emailColaborador    :   this.correo,
      correoSolictante : this.guardarCorreoSolicitante,
      nombrePersona :  this.nombrePersona,
      nombreCliente : this.nombreCliente 
  
      

    })

    

    
    if( localStorage.getItem('Token') ){
          
             /*--alert---*/
          Swal.fire({
            title: 'Desea agendar servicio?',
            text: "Su agendamiento sera enviado a " + this.nombrePersona,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, agendar servicio!'
          }).then((result) => {
            if (result.isConfirmed) {
      
              /*----enviar datos---*/
              console.log(this.contratarServicio.value);

              this.conectarServicios.agendarServicio(this.contratarServicio.value)
                  .subscribe( (resp:any) => {
                    console.log(resp);

                    /*-----alerta-----*/
                    Swal.fire(
                      '¡Su agendamiento se ha enviado con exito a ' + this.nombrePersona,
                      'Espere la confirmacion del colaborador ',
                      'success'
                    )
      
                    this.usarRuta.navigate(['/home']);
                  
                  }, (err => {

                    console.log(err)
                 
                  }))
              
            }
      
        })
    }else{

      Swal.fire({
        title: 'Para Agendar Debes iniciar sesion',
        text: "¿no estas registrado?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ir a registrarme'
      }).then((result) => {
        if (result.isConfirmed) {
               
          this.usarRuta.navigate([ 'clienteRegistro' ])

        }
      })

    }
    
   

  }




  verPerfil( position:any){
    
    this.verPerfilCompleto = true;

    this.nombrePersona = this.busquedaColaboradores[position].nombre
    this.domicilios    = this.busquedaColaboradores[position].ciudad
    this.correo        = this.busquedaColaboradores[position].correo


    this.conectarServicios.cargarCalificaciones(this.busquedaColaboradores[position].correo)
        .subscribe(resp => {

          console.log(resp)
          this.cargarComentarios = resp;
        
        })
    

    

  }


  cerrar(){
    this.verPerfilCompleto = false;
  }

}
