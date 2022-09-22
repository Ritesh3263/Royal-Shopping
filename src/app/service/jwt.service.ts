import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  getToken(): string {
    return window.localStorage['_auth_royal_shopping'];
  }

  saveToken(token: string) {
    // console.log("token");
    
    window.localStorage['_auth_royal_shopping'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('_auth_royal_shopping');
  }

  getGoogleToken(): string {
    return String('AIzaSyCGc_953CXwgs8gzIwJsJ4yj7rz-vgl5ww'); // window.localStorage['google_token'];
  }

  saveValue(name, value) {
    window.localStorage[name] = value;
  }

  destroyValue(name) {
    window.localStorage.removeItem(name);
  }

  getValue(name): string {
    return window.localStorage[name]; // window.localStorage['google_token'];
  }
}
