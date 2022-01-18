import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ToolsComponent} from "../../components/tools/tools.component";

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(private http: HttpClient) {
  }

  public getAllTools(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/api/tools/all');
  }

  public getTool(id: number): Observable<any> {
    return this.http.get<any>('http://localhost:8000/api/tools/' + id);
  }

  public saveTool(data: ToolsComponent): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/tools/save', data);
  }

  public updateTool(data: ToolsComponent): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/tools/update', data);
  }
}
