import { Injectable } from '@angular/core';
import { ReplaySubject, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/distinctUntilChanged';
// import { distinctUntilChanged } from 'rxjs/operators';
import { JwtService } from './jwt.service';
import { encryptValue } from '../common';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // for storing current user details
  public currentUserSubject = new BehaviorSubject(null);
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  // for storing current user Default Address details
  public currentUserAddressSubject = new BehaviorSubject(null);
  public currentUserAddress = this.currentUserAddressSubject.asObservable().distinctUntilChanged();

  // for storing current user details
  public currentCartSubject = new BehaviorSubject(null);
  public currentCart = this.currentCartSubject.asObservable().distinctUntilChanged();

  // for checking user is authneticated or not
  public isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  // for storing common lists details
  private commonListSubject = new BehaviorSubject(null);
  public commonList = this.commonListSubject.asObservable().distinctUntilChanged();

  constructor(
    private jwtService: JwtService,
    private commonService: CommonService
  ) { }

  saveToken(token) {
    this.jwtService.saveToken(encryptValue(token));
  }

  saveCommonList(data) {
    this.commonListSubject.next(data);
  }

  setAuth(user) {
    this.saveToken(user.Token);
    this.updateAuth(user.User);
    this.updateCart(user.cart);
    this.updateAddress(user.address)
  }

  updateCart(data) {
    this.currentCartSubject.next(data);
  }
  updateAddress(data) {
    this.currentUserAddressSubject.next(data);
  }
  updateAuth(data) {
    this.currentUserSubject.next(data);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
  }

  commonListApi() {
    this.commonService.commonListApi().subscribe((response: any) => {
      if (response.success) {
        this.saveCommonList(response.data);
      }
    });
  }
}
