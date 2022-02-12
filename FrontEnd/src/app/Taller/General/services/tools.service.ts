import {environment} from "../../../../environments/environment";
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
    return this.http.get<any>(environment.apiURL + 'tools/all');
  }

  public getTool(id: number): Observable<any> {
    return this.http.get<any>(environment.apiURL + 'tools/' + id);
  }

  public saveTool(data: ToolsComponent): Observable<any> {
    return this.http.post<any>(environment.apiURL + 'tools/save', data);
  }

  public updateTool(data: ToolsComponent): Observable<any> {
    return this.http.post<any>(environment.apiURL + 'tools/update', data);
  }
}
