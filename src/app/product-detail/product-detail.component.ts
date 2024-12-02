import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from '../produit';
import { ProduitService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId!: number;
  product?: Produit;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!; // Getting the 'id' from route params
    this.loadProductDetail();
  }

  loadProductDetail(): void {
    this.produitService.getProductById(this.productId).subscribe({
      next: (product) => {
        this.product = product; // Successfully received product data
      },
      error: (err) => {
        this.errorMessage = 'Product not found'; // Handle errors (e.g., if product doesn't exist)
        console.error('Error fetching product: ', err);
      }
    });
  }

  goBackToProductList(): void {
    this.router.navigate(['/products']); // Navigate to the product list
  }
}
