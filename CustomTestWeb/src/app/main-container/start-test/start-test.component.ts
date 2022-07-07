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
  lugarRespuesta? : number;
  pregunta? : string;
  resultado : number = 0;
  opciones : string[] = [];
 

  constructor(private activate : ActivatedRoute, private datos: DatosService) { }

  preguntaRespuestasGen(){
    let numeroPregunta = Math.floor(Math.random() * this.lista.length);
    this.lugarRespuesta = Math.floor(Math.random() * 5);
    let listaNumerosUsados : number[] = [numeroPregunta];

    console.log(this.lugarRespuesta)

    this.pregunta = this.lista[numeroPregunta].palabra1
    for (let i = 0; i < 5; i++) {
      if(i == this.lugarRespuesta){
        this.opciones[i] = this.lista[numeroPregunta].palabra2;
      }
      else{
        while(1){
          let numeroRespuesta = Math.floor(Math.random() * this.lista.length);
  
          if (!(listaNumerosUsados.includes(numeroRespuesta))){
            this.opciones[i] = this.lista[numeroRespuesta].palabra2;
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

  ngOnInit(): void {
    this.activate.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        if(params['cantidadPregunta'] != undefined){
          this.cantidadPregunta = 10;
        }
        // console.log(this.orderby); // price
      });
    this.lista = this.datos.listaPalabras!;
    this.preguntaRespuestasGen()
  }

}

