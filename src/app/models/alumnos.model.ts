export class Alumnos{
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  password:string;

  constructor(nombre: string, apellido: string, email: string,telefono: string , password: string){
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.telefono = telefono;
    this.password = password;
  }

}