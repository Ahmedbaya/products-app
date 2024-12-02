import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StartComponent } from './start/start.component';
import { AddProductComponent } from './add-product/add-product.component'
import { ProductEditComponent } from './product-edit/product-edit.component';

const routes: Routes = [
  { path: 'home', component: StartComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'add-product', component: AddProductComponent },
  {path: 'products/:id', component: ProductDetailComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'edit/:id', component: ProductEditComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }