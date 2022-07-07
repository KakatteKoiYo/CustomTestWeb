import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { CrearlistaComponent } from './crearlista/crearlista.component';
import { EstudiarlistaComponent } from './estudiarlista/estudiarlista.component';
import { HomeComponent } from './home/home.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { StartTestComponent } from './main-container/start-test/start-test.component';

const routes: Routes = [
  {path : "test", component : MainContainerComponent,  children: [
    {
      path: 'start', // child route path
      component: StartTestComponent, // child route component that the router renders
    }]},
  {path: "home", component: HomeComponent},
  {path: "estudiarlista", component: EstudiarlistaComponent},
  {path: "crearlista", component: CrearlistaComponent},
  {path: "**", redirectTo: '/home', pathMatch: 'full'},
  {path: '', redirectTo: '/home', pathMatch: 'full' },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
