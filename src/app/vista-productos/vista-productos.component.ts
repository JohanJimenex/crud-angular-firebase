import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FireBaseService } from '../fire-base.service';
import { IProducto } from '../interfaces/producto.interface';

@Component({
  selector: 'app-vista-productos',
  templateUrl: './vista-productos.component.html',

})
export class VistaProductosComponent {

  constructor(private fireBaseServices: FireBaseService) { }

  @Output() onSeleccionarProducto: EventEmitter<IProducto> = new EventEmitter<IProducto>();


  get producto(): IProducto {
    return this.fireBaseServices.producto;
  }
  get arrProductos(): IProducto[] {
    return this.fireBaseServices.arrProductos;
  }

  Seleccionar(item: IProducto): void {

    this.onSeleccionarProducto.emit(item);

    this.fireBaseServices.producto = item;

  }

  EliminarProducto(item: IProducto): void {
    
    this.fireBaseServices.BorrarProducto(item);

  }



}
