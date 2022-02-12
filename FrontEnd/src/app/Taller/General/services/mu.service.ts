import {environment} from "../../../../environments/environment";
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MeasurementUnitComponent} from "../../components/measurement-unit/measurement-unit.component";
import {EditMUComponent} from "../../components/measurement-unit/edit-mu/edit-mu.component";

@Injectable({
  providedIn: 'root'
})
export class MUService {

  constructor(private http: HttpClient) {
  }

  public getAllMUs(): Observable<any> {
    return this.http.get<any>(environment.apiURL + 'mu/all');
  }

  public getMU(id: number): Observable<any> {
    return this.http.get<any>(environment.apiURL + 'mu/' + id);
  }

  public saveMUs(data: any): Observable<any> {
    return this.http.post<any>(environment.apiURL + 'mu/save', data);
  }

  public updateMU(data: EditMUComponent): Observable<any> {
    return this.http.post<any>(environment.apiURL + 'mu/update', data);
  }
}
