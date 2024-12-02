import { Component } from '@angular/core';
import { ProduitService } from '../product.service';
import { Router } from '@angular/router';
import { Produit } from '../produit';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  showImages: boolean = true;
  search: string = '';
  products: Produit[] = []; // Initialize as empty, data will be fetched

  constructor(private produitService: ProduitService
    , private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch products when the component is initialized
    this.produitService.getProducts().subscribe((data: Produit[]) => {
      this.products = data;
    });
  }

  getcouleur(c: number): string {
    return c <= 0 ? 'red' : 'black';
  }

  toggleImages(): void {
    this.showImages = !this.showImages;
  }

  filteredProducts() {
    return this.products.filter(product =>
      product.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  deleteProduct(id: number): void {
    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Call service to delete the product
        this.produitService.deleteProduct(id).subscribe(() => {
          // After deleting, filter out the deleted product from the list
          this.products = this.products.filter(product => product.id !== id);

          // Show success confirmation dialog
          Swal.fire({
            title: 'Deleted!',
            text: 'Your product has been deleted.',
            icon: 'success'
          });
        });
      }
    });
  }
  editProduct(id: number): void {
    this.router.navigate(['/edit', id]);
  }
}
