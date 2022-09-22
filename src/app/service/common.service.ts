import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  API_URL: string = environment.APIEndpoint;

  constructor(
    private http: HttpClient,
  ) { }

  commonListApi() {
    return this.http.get(`${this.API_URL}/common-list`);
  }

  countryList(): Observable<any> {
    return this.http.get(`${this.API_URL}/country-list`);
  }
  zipcodeList(params): Observable<any> {
    return this.http.get(`${this.API_URL}/pincode-list`, { params: params });
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.API_URL}/profile`);
  }

  unSelectCompany(): Observable<any> {
    return this.http.get(`${this.API_URL}/deselect-company`);
  }

  logout(): Observable<any> {
    // console.log("Logging out>>>>>>>>>>>")
    return this.http.get(`${this.API_URL}/logout`);
  }

  // User Address
  addAddress(data): Observable<any> {
    return this.http.post(`${this.API_URL}/user-shipping-address`, data);
  }
  getAddressList(params): Observable<any> {
    return this.http.get(`${this.API_URL}/user-shipping-address/site`, { params: params });
  }
  deleteAddress(id): Observable<any> {
    return this.http.delete(`${this.API_URL}/user-shipping-address/${id}`);
  }
  editAddress(id, data): Observable<any> {
    return this.http.put(`${this.API_URL}/user-shipping-address/${id}`, data);
  }
  getAddressListById(id): Observable<any> {
    return this.http.get(`${this.API_URL}/user-shipping-address/${id}`,);
  }
  setDefaultAddress(id): Observable<any> {
    return this.http.get(`${this.API_URL}/user-shipping-address/setdefault/${id}`,);
  }
}
