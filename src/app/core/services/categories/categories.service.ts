import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/categories`);
  }
  getSpecificCategories(id: string | null): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/categories/${id}`);
  }
  /* getAllSubcategories(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/subcategories`);
  }
  getSpecificSubCategory(id: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/subcategories/${id}`);
  } */
}
