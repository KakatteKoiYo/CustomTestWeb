import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { DatosService, IListaPalabras } from 'src/app/datos.service';
import { CountdownConfig, CountdownEvent, CountdownComponent } from 'ngx-countdown';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-start-test',
  templateUrl: './start-test.component.html',
  styleUrls: ['./start-test.component.css',],
  animations : [
    trigger('mostrarDetalles', [
      transition(':enter', [
        style({ width: "0px", overflow: "hidden" }),
        animate('300ms', style({ width: "100px" })),
      ]),
    ]),
  ]
})
export class StartTestComponent implements OnInit {
  @ViewChild('respuesta') input? : ElementRef;
  @ViewChild('cd', { static: false }) private countdown?: CountdownComponent;
  
  

  lista! : IListaPalabras[];
  opcionesManual : boolean = false;
  timeNotify : boolean = false;
  pistas : boolean = true;
  pruebaFinalizada = false;
  contadorPregunta : number = 1;
  cantidadPregunta : number = 10;
  preguntaTipo : number = 0;
  preguntaTipoTemp? : number;
  respuestaTipo : number = 0;
  lugarRespuesta? : number;
  ignorar : number = 1;
  pregunta : string = "";
  respuesta : string = "";
  preguntaArray : string[] = [];
  respuestaArray : string[] = [];
  respuestaUsuarioArray : string[] = [];
  inputRespuesta : string = "";
  arrayResultado : number[] = [];
  arrayResultado2 : number[] = [];
  arrayResultadoTotal: number[] = [];
  pistaLongitud : number = -1;
  pistaPalabras : number = -1;
  pistaPrimerLetra : string = "";
  resultadoBuenas : number = 0;
  show? : number;
  preguntaSel? : string;
  respuestaSel? : string;
  respuestaUsuarioSel? : string;
  resultadoSel? : number;
  opciones : string[] = [];
  tiempo : number = 0;
 

  constructor(private activate : ActivatedRoute, private datos: DatosService) { }


  handleEvent(evento : CountdownEvent){
    console.log(evento.action)
    if(evento.action == "done"){
      if(this.respuestaTipo == 0){
        this.siguientePregunta(-1);

      }else if(this,this.respuestaTipo == 1){
        this.siguientePreguntaE("N/A");

      }
       
    }
    if(evento.action == "notify"){
      

      this.timeNotify = true;
      
   }
    
  }

  mostrarCorrecta(resultado : number, pregunta : string, respuesta : string, respuestaUsuario : string){
    this.preguntaSel = pregunta;
    this.respuestaSel = respuesta;
    this.respuestaUsuarioSel = respuestaUsuario;
    this.resultadoSel = resultado;
    
    if(resultado == 1){
      
    }else{

    }
    
    
  }

  openSideNav(){
    this.datos.openSideNav();
  }

  getPista(){

    this.input?.nativeElement.focus();

    if(this.pistaPrimerLetra == ""){
      this.pistaPrimerLetra = this.respuesta[0]
    }else if(this.pistaLongitud == -1){
      this.pistaLongitud = this.respuesta.length
    }else{
      this.pistaPalabras = this.respuesta.trim().split(" ").length
      this.pistas = false;
    }
    
  }

  preguntaRespuestasGen(){
    let numeroPregunta = Math.floor(Math.random() * this.lista.length);
    this.lugarRespuesta = Math.floor(Math.random() * 5);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    let listaNumerosUsados : number[] = [numeroPregunta];

    if(this.preguntaTipo == 0){
      this.preguntaTipoTemp = Math.floor(Math.random() * 2);
      this.pregunta = this.preguntaTipoTemp == 0 ? this.lista[numeroPregunta].palabra1 : this.lista[numeroPregunta].palabra2;
      this.respuesta = this.preguntaTipoTemp == 0 ? this.lista[numeroPregunta].palabra2 : this.lista[numeroPregunta].palabra1;
    }  
    if(this.preguntaTipo == 1){
      this.pregunta = this.lista[numeroPregunta].palabra1
      this.respuesta = this.lista[numeroPregunta].palabra2
      this.preguntaTipoTemp = 0;
    }
    if(this.preguntaTipo == 2){
      this.pregunta = this.lista[numeroPregunta].palabra2
      this.respuesta = this.lista[numeroPregunta].palabra1
      this.preguntaTipoTemp = 1;
    }
    
    
    for (let i = 0; i < 5; i++) {
      if(i == this.lugarRespuesta){
        this.opciones[i] = this.preguntaTipoTemp == 0 ? this.lista[numeroPregunta].palabra2 : this.lista[numeroPregunta].palabra1
      }
      else{
        while(1){
          let numeroRespuesta = Math.floor(Math.random() * this.lista.length);
  
          if (!(listaNumerosUsados.includes(numeroRespuesta))){
            this.opciones[i] = this.preguntaTipoTemp == 0 ? this.lista[numeroRespuesta].palabra2 : this.lista[numeroRespuesta].palabra1
            listaNumerosUsados.push(numeroRespuesta);
            break;
          }
        }
      }
      

    }
    console.log(this.opciones)
    console.log(listaNumerosUsados)
    
  }


  siguientePregunta(opcionRespuesta : number){
    this.countdown?.restart();
    this.timeNotify = false;
    this.preguntaArray.push(this.pregunta);
    this.respuestaArray.push(this.respuesta);
    if(opcionRespuesta == -1){
      this.respuestaUsuarioArray.push("N/A");
    }else{
      this.respuestaUsuarioArray.push(this.opciones[opcionRespuesta]);
    }
    if(this.lugarRespuesta == opcionRespuesta){
      this.resultadoBuenas += 1
      if(this.arrayResultado.length < 15){
        this.arrayResultado.push(1);
      }else{
        this.arrayResultado2.push(1);
      }
      this.arrayResultadoTotal.push(1);
        
    }else{
      if(this.arrayResultado.length < 15){
        this.arrayResultado.push(0);
      }else{
        this.arrayResultado2.push(0);
      }
      this.arrayResultadoTotal.push(0);
    }

    if(this.contadorPregunta == this.cantidadPregunta){
      this.pruebaFinalizada = true;
    }
    else{
      this.contadorPregunta += 1
      this.preguntaRespuestasGen();
    }
  }

  siguientePreguntaE(valor : string){
    //Reinicio de valores
    this.countdown?.restart();
    this.timeNotify = false;
    this.pistas = true;

    this.inputRespuesta = "";
    this.pistaPrimerLetra = "";
    this.pistaLongitud = -1;
    this.pistaPalabras = -1;
  
    this.preguntaArray.push(this.pregunta)
    this.respuestaArray.push(this.respuesta)
    this.respuestaUsuarioArray.push(valor)

    if(this.ignorar == 1){
      valor = valor.toLowerCase().replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("u", "ú").replace("ñ", "n");
      this.respuesta = this.respuesta.toLowerCase().replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("u", "ú").replace("ñ", "n");
    }

    
    
    if(valor == this.respuesta){
      this.resultadoBuenas += 1;
      if(this.arrayResultado.length < 15){
        this.arrayResultado.push(1);
      }else{
        this.arrayResultado2.push(1);
      }
      this.arrayResultadoTotal.push(1);
        
    }else{
      if(this.arrayResultado.length < 15){
        this.arrayResultado.push(0);
      }else{
        this.arrayResultado2.push(0);
      }
      this.arrayResultadoTotal.push(0);
    }
    if(this.contadorPregunta == this.cantidadPregunta){
      this.pruebaFinalizada = true;
    }
    else{
      this.contadorPregunta += 1;
      this.preguntaRespuestasGen();
    }
  }
  

  ngOnInit(): void {
    this.activate.queryParams
      .subscribe(params => {
        console.log(params); 
        if(params['cantidadPregunta'] != undefined){
          if(params['cantidadPregunta'] == 0){
            this.cantidadPregunta = 10;
          }else if(params['cantidadPregunta'] == 1){
            this.cantidadPregunta = 20;
          }else if(params['cantidadPregunta'] == 2){
            this.cantidadPregunta = 30;
          }else{
            this.cantidadPregunta = params['cantidadPregunta'];
            this.opcionesManual = true;
          }
            
        }

        if(params['preguntaTipo'] != undefined){
          if(params['preguntaTipo'] == 0 || params['preguntaTipo'] == 1 || params['preguntaTipo'] == 2){
            this.preguntaTipo = params['preguntaTipo'];
          }else{
            this.preguntaTipo = 0;
            this.opcionesManual = true;
          }
          
        }
        if(params['respuestaTipo'] != undefined){
          if(params['respuestaTipo'] == 0 || params['respuestaTipo'] == 1 ){
            this.respuestaTipo = params['respuestaTipo'];
          }else{
            this.respuestaTipo = 0;
            this.opcionesManual = true;
          }
          
        }
        if(params['ignorar'] != undefined){
          if(params['ignorar'] == 0 || params['ignorar'] == 1 ){
            this.ignorar = params['ignorar'];
          }else{
            this.ignorar = 1;
            this.opcionesManual = true;
          }
        }
        if(params['tiempo'] != undefined){

          if(params['tiempo'] == 1){
            this.tiempo = 10;
          }else if(params['tiempo'] == 2){
            this.tiempo = 5;
          }else{
            this.tiempo = params['tiempo'];
            this.opcionesManual = true;
          }
            
        }
    this.datos.closeSideNav();
    if(!this.opcionesManual){
      this.datos.updateFakeCookie([params['cantidadPregunta'], params['preguntaTipo'], params['respuestaTipo'], params['ignorar'], params['tiempo']])
    }

      });
    this.lista = this.datos.listaPalabras!;
    
    this.preguntaRespuestasGen();
  }

}

