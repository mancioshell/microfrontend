import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AjaxService } from './services/checkout.service';
import { EventService } from './services/event.service';

import { ParcelModule } from 'single-spa-angular/parcel';

import { CheckoutComponent } from './components/checkout.component';
import { ProductComponent } from './components/product.component';

import { routes, CheckoutsResolver } from './checkout.routes';

@NgModule({
  declarations: [CheckoutComponent, ProductComponent],
  imports: [CommonModule, RouterModule.forRoot(routes), ParcelModule],
  providers: [AjaxService, EventService, CheckoutsResolver],
  exports: [RouterModule],
})
export class CheckoutModule {}
