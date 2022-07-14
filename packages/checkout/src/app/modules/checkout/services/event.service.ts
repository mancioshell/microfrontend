import { Injectable } from '@angular/core';

import { Product } from '../models/product';
import { Event } from "../models/event"

@Injectable({
  providedIn: "root"
})
export class EventService {
  constructor(private event: Event) {
    this.event = event;
  }

  removeProductFromCheckout(product: Product): void {
    this.event.removeProductFromCart(product);
  }
}
