import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../app/produit';

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  private host = 'http://localhost:3000/produits/'; 

  constructor(private client: HttpClient) {}

  public getProducts(): Observable<Produit[]> {
    return this.client.get<Produit[]>(this.host);
  }

  public getProductById(id: number): Observable<Produit> {
    return this.client.get<Produit>(`${this.host}${id}`);
  }

  public deleteProduct(id: number): Observable<void> {
    return this.client.delete<void>(`${this.host}${id}`);
  }
  public addProduct(produit: Produit): Observable<Produit> {
    const { id, ...productWithoutId } = produit;
    console.log("Adding product:", productWithoutId);
    return this.client.post<Produit>(this.host, productWithoutId);
  }
  
  
  public updateProduct(id: number, produit: Produit): Observable<Produit> {
    return this.client.put<Produit>(`${this.host}${id}`, produit);
  }
  
}
