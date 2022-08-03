import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { DatosService, IListaPalabras } from 'src/app/datos.service';
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
  lista! : IListaPalabras[];

  
  pruebaFinalizada = false;
  contadorPregunta : number = 1;
  cantidadPregunta : number = 10;
  preguntaTipo : number = 0;
  preguntaTipoTemp? : number;
  respuestaTipo : number = 0;
  lugarRespuesta? : number;
  pregunta : string = "";
  respuesta : string = "";
  preguntaArray : string[] = [];
  respuestaArray : string[] = [];
  respuestaUsuarioArray : string[] = [];
  inputRespuesta : string = "";
  arrayResultado : number[] = [];
  arrayResultado2 : number[] = [];
  pistaLongitud : number = -1;
  pistaEspacios : number = -1;
  pistaPrimerLetra : string = "";
  resultadoBuenas : number = 0;
  show? : number;
  opciones : string[] = [];
 

  constructor(private activate : ActivatedRoute, private datos: DatosService) { }

  openSideNav(){
    this.datos.openSideNav();
  }

  getPista(){
    if(this.pistaPrimerLetra == ""){
      this.pistaPrimerLetra = this.respuesta[0]
    }else if(this.pistaLongitud == -1){
      this.pistaLongitud = this.respuesta.length
    }else{
      this.pistaEspacios = 1000
    }
    
    console.log(this.pistaPrimerLetra)
    console.log(this.pistaLongitud)
    console.log(this.pistaEspacios)
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
    this.preguntaArray.push(this.pregunta)
    this.respuestaArray.push(this.respuesta)
    this.respuestaUsuarioArray.push(this.opciones[opcionRespuesta])
    if(this.lugarRespuesta == opcionRespuesta){
      this.resultadoBuenas += 1
      if(this.arrayResultado.length < 15){
        this.arrayResultado.push(1)
      }else{
        this.arrayResultado2.push(1)
      }
        
    }else{
      if(this.arrayResultado.length < 15){
        this.arrayResultado.push(0)
      }else{
        this.arrayResultado2.push(0)
      }
    }

    if(this.contadorPregunta == this.cantidadPregunta){
      this.pruebaFinalizada = true;
    }
    else{
      this.contadorPregunta += 1
      this.preguntaRespuestasGen()
    }
  }

  siguientePreguntaE(valor : string){
    this.inputRespuesta = "";
    this.pistaPrimerLetra = "";
    this.pistaLongitud = -1;
    this.pistaEspacios = -1;
    console.log("Pregunta: " + this.pregunta)
    console.log("Respuesta: " + this.respuesta)
    console.log("Valor: " + valor)
    if(valor == this.respuesta){
      console.log("Correcto!")
      this.resultadoBuenas += 1
    }else{
      console.log("Incorrecto!")
    }
    if(this.contadorPregunta == this.cantidadPregunta){
      this.pruebaFinalizada = true;
    }
    else{
      this.contadorPregunta += 1
      this.preguntaRespuestasGen()
    }
  }

  ngOnInit(): void {
    this.activate.queryParams
      .subscribe(params => {
        console.log(params); 
        if(params['cantidadPregunta'] != undefined){
          this.cantidadPregunta = params['cantidadPregunta'];
        }
        if(params['preguntaTipo'] != undefined){
          this.preguntaTipo = params['preguntaTipo']
        }
        if(params['respuestaTipo'] != undefined){
          this.respuestaTipo = params['respuestaTipo']
        }
    this.datos.closeSideNav();

      });
    this.lista = this.datos.listaPalabras!;
    this.preguntaRespuestasGen()
  }

}

