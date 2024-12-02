import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Produit } from '../produit';
import { ProduitService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  product: Produit = {
    id: 0,
    name: '',
    price: 0,
    quantity: 0,
    image: '',
  };

  constructor(private produitService: ProduitService, private router: Router) {}

  addProduct(f:NgForm){
    this.product=f.value;
    this.produitService.addProduct(this.product).subscribe(()=>{
      this.router.navigate(['products']);
    });
  }
}
