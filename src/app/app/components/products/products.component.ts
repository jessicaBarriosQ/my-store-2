import { Component, OnInit } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from '../../models/product.model';
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
  limit = 10;
  offset = 0;


  constructor(
    private StoreService: StoreService,
    private productsService: ProductsService

  ) {
    this.myShoppingCart = this.StoreService.getShoppingCart();
   }

  ngOnInit(): void {
    this.productsService.getProductBypages(10,0)
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

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo producto',
      description: 'bla bla bla',
      images: [''],
      price: 1000,
      categoryId: 2,
    }
    this.productsService.create(product).subscribe(data => {
      console.log('created', data);
      this.products.unshift(data);
    });
  }

  UpdateProduct() {
    const changes: UpdateProductDTO ={
      title: 'nuevo title',
    }
    const id = this.productChosen.id;
    this.productsService.update(id, changes).subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
    })
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id).subscribe(()=> {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;

    });
  }

  loadMore() {

    this.productsService.getProductBypages(10,0)
      .subscribe(data => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });


  }



}
