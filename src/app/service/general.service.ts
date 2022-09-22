import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  API_URL: string = environment.APIEndpoint;

  constructor(
    private http: HttpClient,
  ) { }

  getCategoryList() {
    return this.http.get(`${this.API_URL}/category/site`);
  }
  getBrandList(params) {
    return this.http.get(`${this.API_URL}/brand/site`, { params: params });
  }
  //shop grid
  getProductList(params) {
    return this.http.get(`${this.API_URL}/product/site`, { params: params });
  }
  getsingleproductDetails(id) {
    return this.http.get(`${this.API_URL}/product/site/${id}`,);
  }
  addCustomerReview(data): Observable<any> {
    return this.http.post(`${this.API_URL}/customer-review`, data);
  }
  getCustomerReviewList(param): Observable<any> {
    return this.http.get(`${this.API_URL}/customer-review/site`, { params: param });
  }
  getProductImageList(param): Observable<any> {
    return this.http.get(`${this.API_URL}/product-images/site`, { params: param });
  }
  //wishlist
  addToWishlist(data) {
    return this.http.post(`${this.API_URL}/wishlist`, data);
  }
  checkProductonWishlist(params) {
    return this.http.get(`${this.API_URL}/wishlist/check-product/`, { params: params });
  }
  deleteWishlist(id): Observable<any> {
    return this.http.delete(`${this.API_URL}/wishlist/${id}`);
  }
  getWishlist(param): Observable<any> {
    return this.http.get(`${this.API_URL}/wishlist`, { params: param });
  }

  // cart
  addToCart(data) {
    return this.http.post(`${this.API_URL}/cart`, data);
  }
  checkProductonCart(params) {
    return this.http.get(`${this.API_URL}/cart/check-product/`, { params: params });
  }
  deleteCart(id): Observable<any> {
    return this.http.delete(`${this.API_URL}/cart/${id}`);
  }
  getCartList(param): Observable<any> {
    return this.http.get(`${this.API_URL}/cart`, { params: param });
  }
  editCart(id, data): Observable<any> {
    return this.http.put(`${this.API_URL}/cart/${id}`, data);
  }

  //home
  getBanerList() {
    return this.http.get(`${this.API_URL}/banner/site`);
  }
  getNewProductList(params) {
    return this.http.get(`${this.API_URL}/product/site/new`, { params: params });
  }
  getBranddataList(params) {
    return this.http.get(`${this.API_URL}/brand/all`, { params: params });
  }
  getTopOfferList(params) {
    return this.http.get(`${this.API_URL}/vendor-offers/site-offer`, { params: params });
  }
  addSubscribe(data) {
    return this.http.post(`${this.API_URL}/subscribe/mail`, data);
  }
  //offer
  getOfferList(params) {
    return this.http.get(`${this.API_URL}/vendor-offers/site`, { params: params });
  }

  //checkout
  getCheckOutList(param): Observable<any> {
    return this.http.get(`${this.API_URL}/cart/checkout`, { params: param });
  }
  addOrder(data): Observable<any> {
    return this.http.post(`${this.API_URL}/order/site`, data);
  }
  //order
  getOrderist(param): Observable<any> {
    return this.http.get(`${this.API_URL}/order/site`, { params: param });
  }
  cancleOrder(id, data): Observable<any> {
    return this.http.put(`${this.API_URL}/order/site${id}`, data);
  }
  orderNoPaymentDetails(data): Observable<any> {
    return this.http.post(`${this.API_URL}/order/site/payment`, { data: data });
  }
  //contact

  addFeedback(data): Observable<any> {
    return this.http.post(`${this.API_URL}/feedback/add`, data);
  }
}
