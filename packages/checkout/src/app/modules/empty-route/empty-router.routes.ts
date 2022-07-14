import { Routes } from '@angular/router';

import { EmptyRouterComponent } from './components/empty-router.component';

export const routes: Routes = [{ path: '**', component: EmptyRouterComponent }];
