import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-temah',
  standalone: true,
  imports: [],
  templateUrl: './temah.component.html',
  styles: ``
})
export class TemahComponent {
  @Input() mensaje!: string;
  @Output() mensaje2 = new EventEmitter<string>();
  enviarMensaje() {
    this.mensaje2.emit('Hola desde el hijo');
  }
}