import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';

import { StoreService } from '../../../services/store.service';
import { ProductsService } from '../../../services/products.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent, CommonModule,HttpClientModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{

  myShoppingCart: Product[] = [];
  total = 0;

  products: Product[] = [ ];

  constructor(
    private StoreService: StoreService,
    private ProductsService: ProductsService
  ) {
    this.myShoppingCart = this.StoreService.getShoppingCart();
   }

  ngOnInit(): void {
    this.ProductsService.getAllProducts()
      .subscribe(data => {
        this.products = data;
      });
  }

  onAddToShoppingCart(product : Product)
  {
    this.StoreService.addProducts(product)
    this.total = this.StoreService.getTotal();
  }


}
