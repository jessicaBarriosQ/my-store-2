import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Product, CreateProductDTO, UpdateProductDTO } from '../app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //private apiUrl = 'https://api.escuelajs.co/api/v1/products';

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';



  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number , offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set(`limit`, limit);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      params = params.set(`offset`, limit);

    }
    return this.http.get<Product[]>(this.apiUrl);

  }

  getProduct(id: string)
  {
    return this.http.get<Product>(`${ this.apiUrl}/${id}`);
  }
  getProductBypages(limit: number, offset:number) {
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params: {limit, offset}
    })
  }

  create(data: CreateProductDTO) {

    return this.http.post<Product>(this.apiUrl, data);

  }
  update(id: string , dto: UpdateProductDTO) {
    return this.http.put<Product>(`${ this.apiUrl}/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`)
  }
}
