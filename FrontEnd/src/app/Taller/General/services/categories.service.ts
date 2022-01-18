import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BreadcrumbCategoriesComponent} from "../../components/categories/breadcrumb-categories/breadcrumb-categories.component";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) {
  }

  public getAllCategories(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/api/categories/all');
  }

  public getChildrenCategories(id: any): Observable<any> {
    return this.http.get<any>('http://localhost:8000/api/categories/children/' + id);
  }

  public getParentCategories(id: any): Observable<any> {
    return this.http.get<any>('http://localhost:8000/api/categories/parent/' + id);
  }

  public saveCategory(data: BreadcrumbCategoriesComponent): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/categories/save', data);
  }

  public updateCategory(data: BreadcrumbCategoriesComponent): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/categories/update', data);
  }
}
