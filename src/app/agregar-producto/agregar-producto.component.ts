import { Component, ElementRef, ViewChild } from '@angular/core';
import { FireBaseService } from '../fire-base.service';
import { IProducto } from '../interfaces/producto.interface';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent {

  constructor(private fireBaseServices: FireBaseService) { }

  @ViewChild('inputNombreProducto') inputNombreProducto!: ElementRef<HTMLInputElement>;


  producto: IProducto = {
    nombre: '',
    precio: 0
  }

  AgregarProducto(event: any): void {
    event.preventDefault()
    this.producto.nombre = this.inputNombreProducto.nativeElement.value

    // this.fireBaseServices.AgregarProducto(this.producto)
    console.log(this.producto.nombre);
    console.log(event.target.value);


  }


}
