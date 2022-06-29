export class Alumnos{
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  localidad: string

  constructor(nombre: string, apellido: string, email: string,telefono: string , localidad: string){
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.telefono = telefono;
    this.localidad = localidad;
  }

}