import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { APP_BASE_HREF } from '@angular/common';

import { EmptyRouterModule } from './modules/empty-route/empty-routing.module';
import { CheckoutModule } from './modules/checkout/checkout.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, CheckoutModule, EmptyRouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
