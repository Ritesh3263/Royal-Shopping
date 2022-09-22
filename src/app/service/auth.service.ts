import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {

  API_URL: string = environment.APIEndpoint;

  constructor(
    private http: HttpClient,
  ) { }

  checkResetPasswordToken(token): Observable<any> {
    return this.http.get(`${this.API_URL}/reset-password`, { params: { token: token } });
  }

  login(data): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, data);
  }

  register(data): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, data);
  }

  forgotPassword(data): Observable<any> {
    return this.http.post(`${this.API_URL}/forgot-password`, data);
  }

  resetPassword(data): Observable<any> {
    return this.http.post(`${this.API_URL}/reset-password/`, data);
  }

  changePassword(data): Observable<any> {
    return this.http.post(`${this.API_URL}/change-password`, data);
  }

  editProfile(data): Observable<any> {
    return this.http.put(`${this.API_URL}/profile`, data);
  }

  phonelogin(data): Observable<any> {
    return this.http.post(`${this.API_URL}/phone-login`, data);
  }

  otpverify(data): Observable<any> {
    return this.http.post(`${this.API_URL}/otp-verify`, data);
  }

  resendotp(data): Observable<any> {
    return this.http.post(`${this.API_URL}/otp-resend`, data);
  }



}
