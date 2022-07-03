import {Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlumnoService } from 'src/app/services/alumno.service';


@Component({
  selector: 'app-form-inscripcion',
  templateUrl: './form-inscripcion.component.html',
  styleUrls: ['./form-inscripcion.component.css']
})
export class FormInscripcionComponent implements OnInit {
  formularioAlumno = new FormGroup({
    nombre: new FormControl('',[Validators.required,Validators.required]),
    apellido: new FormControl('',[Validators.required,Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    telefono: new FormControl('',[Validators.required,Validators.required]),
    localidad: new FormControl('',[Validators.required,Validators.required])
  })
  subscriptions: Subscription = new Subscription();

  constructor(private alumnoService: AlumnoService){ }
  ngDestroy() { 
    this.subscriptions.unsubscribe();
  }


  ngOnInit(): void {
    this.subscriptions.add(
      this.alumnoService.getAlumnoSelect().subscribe({
          next: (alumno) => {
            if(alumno){
              this.formularioAlumno.patchValue(alumno)
            }else{
              this.formularioAlumno.reset();
            }
          }, error : (error) => {
            console.error(error)
          }
        })
    )
  }
 
  addAlumno(){
   this.alumnoService.addAlumno(this.formularioAlumno.value);
   this.formularioAlumno.reset()

  }
}
