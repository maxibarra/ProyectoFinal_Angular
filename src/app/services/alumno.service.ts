import {Injectable} from "@angular/core";
import { BehaviorSubject,catchError, map,of,Subject } from "rxjs";
import { Alumno } from "../models/alumno.model";


@Injectable({
  providedIn: 'root'
})

export class AlumnoService { 

  alumnoList : Alumno[] = [
    {nombre:"maxi", apellido:"qweerew",email:"cfasdf@sadf.com",telefono:"1231313",localidad:"sfsdfsdf"},
    {nombre:"bel", apellido:"qweerew",email:"cfasdf@sadf.com",telefono:"1312434",localidad:"sfsdfsdf"},
  ];

  alumnoSelected$ = new Subject <Alumno | null>();
  alumnos$ = new BehaviorSubject < Alumno[]>(this.alumnoList);

  constructor(){}
  
  addAlumno(alumnos: Alumno){
    this.alumnoList.push(alumnos);
    this.alumnos$.next(this.alumnoList)
  }

  getAlumnos(){
    return this.alumnos$.asObservable()
  }

  getAlumnoSelect(){
    return this.alumnoSelected$.asObservable()
  }


  selectAlumnoByIndex(index?: number){
    this.alumnoSelected$.next(index!== undefined ? this.alumnoList[index] : null)
  }

  deleteAlumnoByIndex(index?: number){
    this.alumnoList = this.alumnoList.filter((_, i) => index != i)
    this.alumnos$.next(this.alumnoList)
  }

  searchAlumnoByName(nombre: string){
    return of(this.alumnoList).pipe(
      map((Alumno) => Alumno.filter((alumno)=> (alumno.nombre + ' ' + alumno.apellido).toLowerCase().includes(nombre.toLowerCase()))),
      catchError((error) => {throw new Error(error)})
    )
  }

}