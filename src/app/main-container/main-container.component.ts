import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { DatosService } from '../datos.service';


@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {
  constructor(private router: Router, private datos : DatosService, private activate: ActivatedRoute) {
    
  }
  iniciar = false;
  radioValor : number = 10;
  radioValor2 : number = 0;
  radioValor3 : number = 0;

  listaSeleccionada? : string;
  form = new FormGroup({
    cantidadPreguntas: new FormControl('')
  });


  swapIniciar(){
    if(this.iniciar== false){
      this.iniciar = true;
    }else{
      this.iniciar = false;
    }

  }

  setCantidad(valor : string){
    
    this.radioValor = Number(valor);
  }
  setPregunta(valor : string){
    
    this.radioValor2 = Number(valor);
    console.log("radioValor2: " + this.radioValor2)
  }
  setRespuesta(valor : string){
    
    this.radioValor3 = Number(valor);
  }


  ngOnInit(): void {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      if(this.router.url != "/test"){
        this.iniciar = true;
      }
      this.listaSeleccionada = this.datos.listaSeleccionada
  }
}