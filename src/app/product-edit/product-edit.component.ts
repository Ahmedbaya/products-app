import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../product.service';
import { Produit } from '../produit';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  productId!: number;
  product: Produit = { id: 0, name: '', price: 0, quantity: 0, image: '' };

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.produitService.getProductById(this.productId).subscribe((product) => {
      this.product = product;
    });
  }

  saveProduct(): void {
    this.produitService.updateProduct(this.product.id, this.product).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}
