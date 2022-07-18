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

  public arrProductos: IProducto[] = [];

  producto: IProducto = {
    idProducto: "",
    nombre: '',
    precio: 0
  }

  constructor(private http: HttpClient) {
    // Initialize Firebase
    let app = initializeApp(firebaseConfig);
    const storage = getStorage(app);

    let db = getFirestore(app);

    this.ConsultarTodosLosProductos();

  }

  ConsultarTodosLosProductos(): void {

    this.http.get<any>(this.urlBase + ".json").subscribe((response: any) => {

      this.arrProductos = []

      for (const key in response) {

        let producto: IProducto = response[key];

        producto.idProducto = key;

        this.arrProductos.push(producto)
      }

    });


  }

  async AgregarProducto(producto: IProducto) {

    let { idProducto, ...prodSinID } = producto;

    let data = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(prodSinID)

    }

    let request = await fetch(this.urlBase + ".json", data)
    // let response = await request.json();

    this.ConsultarTodosLosProductos();


  }

  async BorrarProducto({ idProducto }: IProducto) {

    let data = {
      method: "DELETE"
    }

    let request = await fetch(this.urlBase + "/" + idProducto + ".json", data)
    // let response = await request.json();

    this.ConsultarTodosLosProductos();

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
  //       this.arrProductos.push(response[key])
  //     }
  //   });
  // }

}
