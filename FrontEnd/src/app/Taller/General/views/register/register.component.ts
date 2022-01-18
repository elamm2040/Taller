import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CustomValidators} from './custom-validators';
import {
  faExclamationCircle,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import {SignService} from "../../services/sign.service";
import swal from "sweetalert2";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  public formRegister: FormGroup;

  faExclamationCircle = faExclamationCircle;
  faCheckCircle = faCheckCircle;

  toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3500
  });

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private serv: SignService) {
    this.formRegister = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required,
          // check whether the entered password has a number
          CustomValidators.patternValidator(/\d/, {
            hasNumber: true
          }),
          // check whether the entered password has upper case letter
          CustomValidators.patternValidator(/[A-Z]/, {
            hasCapitalCase: true
          }),
          // check whether the entered password has a lower case letter
          CustomValidators.patternValidator(/[a-z]/, {
            hasSmallCase: true
          }),
          // check whether the entered password has a special character
          CustomValidators.patternValidator(
            /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            {
              hasSpecialCharacters: true
            }
          ),
          Validators.minLength(6)]],
        password_confirmation: ['', Validators.required]
      },
      {
        validators: CustomValidators.passwordMatchValidator
      });
  }

  signUp() {
    this.serv.signUp(this.formRegister.value).subscribe(res => {
      if (res.token) {
        this.router.navigate(['/']);
        this.toast.fire({
          icon: 'success',
          title: 'Usuario registrado.'
        });
      } else {
        this.toast.fire({
          icon: 'error',
          title: 'Error al registrar usuario'
        });
      }
      this.formRegister.reset();
    });
  }

}
