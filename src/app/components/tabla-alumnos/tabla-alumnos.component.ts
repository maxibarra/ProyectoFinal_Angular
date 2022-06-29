import { Component, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Alumnos } from 'src/app/models/alumnos.model';




@Component({
  selector: 'app-tabla-alumnos',
  templateUrl: './tabla-alumnos.component.html',
  styleUrls: ['./tabla-alumnos.component.css']
})
export class TablaAlumnosComponent implements OnInit {

  listaAlumnos: Alumnos[] =[
    {nombre:"asdf", apellido:"qweerew",email:"cfasdf@sadf.com",telefono:"1231313",localidad:"sfsdfsdf"},
    {nombre:"asdf", apellido:"",email:"",telefono:"",localidad:""},
    {nombre:"asdf", apellido:"",email:"",telefono:"",localidad:""},
    {nombre:"asdf", apellido:"",email:"",telefono:"",localidad:""}
  ]
  displayedColumns: string[] = ['nombre', 'apellido', 'email', 'telefono','localidad'];
  dataSource = new MatTableDataSource<Alumnos>();
  
  constructor() { }
  ngOnInit(): void {
    this.dataSource.data= this.listaAlumnos;
  }
 
  
}

