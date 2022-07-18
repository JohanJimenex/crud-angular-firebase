import { Component } from '@angular/core';
import { FireBaseService } from './fire-base.service';
import { IProducto } from './interfaces/producto.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  producto: IProducto = {
    idProducto: "",
    nombre: '',
    precio: 0
  }

  seleccionarProducto(item: IProducto): void {
    this.producto = item;

  }


}
