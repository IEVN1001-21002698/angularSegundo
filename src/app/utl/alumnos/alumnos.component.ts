import { Component,  OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlumnoFilterPipe } from '../alumnos-filter.pipe';
import { CommonModule } from '@angular/common';
import { AlumnosUtl } from '../interfaces/alumnosutl';
import { ProyectoapiService } from '../proyectoapi.service';
import { RouterLink } from '@angular/router';
 
 
 
 
@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [FormsModule,AlumnoFilterPipe, CommonModule,RouterLink],
 
  templateUrl: './alumnos.component.html',
  styles: ``
})
export default class AlumnosComponent implements OnInit {
 
 
  imageWidth:number=50;
  imageMargin:number=2;
  muestraImg:boolean=true;
  listFilter:string=''
  alumnoTitle!:string
  dataSource:any=[];
  constructor(public alumnosUtl:ProyectoapiService){}
 
  showImage():void{
    this.muestraImg=!this.muestraImg;
  }
 
  alumnosIric:AlumnosUtl[]=[
    {
      matricula:1234,
      nombre:'pedro',
      apaterno:'lopez',
      amaterno:'muñoz',
      correo: 'pedro@gmail.com',
 
    },
    {
      matricula:772,
      nombre:'Paulina',
      apaterno:'lopez',
      amaterno:'muñoz',
      correo: 'paulina@gmail.com',
    },
 
    {
      matricula:22,
      nombre:'Dario',
      apaterno:'lopez',
      amaterno:'muñoz',
      correo: 'dario@gmail.com',
 
    },
  ]
 
  onCalificaClick(message:string){
    this.alumnoTitle=` ${message}`;
 
  }
  ngOnInit(): void {
     this.alumnosUtl.getAlumnos().subscribe(
      {
        next: response=>{
 
      this.dataSource=response;
 
    },
    error: error=>console.log(error)
  }
    );
 
}
 
}
 