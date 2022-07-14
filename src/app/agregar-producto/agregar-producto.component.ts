import { Component } from '@angular/core';
import { FireBaseService } from '../fire-base.service';
import { IProducto } from '../interfaces/producto.interface';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent {

  constructor(private fireBaseServices: FireBaseService) { }

  producto: IProducto = {
    nombre: '',
    precio: 0
  }

  AgregarProducto(): void {
    this.fireBaseServices.AgregarProducto(this.producto)
  }


}
