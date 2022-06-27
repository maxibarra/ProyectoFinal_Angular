import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Alumnos } from 'src/app/models/alumnos.model';


@Component({
  selector: 'app-form-inscripcion',
  templateUrl: './form-inscripcion.component.html',
  styleUrls: ['./form-inscripcion.component.css']
})
export class FormInscripcionComponent implements OnInit {

  alumno: Alumnos = new Alumnos('','','','','')
  
  formularioAlumno = new FormGroup({
    nombre: new FormControl('',[Validators.required,Validators.minLength(10)]),
    apellido: new FormControl('',[Validators.required,Validators.minLength(10)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    telefono: new FormControl('',[Validators.required,Validators.maxLength(13)]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)])
  })
  constructor() { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.formularioAlumno.get('nommbre')?.setValue(this.alumno.nombre);
      this.formularioAlumno.get('apellido')?.setValue(this.alumno.apellido);
      this.formularioAlumno.get('email')?.setValue(this.alumno.email);
      this.formularioAlumno.get('password')?.setValue(this.alumno.password);
    },1000)
  }

  mostrarFormulario(){
    return(this.formularioAlumno.value);
  }
}
