import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/service/config.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CommonFunction, PasswordValidation } from 'src/app/common';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  formErrors = {
    error: null,
    success: null,
  };
  showLoader = false;
  token: any = null;

  constructor(
    private config: ConfigService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private fBuilder: FormBuilder,
  ) {
    this.config.config = { showHeader: false };
    this.token = this.activatedRoute.snapshot.paramMap.get('r_p');
    this.resetPasswordForm = this.fBuilder.group({
      password: [null, Validators.compose([Validators.required])], // validatePassword
      confirm_password: [null, Validators.compose([Validators.required])],
    }, {
      validator: PasswordValidation.passwordValidation()
    });
  }

  ngOnInit() {
    // console.log(this.token);

    this.authService.checkResetPasswordToken(String(this.token)).subscribe((response) => {
      if (response.success) {
      } else {
        this.router.navigateByUrl('/link-expired');
      }
    }, (error) => {
      this.router.navigateByUrl('/link-expired');
    });
  }

  submitForm(): void {
    if (this.resetPasswordForm.valid) {
      this.showLoader = true;
      const formData = {
        password: this.resetPasswordForm.value.password,
        confirm_password: this.resetPasswordForm.value.confirm_password,
        token: this.token
      };
      this.authService.resetPassword(formData).subscribe((response) => {
        // console.log('In success', response);
        this.showLoader = false;
        if (response.success) {
          this.formErrors.success = `* ${response.massage}`;
          CommonFunction.resetForm(this.resetPasswordForm);
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 3000);
        } else {
          this.formErrors.error = `* ${response.error}`;
        }
      }, (error) => {
        // console.log('In error', error);
        this.formErrors.error = `* ${error.error.error}`;
        this.showLoader = false;
      });
    }
  }

}
