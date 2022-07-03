import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, Subscription, tap } from 'rxjs';
import { Alumno } from 'src/app/models/alumno.model';
import { AlumnoService } from 'src/app/services/alumno.service';





@Component({
  selector: 'app-tabla-alumnos',
  templateUrl: './tabla-alumnos.component.html',
  styleUrls: ['./tabla-alumnos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablaAlumnosComponent implements OnInit {

  displayedColumnsTable = ['index', 'nombre', 'apellido', 'email' ,'telefono', 'localidad','action']
  tableDataSource$: Observable<MatTableDataSource<Alumno>>;

  alumnoSelect: Alumno | null = null;

  susbcriptions: Subscription = new Subscription();

  constructor(private alumnoService: AlumnoService) {
    this.tableDataSource$ = this.alumnoService.getAlumnos().pipe(tap((alumno) => console.log(alumno)),
                                                            map((alumno) => new MatTableDataSource<Alumno>(alumno)));
  }

  ngOnDestroy(){
    this.susbcriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.susbcriptions.add(
      this.alumnoService.getAlumnoSelect().subscribe({
          next: (alumno) => {
            this.alumnoSelect = alumno
          }, error : (error) => {
            console.error(error)
          }
        })
    )
  }

  selectAlumno(index?: number){
    this.alumnoService.selectAlumnoByIndex(index)
  }

  deleteAlumno(index?: number){
    this.alumnoService.deleteAlumnoByIndex(index)
  }

  // listaAlumnos: Alumno[] =[
  //   {nombre:"asdf", apellido:"qweerew",email:"cfasdf@sadf.com",telefono:"1231313",localidad:"sfsdfsdf"},
  //   {nombre:"asdf", apellido:"qweerew",email:"cfasdf@sadf.com",telefono:"1231313",localidad:"sfsdfsdf"},
  //   {nombre:"asdf", apellido:"qweerew",email:"cfasdf@sadf.com",telefono:"1231313",localidad:"sfsdfsdf"},
  //   {nombre:"asdf", apellido:"qweerew",email:"cfasdf@sadf.com",telefono:"1231313",localidad:"sfsdfsdf"}
  // ]
  
}

