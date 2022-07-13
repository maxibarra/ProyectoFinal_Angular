import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormInscripcionComponent } from './components/form-inscripcion/form-inscripcion.component';
import { HomeComponent } from './components/home/home.component';
import { TablaAlumnosComponent } from './components/tabla-alumnos/tabla-alumnos.component';

const routes: Routes = [{
  component:HomeComponent,
  path:''
},
{
  path:'inscripciones',
  component: FormInscripcionComponent
},
{
  path:'alumnos',
  component: TablaAlumnosComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
