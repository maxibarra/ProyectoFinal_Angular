import { Component, OnInit } from '@angular/core';



const Alumnos =[
  {nombre: "nasd",apellido: "nasdas",email: "nasdas@gmail.com",telefono: 1231423142314},

];
@Component({
  selector: 'app-tabla-alumnos',
  templateUrl: './tabla-alumnos.component.html',
  styleUrls: ['./tabla-alumnos.component.css']
})
export class TablaAlumnosComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'email', 'telefono'];
  dataSource = Alumnos;

  constructor() { }
  ngOnInit(): void {
  }
 
}

