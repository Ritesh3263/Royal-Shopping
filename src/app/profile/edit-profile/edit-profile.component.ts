declare var swal: any, $;
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';
import { AuthService } from 'src/app/service/auth.service';
import { validateEmailFormControl } from 'src/app/common';
import { errorMessage } from 'src/app/messages';
import { isNumber } from 'util';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html'
})
export class EditProfileComponent implements OnInit {

  currentUserDetail: any;
  addForm: FormGroup;
  addressForm: FormGroup;

  formErrors = {
    email: '',
    first_name: '',
    last_name: '',
    apierror: '',
    phone_number: ''
  };

  showLoader = false;
  showLoaderr = false;
  selecteFile: File = null;
  editImageUrl: any = null;
  stateListArray: Array<any> = [];
  cityListArray: Array<any> = [];
  currentCompanyDetail: any = null;
  countryListArray: any;
  pincodeListArray: any;
  isEditing = false;
  editId = null;
  addressList: any = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataService,
    private authService: AuthService,
    private commonService: CommonService,) {

    this.addForm = fb.group({
      user_name: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, validateEmailFormControl])],
      first_name: [null, Validators.compose([Validators.required])],
      last_name: [null, Validators.compose([Validators.required])],
      phone_number: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(15)])],
    });
    this.addressForm = fb.group({
      name: [null, Validators.compose([Validators.required])],
      country: [null, Validators.compose([Validators.required])],
      street_address: [null, Validators.compose([Validators.required])],
      state: [null, Validators.compose([Validators.required])],
      pincode: [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(8)])],
      dial_code: [null, Validators.compose([Validators.required])],
      taluk: [null, Validators.compose([Validators.required])],
      district: [null, Validators.compose([Validators.required])],
      city: [null, Validators.compose([Validators.required])],
      is_default: [false, Validators.compose([Validators.required])],
      phone_number: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(15)])],
    });
  }

  ngOnInit() {
    this.setuserData();
    this.getCountryList();
    this.getUseraddress();
  }

  setDileCode(data) {
    if (data.phone_code && data) {
      this.addressForm.patchValue({ dial_code: data.phone_code })
    }
  }
  getCountryList() {
    this.commonService.countryList().subscribe((res) => {
      if (res.success) {
        this.countryListArray = res.data;
      }
    });

  }

  getpincode(data) {
    if (data.target.value && !isNaN(Number(data.target.value))) {
      if (data.target.value.length > 5) {
        this.commonService.zipcodeList({ pincode: data.target.value }).subscribe((res) => {
          if (res.success) {
            this.pincodeListArray = res.data;
            this.pincodeListArray.filter((obj, i) => {
              this.pincodeListArray[i].label = obj.office_name + " - " + obj.pincode;
            });
            this.removeaddress();
            this.setaddress(this.pincodeListArray[0])
          }
        });
      }
    }
  }

  setaddress(data) {
    if (data && data.label) {
      this.addressForm.patchValue({
        street_address: data.label,
        state: data.state_name,
        pincode: data.pincode,
        taluk: data.taluk,
        district: data.district_name,
      })
    }
  }
  removeaddress() {
    this.addressForm.patchValue({
      street_address: '',
      city: '',
      state: '',
      pincode: '',
      taluk: '',
      district: '',
    })
  }
  setuserData() {
    this.dataService.currentUser.subscribe((currentUser) => {
      if (currentUser) {
        this.currentUserDetail = currentUser;
        this.editImageUrl = currentUser['image'],
          this.addForm.patchValue({
            first_name: this.currentUserDetail.first_name,
            last_name: this.currentUserDetail.last_name,
            user_name: this.currentUserDetail.name,
            email: this.currentUserDetail.email,
            phone_number: this.currentUserDetail.phone_number
          });
      }
    });
  }

  getProfile() {
    this.commonService.getProfile().subscribe((response) => {
      if (response.success) {
        this.dataService.updateAuth(response.data.User);
        this.dataService.updateCart(response.data.cart);
        this.dataService.updateAddress(response.data.address);
      }
    }, (error) => {
      this.dataService.purgeAuth();
    });
  }

  fileChangeEvent(fileInput: any) {
    const reg = /(.*?)\.(jpg|jpeg|png|gif|giff)$/;
    if (!fileInput.target.files[0].name.match(reg)) {
      swal.fire(
        'Invalid File!',
        'Please select valid file ',
        'error'
      );
      this.removeFile();
      return false;
    } else {
      this.removeFile();
      this.selecteFile = fileInput.target.files[0];
      // console.log("selecteFile", this.selecteFile);

    }
  }

  removeFile() {
    this.selecteFile = null;
  }

  submitForm(formdata: any): void {
    if (formdata.valid) {
      this.showLoader = true;
      const formData = new FormData();
      formData.append('user_name', formdata.value.user_name);
      formData.append('email', formdata.value.email);
      formData.append('first_name', formdata.value.first_name);
      formData.append('last_name', formdata.value.last_name);
      formData.append('phone_number', formdata.value.phone_number);
      if (this.selecteFile) {
        formData.append('file', this.selecteFile);
      }
      this.authService.editProfile(formData).subscribe((response) => {
        this.showLoader = false;
        if (response.success) {
          this.getProfile();
          this.router.navigateByUrl('/profile');
        } else {
          response.error.map(obj => {
            // console.log(obj);

            if (obj.hasOwnProperty('email')) {
              this.formErrors.email = obj.email;
            } else {
              this.formErrors.apierror = `* ${response.error}`;
            }
          });
        }
      },
        (error) => {
          this.showLoader = false;
          this.formErrors.apierror = `* Server Error`;
        });
    }
  }
  toogleAddress() {
    document.getElementById("useraddress").click();
    this.addressForm.reset();
    this.showLoaderr = false;
    this.showLoader = false;
  }

  editObject(data) {
    this.isEditing = true;
    this.editId = data.id;
    if (data) {
      this.toogleAddress();
      this.addressForm.patchValue({
        street_address: data.street_address,
        state: data.state,
        phone_number: data.phone_number,
        pincode: data.pincode,
        taluk: data.taluk,
        district: data.district,
        city: data.city,
        name: data.name,
        dial_code: data.dial_code,
        country: data.country
      });
    }
  }

  submitAddressForm(formdata): void {
    if (this.addForm.valid) {
      this.showLoaderr = true;
      if (this.isEditing) {
        this.commonService.editAddress(this.editId, formdata.value).subscribe((response) => {
          this.showLoaderr = false;
          if (response.success) {
            this.isEditing = false;
            this.editId = null
            this.toogleAddress();
            this.getUseraddress();
          } else {
            this.showLoaderr = false;
          }
        });
      } else {
        this.commonService.addAddress(formdata.value).subscribe((response) => {
          this.showLoaderr = false;
          if (response.success) {
            this.toogleAddress();
            this.getUseraddress();
          } else {
            this.showLoaderr = false;
          }
        });
      }
    }
  }

  getUseraddress() {
    this.commonService.getAddressList({}).subscribe((res) => {
      if (res.success) {
        this.addressList = res.data;
      }
    });
  }

  deleteObject(object) {
    swal.fire({
      title: errorMessage.delete_header_text,
      text: errorMessage.delete_smalll_text,
      icon: errorMessage.delete_dialogue_type,
      showCancelButton: true,
      confirmButtonText: errorMessage.delete_confirm_button,
      cancelButtonText: errorMessage.delete_cancel_button,
    }).then((result) => {
      if (result.value) {
        this.commonService.deleteAddress(object.id).subscribe(
          (response) => {
            if (response.success) {
              this.getUseraddress();
            }
          },
        );
      }
    }).catch(swal.noop);
  }

  setDefaultAddress(id) {
    if (id) {
      this.commonService.setDefaultAddress(id).subscribe((res) => {
        if (res.success) {
          this.getUseraddress();
          this.getProfile();
        }
      });
    }
  }

}
