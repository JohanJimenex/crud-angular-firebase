import { Injectable } from '@angular/core';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";
import { IProducto } from './interfaces/producto.interface';
import { HttpClient } from "@angular/common/http";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHmp0RbJDALYRCfYgsNZF9ag-vhYeG6aI",
  authDomain: "api-rest-johan.firebaseapp.com",
  projectId: "api-rest-johan",
  storageBucket: "api-rest-johan.appspot.com",
  messagingSenderId: "154551112606",
  appId: "1:154551112606:web:3fdf448321e2d614ffbc8f"

};


@Injectable({
  providedIn: 'root'
})
export class FireBaseService {

  private urlBase: string = "https://api-rest-johan-default-rtdb.firebaseio.com/products";


  constructor(private http: HttpClient) {
    // Initialize Firebase
    let app = initializeApp(firebaseConfig);
    const storage = getStorage(app);

    let db = getFirestore(app);

  }

  private _arrProductos: IProducto[] = [];

  get arrProductos(): IProducto[] {
    return [...this._arrProductos];
  }

  async ConsultarTodosLosProductos() {

    let request = await fetch(this.urlBase + ".json")
    let response = await request.json();

    for (const key in response) {

      let producto: IProducto = response[key];

      producto.idProducto = key;

      this._arrProductos.push(producto)
    }

    console.log(this.arrProductos);

  }

  async AgregarProducto(producto: IProducto) {

    let data = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(producto)

    }

    let request = await fetch(this.urlBase + ".json", data)
    // let response = await request.json();

  }

  async BorrarProducto({ idProducto }: IProducto) {

    let data = {
      method: "DELETE"
    }

    let request = await fetch(this.urlBase + "/" + idProducto + ".json", data)
    // let response = await request.json();
  }

  async ActualizarProducto(producto: IProducto) {

    let { idProducto, ...nuevoProducto } = producto;

    let data = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoProducto)
    }

    let request = await fetch(`${this.urlBase}/${idProducto}.json`, data);
    // let response = await request.json();
  }


  // BuscarTodosLosProductos2(): void {

  //   this.http.get<any>(this.urlBase + ".json").subscribe((response: any) => {

  //     for (const key in response) {
  //       this._arrProductos.push(response[key])
  //     }
  //   });
  // }

}
