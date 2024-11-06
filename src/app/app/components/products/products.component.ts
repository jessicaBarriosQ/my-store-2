import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';

import { StoreService } from '../../../services/store.service';
import { ProductsService } from '../../../services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { SlickCarouselModule } from 'ngx-slick-carousel';




@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent, CommonModule,HttpClientModule, SlickCarouselModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{


  myShoppingCart: Product[] = [];
  total = 0;

  products: Product[] = [];
  showProductDetail = false;
  productChosen: Product = {

    id: '',
    price: 0,
    images: [],
    title: '',
    description: '',
    category: {
      id: '',
      name: '',
    },
  };

  constructor(
    private StoreService: StoreService,
    private productsService: ProductsService,

  ) {
    this.myShoppingCart = this.StoreService.getShoppingCart();
   }

  ngOnInit(): void {
    this.productsService.getAllProducts()
      .subscribe(data => {
        this.products = data;
      });

  }

  onAddToShoppingCart(product : Product)
  {
    this.StoreService.addProducts(product)
    this.total = this.StoreService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.productsService.getProduct(id).subscribe(data => {
      console.log('product', data);
      this.toggleProductDetail();
      this.productChosen = data;


    })
  }



}
