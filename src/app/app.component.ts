import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private router : Router){}
  title = 'CustomTestProject';
  ngAfterViewInit(){
    Swal.fire({
      title: 'Esta página es una demostración. Así que recuerda que si actualizas la página los datos como progreso o listas guardadas se perderan.',
      icon: 'warning',
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.value) {
        this.router.navigateByUrl("/home")

      }})
  }
  ngOnInit() {
    

    window.addEventListener("beforeunload", function (e) {
     
      var confirmationMessage = "....";
      e.returnValue = "Are you sure wanna leave";    
 
  });
  }
  
}
