import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from './produit'; // Correct path for the 'Produit' model

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  private apiUrl = 'http://localhost:3000/products/'; // Base URL for the JSON server

  constructor(private http: HttpClient) {}

  /**
   * Fetch all products from the API
   */
  public getProducts(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl);
  }

  /**
   * Fetch a product by its ID
   * @param id - ID of the product to retrieve
   */
  public getProductById(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiUrl}${id}`);
  }

  /**
   * Add a new product to the API
   * @param produit - Product object to add
   */
  public addProduct(produit: Produit): Observable<Produit> {
    // Exclude 'id' field
    const { id, ...productWithoutId } = produit;
    return this.http.post<Produit>(this.apiUrl, productWithoutId);
  }
  

  /**
   * Delete a product by its ID
   * @param id - ID of the product to delete
   */
  public deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }

  /**
   * Update a product by its ID
   * @param id - ID of the product to update
   * @param produit - Updated product object
   */
  public updateProduct(id: number, produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}${id}`, produit);
  }
}
