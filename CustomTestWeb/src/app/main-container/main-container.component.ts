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

  onChange(valor : string){
    
    this.radioValor = Number(valor)//Number(e.target.value) 
    console.log(this.radioValor)
  }
  ngOnInit(): void {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      if(this.router.url != "/test"){
        this.iniciar = true;
      }
      this.listaSeleccionada = this.datos.listaSeleccionada
  }
}