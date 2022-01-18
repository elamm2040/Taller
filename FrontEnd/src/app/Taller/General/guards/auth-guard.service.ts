import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot} from '@angular/router';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {SignService} from "../services/sign.service";
import {Token} from "../models/token";

@Injectable()
export class AuthGuardService implements CanActivateChild {

  toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3500
  });
  token: Token;

  constructor(private router: Router,
              private http: HttpClient,
              private serv: SignService) {
    if (localStorage.getItem('user')) {
      this.token = Token.fromJson(JSON.parse(localStorage.getItem('user')!));
    } else {
      this.token = Token.fromJson({});
    }
  }

  canActivateChild(next: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.token.token != '') {
      this.serv.stillIn(this.token.token).subscribe(res => {
        if (res.error) {
          if (res.error == 'token_expired') {
            localStorage.clear();
            this.toast.fire({
              icon: 'error',
              title: 'La sesión caduco.'
            });
          } else {
            this.toast.fire({
              icon: 'error',
              title: 'No tienes permiso de estar aqui.'
            });
          }
          this.router.navigate(['/']);
        }
      });
    } else {
      this.toast.fire({
        icon: 'error',
        title: 'No tienes permiso de estar aqui.'
      });
      this.router.navigate(['/']);
    }

    return true;
  }
}
