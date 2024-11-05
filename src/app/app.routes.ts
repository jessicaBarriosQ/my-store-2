import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductsComponent } from './app/components/products/products.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
export const routes: Routes = [

  {
    path: 'home',
    component: AppComponent

  },
  {
    path: 'products',
    component: ProductsComponent

  },

];
