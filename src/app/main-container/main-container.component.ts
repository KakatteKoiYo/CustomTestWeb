import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { DatosService, opcionesCookie } from '../datos.service';




@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {

  iniciar = false;
  radioValor? : number;
  radioValor2? : number;
  radioValor3? : number;
  radioValor4? : number;
  radioValor5? : number;

  listaSeleccionada? : string;
  form = new FormGroup({
    cantidadPreguntas: new FormControl('')
  });


  constructor(private router: Router, private datos : DatosService, private activate: ActivatedRoute) {
    this.datos.obtenerUltimaLista().subscribe(lista => {
    this.listaSeleccionada = lista;
    });
    
  }



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

  setTiempo(valor : string){
    this.radioValor5 = Number(valor);

  }

  setRespuesta(valor : string){
    
    this.radioValor3 = Number(valor);
    
  }

  setIgnorar(valor : string){
    this.radioValor4 = Number(valor)
  }
  ngOnInit(): void {
      let keys
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      if(this.router.url != "/test"){
        this.iniciar = true;
      }
      this.listaSeleccionada = this.datos.listaSeleccionada
      keys = Object.values(this.datos.getFakeCookieValue())
      this.radioValor = keys[0]
      this.radioValor2 = keys[1]
      this.radioValor3 = keys[2]
      this.radioValor4 = keys[3]
      this.radioValor5 = keys[4]
      console.log('Radio valor: ' + this.radioValor)
  }
}