import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageserviceService {

  constructor() { }
  alumnos:string[]=[];

  add(alumno:string){
    this.alumnos.push(alumno);
  }
}
