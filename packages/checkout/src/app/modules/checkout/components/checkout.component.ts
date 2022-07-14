import { Component, OnInit } from '@angular/core';
import { mountRootParcel } from 'single-spa';
import { AjaxService } from '../services/checkout.service';
import { EventService } from '../services/event.service';

import { ActivatedRoute } from '@angular/router';

import { Product } from '../models/product';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private ajaxService: AjaxService,
    private eventService: EventService
  ) {}

  get productList(): Array<Product> {
    return this._productList;
  }
  get tot(): number {
    return this._tot;
  }

  ngOnInit(): void {
    this._productList = this.route.snapshot.data.checkouts;
    this._tot = this._productList.reduce(
      (acc, next) => acc + next.count * next.price,
      0
    );
  }

  private _productList: Array<Product> = new Array<Product>();
  private _tot: number = 0;

  onRemove(product: Product): void {
    const callback = (product: Product) => {
      this._productList = this._productList
        .map((elem: Product) => {
          return elem.id === product.id
            ? { ...elem, count: elem.count - 1 }
            : elem;
        })
        .filter((elem: Product) => elem.count > 0);

      this._tot = this._tot - product.price;
      this.eventService.removeProductFromCheckout(product);
    };

    if (product.count > 1) {
      this.ajaxService.updateCheckoutById(product.id, product).subscribe(() => {
        callback(product);
      });
    } else {
      this.ajaxService.removeCheckoutById(product.id).subscribe(() => {
        callback(product);
      });
    }
  }

  async config() {
    return import('cart/Cart');
  }

  mountRootParcel = mountRootParcel;
}
