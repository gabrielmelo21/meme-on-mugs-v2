import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class MainAPIService {
  constructor(private http: HttpClient) {
  }


 private baseUrl = 'https://meme-in-mugs-backend.onrender.com/';
  //  private baseUrl = 'http://127.0.0.1:5000';



  uploadImage(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });

    return this.http.post(`${this.baseUrl}/upload`, formData, { headers, responseType: 'text' });
  }


  uploadImageCreateMug(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });

    return this.http.post(`${this.baseUrl}/create_mug`, formData, { headers, responseType: 'text' });
  }

  consultarCEP(cep: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.baseUrl + "/consulta-cep", cep, { headers });
  }

  registrarPedido(pedido: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.baseUrl + "/registrar-pedido", pedido, { headers });
  }





  addProduto(productForm: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const productData = {
      product_name: productForm.productName,
      product_price: productForm.productPrice,
      product_image: productForm.productImg,
      category: productForm.category,
      product_video: productForm.productVideo // Adiciona o campo product_video
    };

    return this.http.post<any>(this.baseUrl + "/add_product", productData, { headers });
  }


   // Atualize para usar POST e aceitar um parâmetro requestObject
   listProdutos(requestObject: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/products`, requestObject);
  }


   // Liste todos produtos independente da categoria
   listAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all_products`);
  }


     listProductsCount(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/products_count`);
    }


  deleteProduto(product_name: string): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/remove-product`, { product_name });
  }

  updateVideoStatus(product_name: string, newStatus: boolean) {
    const objectData = {
      "product_name": product_name,
      "product_video": newStatus
    };

    return this.http.post<any>(`${this.baseUrl}/update_product_video`, objectData);
  }




  //EDITOR JSON
  getProductsJson(): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/productsJSON`);
  }


  updateProductsJson(data: any) {
    return this.http.post<any>(`${this.baseUrl}/update_produtosJSON`, data);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/categorias`);
  }

  updateCategoriasJSON(data: any): Observable<any> {
    return this.http.post( this.baseUrl + "/update_categoriasJSON", data);
  }


  getPedidosJSON(): Observable<any[]>{
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });

     return this.http.get<any[]>(`${this.baseUrl}/pedidosJSON`, { headers });
  }

  updatePedidosJSON(data: any): Observable<any> {
    return this.http.post( this.baseUrl + "/update_pedidosJSON", data);
  }







}
