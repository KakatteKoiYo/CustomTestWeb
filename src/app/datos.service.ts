import { Injectable } from '@angular/core';
import { ListaEjemplo} from './listaEjemplo';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  listaPalabras? : IListaPalabras[];
  listaSeleccionada? : string;
  
  editarLista(){

  }

  eliminarLista(){
   
  }
  
  crearLista(nombre : string, lista : object[]){
    
    ListaEjemplo.push({[`${nombre}`] : lista});
    
  }

  obtenerListaNombre() : string[] {
    let listaNombresArray =[] //= Object.keys(this.listasCreadas[0])
    for(let i of ListaEjemplo){
      console.log(i)
      console.log(Object.keys(i)[0])
      listaNombresArray.push(Object.keys(i)[0]);
    }
    console.log(listaNombresArray)
    return listaNombresArray
    
  }

  getValores(valor : string){
    for(let i of ListaEjemplo){
      if(Object.keys(i)[0] == valor){
        this.listaPalabras = Object.values(i)[0];
        console.log(this.listaPalabras)
        this.listaSeleccionada = valor;
      }
    }
  }

  // selectExample() : IListaPalabras[] {
  //   this.listaPalabras = ListaEjemplo
  //   return this.listaPalabras;
  // }
  constructor() { }

}

export interface IListaPalabras {
    palabra1 : string;
    palabra2 : string;
}
export interface IListaObjeto {
  nombreLista : string;
  listaObjetos : IListaPalabras[];
}