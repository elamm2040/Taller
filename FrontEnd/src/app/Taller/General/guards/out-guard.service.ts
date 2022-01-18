import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {Location} from '@angular/common';
import {Observable} from "rxjs";
import {SignService} from "../services/sign.service";
import {Token} from "../models/token";

@Injectable()
export class OutGuardService implements CanActivate {

  toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3500
  });
  swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success mr-1',
      cancelButton: 'btn btn-danger ml-1'
    },
    buttonsStyling: false,
    showCancelButton: true,
  });
  token: Token;

  constructor(private router: Router,
              private location: Location,
              private serv: SignService) {
    if (localStorage.getItem('user')) {
      this.token = Token.fromJson(JSON.parse(localStorage.getItem('user')!));
    } else {
      this.token = Token.fromJson({});
    }
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('user')) {
      this.serv.stillIn(this.token.token).subscribe(res => {
        if (res.error) {
          localStorage.clear();
        } else {
          this.swalWithBootstrapButtons.fire({
            title: 'Si quieres salir, cierra sesión primero.',
            text: '¿Quieres cerrar sessión?',
            icon: 'error',
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
          }).then(result => {
            if (result.value) {
              this.serv.signOut(this.token.token).subscribe(res => {
                localStorage.clear();
                this.toast.fire({
                  icon: 'success',
                  title: 'Sesión cerrada.'
                });
              });
            } else {
              this.location.back();
            }
          });
        }
      });
    }

    return true;
  }
}
