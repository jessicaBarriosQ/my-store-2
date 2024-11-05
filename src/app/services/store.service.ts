import { Injectable } from '@angular/core';
import { Product } from '../app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  myShoppingCart: Product[] = [];

  addProducts(product: Product) {
    this.myShoppingCart.push(product);
  }

  getShoppingCart() {
    return this.myShoppingCart;
  }

  getTotal() {
    return  this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }

  constructor() { }
}
