import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router'
import { DatosService } from '../datos.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  listasDisponibles? : string[] = [];
  ruta? : string;
  suscription? : Subscription;
  constructor(private datos: DatosService, private router: Router, private sidenav : MatSidenav) {
  
    this.datos.obtenerUltimaLista().subscribe(lista => {
      this.datos.getValores(lista);
      this.listasDisponibles = this.datos.obtenerListaNombre();
    });

    this.router.events.subscribe((event: Event) => {
 
        if (event instanceof NavigationEnd) {
          this.ruta = this.router.url;
        }

    });

    
   }
  

  getValores(valor : string){
      this.datos.getValores(valor);
      this.router.navigateByUrl("/home")
      // this.router.navigateByUrl("/test")
  }

  onClick(){
    this.listasDisponibles = this.datos.obtenerListaNombre();
  }
  getListas(){

  }


  ngOnInit(): void {
    
    this.listasDisponibles = this.datos.obtenerListaNombre();
    this.datos.getValores(this.listasDisponibles[0]);
    this.datos.setSidenav(this.sidenav)
    
  }

}
