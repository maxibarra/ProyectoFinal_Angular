import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime,map, Observable, Subscription, tap } from 'rxjs';
import { Alumno } from 'src/app/models/alumno.model';
import { AlumnoService } from 'src/app/services/alumno.service';





@Component({
  selector: 'app-tabla-alumnos',
  templateUrl: './tabla-alumnos.component.html',
  styleUrls: ['./tabla-alumnos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablaAlumnosComponent implements OnInit {
  inputBusqueda = new FormControl();

  textFromOtherComponent: string | null = null;

  displayedColumnsTable = ['index', 'nombre', 'apellido', 'email' ,'telefono', 'localidad','action']
  tableDataSource$: Observable<MatTableDataSource<Alumno>> | null = null;

  alumnoSelect: Alumno | null = null;
  alumnoSelect$: Observable<Alumno> | null = null;
  
  susbcriptions: Subscription = new Subscription();
 

  constructor(private alumnoService: AlumnoService,private router: Router) {
    this.tableDataSource$ = this.alumnoService.getAlumnos().pipe(tap((alumno) => console.log(alumno)),
                                                            map((alumno) => new MatTableDataSource<Alumno>(alumno)));
  }

  ngOnDestroy(){
    this.susbcriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.inputBusqueda.valueChanges.pipe(debounceTime(500)).subscribe((nombre: string) =>{
      console.log(nombre)
      this.tableDataSource$ = this.alumnoService.getAlumnos(nombre).pipe(tap((alumnos) => console.log(alumnos)),
                                                            map((alumnos) => new MatTableDataSource <Alumno>(alumnos)));
    })
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

  selectAlumno(id:number){
   this.alumnoSelect$= this.alumnoService.selectAlumnoById(id)
  }

  deleteAlumno(id:number){
    this.alumnoService.deleteAlumnoById(id).subscribe((resp)=> {
      console.log(resp);
    })
    this.getAlumnos();
  }
  irAlFormulario(){
    this.router.navigate(['inscripciones']);
  }
  getAlumnos(){
    this.tableDataSource$ =this.alumnoService.getAlumnos().pipe(tap((alumno) => console.log(alumno)),
    map((alumno) => new MatTableDataSource<Alumno>(alumno)));
  }
  
}

