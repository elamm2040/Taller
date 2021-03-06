import {environment} from "../../../../environments/environment";
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegisterComponent} from "../views/register/register.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SignService {

  constructor(private http: HttpClient) {
  }

  public signUp(register: RegisterComponent): Observable<any> {
    return this.http.post<any>(environment.apiURL + 'register', register);
  }

  public signIn(signIn: RegisterComponent): Observable<any> {
    return this.http.post<any>(environment.apiURL + 'login', signIn);
  }

  public signOut(signOut: any): Observable<any> {
    return this.http.post<any>(environment.apiURL + 'logout', signOut);
  }

  public stillIn(stillIn: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${stillIn}`
      })
    }
    return this.http.post<any>(environment.apiURL + 'stillin', '', httpOptions);
  }
}
