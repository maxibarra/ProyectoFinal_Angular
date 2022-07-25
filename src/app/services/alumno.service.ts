import { HttpClient } from "@angular/common/http";
import {Injectable} from "@angular/core";
import { BehaviorSubject,catchError, map,Observable,of,Subject } from "rxjs";
import { enviroment } from "../enviroments/enviroment";
import { Alumno } from "../models/alumno.model";


@Injectable({
  providedIn: 'root'
})

export class AlumnoService { 

  alumnoList : Alumno[] = [];

  alumnoSelected$ = new Subject <Alumno | null>();
  alumnos$ = new BehaviorSubject < Alumno[]>(this.alumnoList);

  constructor(private httpClient : HttpClient){}
  
  addAlumno(alumnos: Alumno){
    this.alumnoList.push(alumnos);
    this.alumnos$.next(this.alumnoList)
  }

  getAlumnos(nombre?:string): Observable <Alumno[]>{
   
    return this.httpClient.get<Alumno[]>('https://62ddd60e79b9f8c30aaf75e1.mockapi.io/api/v1/'+ 'alumnos').pipe(map((alumnos) =>{
          return nombre ? alumnos.filter (alumno=>(alumno.nombre.toLowerCase()+ '' + alumno.apellido.toLowerCase()).includes(nombre.toLowerCase())) : alumnos
          })
    );
  //   return this.alumnos$.asObservable().pipe(map((alumnos) =>{
  //     return nombre? alumnos.filter(alumno =>(alumno.nombre.toLowerCase()+ '' + alumno.apellido.toLowerCase()).includes(nombre.toLowerCase())) : alumnos
  //     })
  // )
  }

  getAlumnoSelect(){
    return this.alumnoSelected$.asObservable()
  }

  selectAlumnoById(id: number): Observable <Alumno>{
    return this.httpClient.get<Alumno>('https://62ddd60e79b9f8c30aaf75e1.mockapi.io/api/v1/'+'alumnos/'+id);
  }
  // selectAlumnoByIndex(index?: number){
  //   this.alumnoSelected$.next(index!== undefined ? this.alumnoList[index] : null)
  // }
  deleteAlumnoById(id: number) {
    return this.httpClient.delete('https://62ddd60e79b9f8c30aaf75e1.mockapi.io/api/v1/'+'alumnos/'+id)
  }
  // deleteAlumnoByIndex(index?: number){
  //   this.alumnoList = this.alumnoList.filter((_, i) => index != i)
  //   this.alumnos$.next(this.alumnoList)
  // }

  searchAlumnoByName(nombre: string){
    return of(this.alumnoList).pipe(
      map((Alumno) => Alumno.filter((alumno)=> (alumno.nombre + ' ' + alumno.apellido).toLowerCase().includes(nombre.toLowerCase()))),
      catchError((error) => {throw new Error(error)})
    )
  }

}