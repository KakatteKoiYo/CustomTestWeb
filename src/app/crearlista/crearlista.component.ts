import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { IListaPalabras } from '../datos.service';
import { DatosService } from '../datos.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2"

@Component({
  selector: 'app-crearlista',
  templateUrl: './crearlista.component.html',
  styleUrls: ['./crearlista.component.css']
})

export class CrearlistaComponent implements OnInit {
  @ViewChild('renPalabra2') inputPalabra2? : ElementRef;
  @ViewChild('renPalabra1') inputPalabra1? : ElementRef;

  palabra1 : string = "";
  palabra2 : string = "";
  arrayPalabras : IListaPalabras[] = [];
  nombreLista : string = "";
  bandera : number = 0;
  isDisabled : boolean = true;
  
  constructor(private datos : DatosService, private router : Router) { }

  cambiarFoco(){
    console.log(this.inputPalabra2?.nativeElement)
    this.inputPalabra2?.nativeElement.focus();
    this.bandera = 1
  }

  validarTexto(){
    
    if(this.palabra1 != ""){
      this.isDisabled = false; 
    }else{
      this.isDisabled = true;
    }
  }

  resetBandera(){
    this.bandera = 0;
  }

  regresarFoco(){
    // console.log(this.palabra2)
    // console.log("Bandera: " + this.bandera)
    if(this.palabra2 == ""){
      this.bandera += 1;
      if(this.bandera == 2){
        this.inputPalabra1?.nativeElement.focus()
        
      }
    }else{
      this.bandera = 0;
    }

  }

  agregar(){
    console.log(this.palabra1)
    console.log(this.palabra2)
    this.arrayPalabras.push({palabra1 : this.palabra1, palabra2 : this.palabra2})  
    console.log(this.arrayPalabras)

    this.palabra1 = "";
    this.palabra2 = "";

    this.inputPalabra1?.nativeElement.focus();
    this.isDisabled = true;


    
  }

  eliminar(index: number){
    console.log(index)
    this.arrayPalabras.reverse().splice(index, 1);
    this.arrayPalabras.reverse()
  }

  crear(nombre : string){
    console.log(nombre);
    this.datos.crearLista(nombre, this.arrayPalabras);
    Swal.fire({
      title: 'Lista: "' + this.nombreLista +'" creada con éxito',
      icon: 'success',
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.value) {
        this.datos.actualizarListaCB(this.nombreLista)
        this.router.navigateByUrl("/test")

      }})
  }

  ngOnInit(){
    
    

    
  //   window.addEventListener("beforeunload", function (e) {
      
     
  //     var confirmationMessage = "....";
  //     // console.log(e);
  //     e.returnValue = "Are you sure wanna leave";     // Gecko, Trident, Chrome 34+
  //     //return "Bye"//confirmationMessage;              // Gecko, WebKit, Chrome <34
  // });
  }

}
