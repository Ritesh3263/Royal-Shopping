import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/service/config.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { validateEmailFormControl, CommonFunction } from 'src/app/common';
import { DataService } from 'src/app/service/data.service';
import { CommonService } from 'src/app/service/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  RegisterForm: FormGroup;
  formErrors = {
    apierror: null
  };
  formError = {
    apierror: null
  };
  showLoader = false;
  showLoaderr = false;
  currentCompany: any = null;
  loginType = 'email'
  constructor(
    private config: ConfigService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private toast: ToastrService,
    private fBuilder: FormBuilder,
    private dataService: DataService
  ) {
    this.config.config = { showHeader: false };
    this.loginForm = this.fBuilder.group({
      email: [null, Validators.compose([Validators.required, validateEmailFormControl])],
      password: [null, Validators.compose([Validators.required])], // validatePassword
    });
    this.RegisterForm = this.fBuilder.group({
      email: [null, Validators.compose([Validators.required, validateEmailFormControl])],
      password: [null, Validators.compose([Validators.required])], // validatePassword
      name: [null, Validators.compose([Validators.required])],
    });
    // this.dataService.currentCompany.subscribe(response => {
    //   // console.log(response);
    //   this.currentCompany = response;
    // });
  }

  ngOnInit() {
  }

  changeLoginType(type) {
    this.loginType = type;
  }

  getLoginType(type) {
    this.loginType = type;
  }

  removeError() {
    this.formErrors.apierror = null;
    this.formError.apierror = null
  }
  submitForm(): void {
    if (this.loginForm.valid) {
      this.showLoader = true;
      const formData = {
        email: this.loginForm.value.email.toLowerCase(),
        password: this.loginForm.value.password,
        remember_me: this.loginForm.value.remember_me,
      };
      this.authService.login(formData).subscribe((response) => {
        // console.log('In success', response);
        this.showLoader = false;
        if (response.success) {
          CommonFunction.resetForm(this.loginForm);
          const user = response.data.User;
          this.dataService.setAuth(response.data);
          this.config.config = { showHeader: true };
          this.activatedRoute.snapshot.queryParamMap.get('next');
          const nextURL = this.activatedRoute.snapshot.queryParamMap.get('next') ?
            this.activatedRoute.snapshot.queryParamMap.get('next') : '/home';
          this.router.navigateByUrl(nextURL);
          this.toast.success(user.name, "Wellcome Back")
        } else {
          this.formErrors.apierror = `* ${response.error}`;
        }
      }, (error) => {
        // console.log('In error', error);
        this.formErrors.apierror = `* ${error.error.error}`;
        this.showLoader = false;
      });
    }
  }

  submitRegisterForm(): void {
    if (this.RegisterForm.valid) {
      this.showLoaderr = true;
      const formData = {
        email: this.RegisterForm.value.email.toLowerCase(),
        password: this.RegisterForm.value.password,
        name: this.RegisterForm.value.name,
        type: { value: 0, label: 'normal_user' }
      };
      this.authService.register(formData).subscribe((response) => {
        // console.log('In success', response);
        this.showLoaderr = false;
        if (response.success) {
          CommonFunction.resetForm(this.RegisterForm);
          this.dataService.saveToken(response.token);
          this.config.config = { showHeader: true };
          this.activatedRoute.snapshot.queryParamMap.get('next');
          const nextURL = this.activatedRoute.snapshot.queryParamMap.get('next') ?
            this.activatedRoute.snapshot.queryParamMap.get('next') : '/home';
          this.router.navigateByUrl(nextURL);
          window.location.reload();
          this.toast.success("Registration Done", "Welcome")
        } else {
          this.formError.apierror = `* ${response.error}`;
        }
      }, (error) => {
        // console.log('In error', error);
        this.formError.apierror = `* ${error.error.error}`;
        this.showLoaderr = false;
      });
    }
  }
}
