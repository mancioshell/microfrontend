import 'zone.js/dist/zone';

import { enableProdMode, NgZone } from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router, NavigationStart } from '@angular/router';

import { Http } from './app/modules/checkout/models/http';
import { Event } from './app/modules/checkout/models/event';

import {
  singleSpaAngular,
  getSingleSpaExtraProviders,
} from 'single-spa-angular';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// const imports = async (importName: string) => {
//   let [moduleName, componentName] = importName.split('/');
//   // @ts-ignore
//   let app = await System.import(moduleName);
//   let component = await app.get(`./${componentName}`);
//   return component();
// };

const lifecycles = singleSpaAngular({
  bootstrapFunction: async () => {
    let AjaxService, EventService;

    try {      
    
      AjaxService = await import('appshell/AjaxService');
      EventService = await import('appshell/EventService');
    } catch (error) {
      console.log(error);
    }
  
    return platformBrowserDynamic([
      getSingleSpaExtraProviders(),
      { provide: Http, useValue: new Http(AjaxService) },
      {
        provide: Event,
        useValue: new Event(EventService),
      },
    ]).bootstrapModule(AppModule);
  },
  template: '<app-root />',
  Router,
  NavigationStart,
  NgZone,
  // @ts-ignore
  //domElementGetter: () => document.getElementById('app'),
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
