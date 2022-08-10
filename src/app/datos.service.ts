import { Injectable } from '@angular/core';
import { ListaEjemplo} from './listaEjemplo';
import { SidenavComponent } from './sidenav/sidenav.component';
import { Observable, Subject } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  listaPalabras? : IListaPalabras[];
  listaSeleccionada? : string;
  sidenav! : MatSidenav;

  private subject = new Subject<any>();

  actualizarListaCB(ultimaLista: string) {
      this.subject.next(ultimaLista);
  }

  obtenerUltimaLista(): Observable<any> {
      return this.subject.asObservable();
  }


  editarLista(){

  }

  eliminarLista(){
   
  }
  
  crearLista(nombre : string, lista : object[]){
    
    ListaEjemplo.unshift({[`${nombre}`] : lista});
    
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

  setSidenav(sidenav : MatSidenav){
    this.sidenav = sidenav
  }

  closeSideNav(){
    this.sidenav.close();
  }
  openSideNav(){
    console.log("Open side nav")
    this.sidenav.open();
  }
}

export interface IListaPalabras {
    palabra1 : string;
    palabra2 : string;
}
export interface IListaObjeto {
  nombreLista : string;
  listaObjetos : IListaPalabras[];
}