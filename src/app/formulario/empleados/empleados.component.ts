import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Trabajador {
  matricula: number;
  nombre: string;
  email: string;
  edad: number;
  horas: number;
}

@Component({
  selector: 'app-trabajadores',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export default class TrabajadoresComponent implements OnInit {

  formularioEmpleados!: FormGroup;
  listaEmpleados: Trabajador[] = [];
  totalPagos: number = 0;
  mensajeError: string = '';    
  mensajeExito: string = '';    
  matriculaModificar: number | null = null;
  matriculaEliminar: number | null = null;
  mostrarTabla: boolean = false;  

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formularioEmpleados = this.initFormulario();
    this.cargarTrabajadores();
    this.calcularTotalPagos();
  }

  initFormulario(): FormGroup {
    return this.fb.group({
      matricula: [''],
      nombre: [''],
      email: [''],
      edad: [''],
      horas: ['']
    });
  }

  registrarEmpleado(): void {
    if (this.formularioEmpleados.invalid) {
        this.mensajeError = 'Por favor completa todos los campos.';
        return;
    }

    const { matricula, nombre, email, edad, horas } = this.formularioEmpleados.value;
    if (!matricula || !nombre || !email || !edad || !horas) {
        this.mensajeError = 'Por favor completa todos los campos.';
        return;
    }

    const matriculaExiste = this.listaEmpleados.some(trabajador => trabajador.matricula === matricula);

    if (matriculaExiste && this.matriculaModificar === null) {
        this.mensajeError = 'La matrícula ya existe.';
        this.mensajeExito = '';
        return;
    }

    const trabajador: Trabajador = { matricula, nombre, email, edad, horas };

    if (this.matriculaModificar !== null) {
        const trabajadorIndex = this.listaEmpleados.findIndex(e => e.matricula === this.matriculaModificar);
        if (trabajadorIndex !== -1) {
            this.listaEmpleados[trabajadorIndex] = trabajador;
        }
        this.matriculaModificar = null;
        this.mensajeExito = 'Empleado modificado correctamente.';
        this.mensajeError = '';
    } else {
        this.listaEmpleados.push(trabajador);
        this.mensajeExito = 'Empleado agregado correctamente.';
        this.mensajeError = '';
    }

    localStorage.setItem('trabajadores', JSON.stringify(this.listaEmpleados));
    this.calcularTotalPagos();
    this.formularioEmpleados.reset();
    this.mostrarTabla = false;
  }

  toggleTabla(): void {
    this.mostrarTabla = !this.mostrarTabla;
  }

  cargarTrabajadores(): void {
    const trabajadoresGuardados = localStorage.getItem('trabajadores');
    if (trabajadoresGuardados) {
      this.listaEmpleados = JSON.parse(trabajadoresGuardados);
    }
  }

  calcularPagoNormal(horas: number): number {
    return Math.min(horas, 40) * 70;
  }

  calcularPagoExtra(horas: number): number {
    return Math.max(0, horas - 40) * 140;
  }

  calcularTotalPagos(): void {
    this.totalPagos = this.listaEmpleados.reduce((sum, trabajador) => {
      const pagoNormal = this.calcularPagoNormal(trabajador.horas);
      const pagoExtra = this.calcularPagoExtra(trabajador.horas);
      return sum + (pagoNormal + pagoExtra);
    }, 0);
  }

  buscarEmpleado(): void {
    if (this.matriculaModificar !== null) {
      const trabajador = this.listaEmpleados.find(e => e.matricula === this.matriculaModificar);
      if (trabajador) {
        this.formularioEmpleados.patchValue(trabajador);
        this.mensajeExito = '';  
      } else {
        this.mensajeError = 'Empleado no encontrado.';
        this.mensajeExito = '';
      }
    }
    this.mostrarTabla = false;
  }

  eliminarEmpleado(): void {
    if (this.matriculaEliminar !== null) {
      this.listaEmpleados = this.listaEmpleados.filter(trabajador => trabajador.matricula !== this.matriculaEliminar);
      localStorage.setItem('trabajadores', JSON.stringify(this.listaEmpleados));
      this.calcularTotalPagos();
      this.matriculaEliminar = null;
      this.mensajeExito = 'Empleado eliminado correctamente.';
      this.mensajeError = '';
      this.mostrarTabla = false;
    }
  }
}
