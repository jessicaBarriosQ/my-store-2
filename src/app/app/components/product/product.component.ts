import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product.model';
import { ImgComponent } from '../img/img.component';
import { CommonModule } from '@angular/common';

import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ImgComponent, CommonModule, ProductsComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{


  @Input() product: Product = {
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

  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    if (!Array.isArray(this.product.images)) {
      console.error('Error: product.image no es un array o está indefinido', this.product.images);
    } else {
      console.log('product.image tiene un valor:', JSON.stringify(this.product.images));
    }
  }


  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

  onShowDetail() {
    this.showProduct.emit(this.product.id);
  }

}
