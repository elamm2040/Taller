import {Component} from '@angular/core';
import {navItems} from '../_nav';
import {SignService} from "../../services/sign.service";
import {Token} from "../../models/token";
import {Router} from "@angular/router";
import swal from "sweetalert2";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3500
  });
  token: Token;

  constructor(private router: Router,
              private serv: SignService) {
    if (localStorage.getItem('user')) {
      this.token = Token.fromJson(JSON.parse(localStorage.getItem('user')!));
    } else {
      this.token = Token.fromJson({});
    }
  }

  toggleMinimize(e: any) {
    this.sidebarMinimized = e;
  }

  logOut() {
    this.serv.signOut(this.token.token).subscribe(res => {
      this.toast.fire({
        icon: 'success',
        title: 'Sesión cerrada.'
      });
      localStorage.clear();
      this.router.navigate(['/']);
    });
  }
}
