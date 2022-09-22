import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../service/general.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
  feedbackForm: FormGroup;
  formErrors = {
    apierror: null
  };
  constructor(
    private generalService: GeneralService,
    private router: Router,
    private fBuilder: FormBuilder,
    private toast: ToastrService
  ) {
    this.feedbackForm = this.fBuilder.group({
      emaill: [null, Validators.compose([Validators.required, Validators.email])],
      firstname: [null, Validators.compose([Validators.required])],
      lastname: [null, Validators.compose([Validators.required])],
      phone: [null, Validators.compose([Validators.required])],
      feedback_subject: [null, Validators.compose([Validators.required])],
      feedback_massage: [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
  }

  submitForm(): void {
    if (this.feedbackForm.valid) {
      this.generalService.addFeedback(this.feedbackForm.value).subscribe((response) => {
        if (response.success) {
          this.toast.success("feedback sent successfully");
          this.feedbackForm.reset();
          this.router.navigateByUrl('/home');
        } else {
          this.toast.error("feedback not sent");
          this.formErrors.apierror = `* ${response.error}`;
        }
      }, (error) => {
        // console.log('In error', error);
        this.toast.error("feedback not sent");
        this.formErrors.apierror = `* ${error.error.error}`;
      });
    }
  }
}
