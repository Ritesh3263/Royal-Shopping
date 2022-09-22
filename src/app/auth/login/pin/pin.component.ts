import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CommonFunction } from 'src/app/common';
import { ConfigService } from 'src/app/service/config.service';
import { DataService } from 'src/app/service/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html'
})
export class PinComponent implements OnInit {

  @Input() currentCompany: any = [];
  @Output() setLoginType = new EventEmitter<any>();
  loginForm: FormGroup;
  otpForm: FormGroup;
  pinForm: FormGroup;
  formErrors = {
    phone_number: null,
    otp: null,
    login_pin: null,
    apierror: null
  };
  phone_number: any = null;
  dial_code: any = null;
  company_id: any = null;
  showLoader = false;
  loginPinType: any = 1; // 1=> get mobile no. |  2=> verify otp | 3=> check pin | 4=> set pin
  constructor(
    private router: Router,
    private config: ConfigService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private fBuilder: FormBuilder,
    private toastrService: ToastrService,
    private dataService: DataService
  ) {
    this.loginForm = this.fBuilder.group({
      phone_number: [null, Validators.compose([Validators.required])],
    });
    this.otpForm = this.fBuilder.group({
      otp: [null, Validators.compose([Validators.required])],
    });
    this.pinForm = this.fBuilder.group({
      login_pin: [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4)])],
    });

  }

  ngOnInit() {
    if (this.currentCompany) {


      this.dial_code = this.currentCompany.dial_code;
      this.company_id = this.currentCompany.company_id;
    }
  }

  changeLoginType(type) {
    this.setLoginType.emit(type);
  }

  resetForm() {
    CommonFunction.resetForm(this.otpForm);
    CommonFunction.resetForm(this.loginForm);
    this.formErrors.login_pin = null;
    this.formErrors.otp = null;
    this.formErrors.phone_number = null;
    this.formErrors.apierror = null;
  }


  submitForm(): void {
    if (this.loginForm.valid) {
      this.loginPinType = 2;
      this.showLoader = true;
      this.phone_number = this.loginForm.value.phone_number;
      const formData = {
        phone_number: this.phone_number,
        dial_code: this.dial_code,
        company_id: this.company_id,
      };
      this.authService.phonelogin(formData).subscribe((response) => {
        this.showLoader = false;
        if (response.success) {
          this.resetForm();
          if (response.data.verify_otp) {
            this.loginPinType = 2;
          }
          if (response.data.login_pin) {
            this.loginPinType = 3;
          }
        } else {
          this.formErrors.apierror = `* ${response.error}`;
        }
      }, (error) => {
        // console.log('In error', error);
        this.formErrors.apierror = `* ${error.error}`;
        this.showLoader = false;
      });

    }
  }

  submitOtpForm(): void {
    if (this.otpForm.valid) {
      this.showLoader = true;
      const formData = {
        phone_number: this.phone_number,
        dial_code: this.dial_code,
        company_id: this.company_id,
        otp: parseInt(this.otpForm.value.otp)
      };
      this.authService.otpverify(formData).subscribe((response) => {
        this.showLoader = false;
        if (response.success) {
          this.resetForm();
          if (response.data.login_pin) {
            this.loginPinType = 4;
          }

        } else {
          this.formErrors.apierror = `* ${response.error}`;
        }
      }, (error) => {
        this.formErrors.apierror = `* ${error.error}`;
        this.showLoader = false;
      });
    }
  }

  // submitPINForm(): void {
  //   if (this.pinForm.valid) {
  //     this.showLoader = true;
  //     const formData = {
  //       phone_number: this.phone_number,
  //       dial_code: this.dial_code,
  //       company_id: this.company_id,
  //       login_pin: this.pinForm.value.login_pin,
  //       pin_action: (this.loginPinType == 4) ? 1 : 2
  //     };
  //     this.authService.loginPin(formData).subscribe((response) => {
  //       this.showLoader = false;
  //       if (response.success) {
  //         const user = response.data.User;
  //         this.dataService.setAuth(response.data);
  //         // if (user.is_superuser) {
  //         //   this.dataService.purgeCompany();
  //         // }
  //         this.config.config = { showHeader: true };
  //         this.activatedRoute.snapshot.queryParamMap.get('next');
  //         const nextURL = this.activatedRoute.snapshot.queryParamMap.get('next') ?
  //           this.activatedRoute.snapshot.queryParamMap.get('next') : '/dashboard';
  //         this.router.navigateByUrl(nextURL);
  //       } else {
  //         this.formErrors.apierror = `* ${response.error}`;
  //       }
  //     }, (error) => {
  //       this.formErrors.apierror = `* ${error.error}`;
  //       this.showLoader = false;
  //     });

  //   }
  // }

  // forgotLoginPin() {
  //   const formData = {
  //     phone_number: this.phone_number,
  //     dial_code: this.dial_code,
  //     company_id: this.company_id,
  //   };
  //   this.authService.forgotLoginPin(formData).subscribe((response) => {
  //     this.showLoader = false;
  //     if (response.success) {
  //       this.resetForm();
  //       this.formErrors.phone_number = 'Please enter phone number to reset PIN'
  //       this.loginPinType = 1;
  //     } else {
  //       this.formErrors.apierror = `* ${response.error}`;
  //     }
  //   });
  // }

  resendOTP() {
    this.showLoader = true;
    const formData = {
      phone_number: this.phone_number,
      dial_code: this.dial_code,
      company_id: this.company_id,
    };
    this.authService.resendotp(formData).subscribe((response) => {
      this.showLoader = false;
      if (response.success) {
        this.resetForm();
        this.toastrService.success('OTP sent successfully', '');
      } else {
        this.formErrors.apierror = `* ${response.error}`;
      }
    }, (error) => {
      this.formErrors.apierror = `* ${error.error}`;
      this.showLoader = false;
    });
  }
}
