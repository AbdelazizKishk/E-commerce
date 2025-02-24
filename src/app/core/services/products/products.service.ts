import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/products`);
  }
  getSpecificProducts(id: string | null): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/products/${id}`);
  }
}
