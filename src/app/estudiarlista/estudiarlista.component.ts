import { Component, OnInit } from '@angular/core';
import { DatosService, IListaPalabras } from '../datos.service';

@Component({
  selector: 'app-estudiarlista',
  templateUrl: './estudiarlista.component.html',
  styleUrls: ['./estudiarlista.component.css']
})
export class EstudiarlistaComponent implements OnInit {

  listaPalabras? : IListaPalabras[];
  listaPalabrasFiltro? : IListaPalabras[];
  nombreLista? : string;
  searchString?: string;
  noResult? : boolean;
  palabra1Det? :string;
  palabra2Det? : string;
  palabra1Edit? : string;
  palabra2Edit? : string;
  editOn: boolean = false;
  constructor(private datos : DatosService) { }

  eliminar(){
    this.datos.eliminarLista()
  }

  editar(editarPalabra1 : string, editarPalabra2 : string, anteriorPalabra1 : string, anteriorPalabra2 : string){
    this.datos.editarLista( editarPalabra1, editarPalabra2, anteriorPalabra1, anteriorPalabra2, this.nombreLista!)
    this.editOn = false;
    this.palabra1Det = editarPalabra1;
    this.palabra2Det = editarPalabra2;
  }

  onChange(valor : string){
    this.listaPalabrasFiltro = [];
    this.noResult = false;
    console.log(valor)
    if(valor.trim() == ""){
      this.listaPalabrasFiltro = this.listaPalabras
    }else{
      
      for(let i of this.listaPalabras!){
        
        if(i.palabra1.toLowerCase().trim().search(valor.toLowerCase()) != -1 || i.palabra2.toLowerCase().trim().search(valor.toLowerCase()) != -1){
          this.listaPalabrasFiltro.push({palabra1: i.palabra1, palabra2: i.palabra2, descripcion : "---", nivel : 0})
        }
      }
    }
 
    if(this.listaPalabrasFiltro?.length == 0){
      this.noResult = true;
    }

  }

  mostrarDetalles(valor1 : string, valor2 : string){
    this.editOn = false;
    this.palabra1Det = valor1;
    this.palabra2Det = valor2;
  }

  ngOnInit(): void {
    this.listaPalabras = this.datos.listaPalabras;
    this.listaPalabrasFiltro = this.listaPalabras;
    this.nombreLista = this.datos.listaSeleccionada;


  }

}
