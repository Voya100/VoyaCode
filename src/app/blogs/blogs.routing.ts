import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from './blog/blog.component';
import { BlogsComponent } from './blogs.component';
import { BlogSubscribeConfirmComponent } from './subscribe-confirm/blog-subscribe-confirm.component';
import { BlogSubscribeComponent } from './subscribe/blog-subscribe.component';
import { BlogUnsubscribeComponent } from './unsubscribe/blog-unsubscribe.component';

const routes: Routes = [
  { path: '', component: BlogsComponent },
  { path: 'subscribe', component: BlogSubscribeConfirmComponent },
  { path: 'subscribe/:email', component: BlogSubscribeComponent },
  { path: 'unsubscribe/:email', component: BlogUnsubscribeComponent },
  { path: ':id', component: BlogComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
