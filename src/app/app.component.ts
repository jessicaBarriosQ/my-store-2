import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './app/components/nav/nav.component';
import { ProductsComponent } from './app/components/products/products.component';
import { Product } from './app/models/product.model';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ProductsService } from './services/products.service';
import { SlickCarouselComponent } from 'ngx-slick-carousel';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, AppComponent, ProductsComponent,CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  imgParent = '';
  showImg = true;


  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }
}
