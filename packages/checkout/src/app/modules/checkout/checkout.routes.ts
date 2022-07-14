import { Routes, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CheckoutComponent } from './components/checkout.component';
import { Product } from './models/product';
import { AjaxService } from './services/checkout.service';

@Injectable()
export class CheckoutsResolver implements Resolve<Observable<Array<Product>>> {
  constructor(private service: AjaxService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.fetchCheckouts();
  }
}

export const routes: Routes = [
  {
    path: `checkout`,
    component: CheckoutComponent,
    resolve: {
      checkouts: CheckoutsResolver,
    },
  },
];
