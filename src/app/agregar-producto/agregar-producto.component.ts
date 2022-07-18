import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FireBaseService } from '../fire-base.service';
import { IProducto } from '../interfaces/producto.interface';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',

})
export class AgregarProductoComponent {

  constructor(private fireBaseServices: FireBaseService) { }

  @Input() producto: IProducto = {
    idProducto: "",
    nombre: '',
    precio: 0
  }

  AgregarProducto(): void {

    //si el id es cero entonfces se agrega un nuevo prod, d elo contrario se actualiza el existente
    if (this.producto.idProducto == "") {
      this.fireBaseServices.AgregarProducto(this.producto);
    } else {
      this.fireBaseServices.ActualizarProducto(this.producto);
    }

    this.fireBaseServices.producto = { idProducto: "", nombre: "", precio: 0 }

    this.producto = this.fireBaseServices.producto;

  }


}
