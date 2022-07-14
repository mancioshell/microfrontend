import { Component, Output, Input, EventEmitter } from '@angular/core';

import { Product } from '../models/product';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
})
export class ProductComponent {
  urlImg: String = '';
  @Input() product: Product = new Product();
  @Output() remove: EventEmitter<any> = new EventEmitter();

  removeProduct(event: Event, product: Product): void {
    event.preventDefault();
    this.remove.emit(product);
  }

  ngOnInit() {
    this.urlImg = `/microfrontend/products/img/${this.product.img}.png`;
  }
}
