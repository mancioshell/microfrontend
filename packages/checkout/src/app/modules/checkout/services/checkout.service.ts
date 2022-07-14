import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Product } from '../models/product';
import { Http } from "../models/http"

@Injectable({
  providedIn: "root"
})
export class AjaxService {
  client: any;

  constructor(client: Http) {
    this.client = client;
  }

  fetchCheckouts(): Observable<Array<Product>> {
    const fetchCheckouts = new Subject<any>();

    this.client
      .doAjax('GET', '/api/checkouts')
      .then((response: { data: any }) => {
        fetchCheckouts.next(response.data);
        fetchCheckouts.complete();
      })
      .catch((error: any) => {
        fetchCheckouts.error(error);
        fetchCheckouts.complete();
      });
    return fetchCheckouts.asObservable();
  }

  updateCheckoutById(
    checkoutId: number,
    product: Product
  ): Observable<Array<Product>> {
    const updateCheckout = new Subject<any>();

    this.client
      .doAjax(
        'PUT',
        `/api/checkouts/${checkoutId}`,
        {},
        { ...product, count: product.count - 1 }
      )
      .then((response: { data: any }) => {
        updateCheckout.next(response.data);
        updateCheckout.complete();
      })
      .catch((error: any) => {
        updateCheckout.error(error);
        updateCheckout.complete();
      });
    return updateCheckout.asObservable();
  }

  removeCheckoutById(checkoutId: number): Observable<Array<Product>> {
    const removeCheckout = new Subject<any>();

    this.client
      .doAjax('DELETE', `/api/checkouts/${checkoutId}`)

      .then((response: { data: any }) => {
        removeCheckout.next(response.data);
        removeCheckout.complete();
      })
      .catch((error: any) => {
        removeCheckout.error(error);
        removeCheckout.complete();
      });
    return removeCheckout.asObservable();
  }
}
