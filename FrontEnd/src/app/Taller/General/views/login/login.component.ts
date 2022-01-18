import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import swal from "sweetalert2";
import {CustomValidators} from "../register/custom-validators";
import {Router} from "@angular/router";
import {SignService} from "../../services/sign.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  public formLogin: FormGroup;

  toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3500
  });

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private serv: SignService) {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  signIn() {
    this.serv.signIn(this.formLogin.value).subscribe(res => {
      if (res.token) {
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/workshop']);
        this.toast.fire( {
          icon: 'success',
          title: 'Bienvenido ' + res.user.name
        });
      } else {
        this.toast.fire({
          icon: 'error',
          title: 'Error al ingresar.'
        });
      }
      this.formLogin.reset();
    });
  }
}
