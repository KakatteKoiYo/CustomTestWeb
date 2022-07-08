import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { DatosService, IListaPalabras } from 'src/app/datos.service';
@Component({
  selector: 'app-start-test',
  templateUrl: './start-test.component.html',
  styleUrls: ['./start-test.component.css']
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
  pregunta? : string;
  respuesta? : string;
  inputRespuesta : string = "";
  resultado : number = 0;
  opciones : string[] = [];
 

  constructor(private activate : ActivatedRoute, private datos: DatosService) { }

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

    if(this.lugarRespuesta == opcionRespuesta){
      this.resultado += 1
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
    console.log("Pregunta: " + this.pregunta)
    console.log("Respuesta: " + this.respuesta)
    console.log("Valor: " + valor)
    if(valor == this.respuesta){
      console.log("Correcto!")
      this.resultado += 1
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
        console.log(params); // { orderby: "price" }
        if(params['cantidadPregunta'] != undefined){
          this.cantidadPregunta = params['cantidadPregunta'];
        }
        if(params['preguntaTipo'] != undefined){
          this.preguntaTipo = params['preguntaTipo']
        }
        if(params['respuestaTipo'] != undefined){
          this.respuestaTipo = params['respuestaTipo']
        }
      
        
        
      });
    this.lista = this.datos.listaPalabras!;
    this.preguntaRespuestasGen()
  }

}

