import { Injectable } from '@angular/core';
import { ListaEjemplo, cookieSim} from './listaEjemplo';
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
    // for(let i in ListaEjemplo){
    //   console.log(i)
    // }
    // for(let i of ListaEjemplo){
    //   if(Object.keys(i)[0] == "Animales Inglés"){
    //     for(let j of Object.values(i)[0]){
    //       if(j.palabra1 == "Bull" && j.palabra2 == "Toro"){
    //         delete j;
    //       }
          
    //     }
        
        
    //   }
    //}
    // console.log(Object.keys(ListaEjemplo))
    // console.log(Object.values(ListaEjemplo))
    // console.log(ListaEjemplo[2])
  //  for(let i of ListaEjemplo[listaNombre]){   no pude iterar en el objeto y encontrar los valores 
  //   if(i.find(e => ))
  //  }
  }
  
  crearLista(nombre : string, lista : IListaPalabras[]){
    
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

  getFakeCookieValue() : opcionesCookie{
    return cookieSim;
  }

  updateFakeCookie(values : number[]) : void{
    
    Object.keys(cookieSim).forEach((key , index) => {
      cookieSim[key] = values[index] 

    })
     
    }

  
}

export interface IListaPalabras {
    palabra1 : string;
    palabra2 : string;
    descripcion : string;
    nivel : number;
}
export interface IListaObjeto {
  [key : string] : IListaPalabras[]
  
}

export interface opcionesCookie {
  [key : string] : number;
}