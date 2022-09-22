import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { PasswordValidation } from 'src/app/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {

  loadingState = true;
  addForm: FormGroup;
  validationMessages: any;
  formErrors = {
    old_password: '',
    password: '',
    confirm_password: '',
    apierror: '',
  };
  submitAttempt = false;
  showLoader = false;

  constructor(
    private router: Router,
    private toast: ToastrService,
    private authService: AuthService,
    private fb: FormBuilder) {
    this.addForm = fb.group({
      old_password: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      confirm_password: [null, Validators.compose([Validators.required])]
    }, {
      validator: PasswordValidation.passwordValidation()
    });
  }

  ngOnInit() {
  }

  submitForm(): void {
    this.submitAttempt = true;
    if (this.addForm.valid) {
      this.showLoader = true;
      const formData = this.addForm.value;
      this.authService.changePassword(formData).subscribe((response) => {
        this.showLoader = false;
        this.submitAttempt = false;
        if (response.success) {
          this.toast.success(response.massage, "Done");
          this.router.navigateByUrl('/profile');
        } else {
          response.error.map(obj => {
            if (obj.hasOwnProperty('old_password')) {
              this.formErrors.old_password = obj.old_password;
            }
            if (obj.hasOwnProperty('confirm_password')) {
              this.formErrors.confirm_password = obj.confirm_password;
            }
            if (!obj.hasOwnProperty('old_password') && !obj.hasOwnProperty('confirm_password')) {
              this.formErrors.apierror = `* ${response.error}`;
            }
          });
        }
      },
        (error) => {
          this.showLoader = false;
          this.submitAttempt = false;
          this.formErrors.apierror = `* Server Error`;
        }
      );
    }
  }

}
