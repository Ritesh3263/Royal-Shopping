import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/service/config.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { validateEmailFormControl, CommonFunction, encryptValue, decryptValue, orderno } from 'src/app/common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: FormGroup;
  key
  formErrors = {
    error: null,
    success: null
  };
  showLoader = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fBuilder: FormBuilder,
    private config: ConfigService,
  ) {
    this.config.config = { showHeader: false };
    this.forgotForm = this.fBuilder.group({
      email: [null, Validators.compose([Validators.required, validateEmailFormControl])],
    });
    this.key = String(encryptValue(orderno()));
  }

  ngOnInit() {
  }

  submitForm(): void {
    if (this.forgotForm.valid) {
      this.showLoader = true;
      const formData = {
        email: this.forgotForm.value.email,
        key: this.key
      };
      this.authService.forgotPassword(formData).subscribe((response) => {
        // console.log('In success', response);
        this.showLoader = false;
        if (response.success) {
          this.formErrors.success = `* ${response.message}`;
          CommonFunction.resetForm(this.forgotForm);
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 3000);
        } else {
          this.formErrors.error = `* ${response.error}`;
        }
      },
        (error) => {
          // console.log('In error', error);
          this.formErrors.error = `* ${error.error.error}`;
          this.showLoader = false;
        }
      );
    }
  }

}
