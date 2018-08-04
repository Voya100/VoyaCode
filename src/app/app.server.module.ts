import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { Router, RouterModule, Routes } from '@angular/router';

import { AppShellComponent } from './app-shell/app-shell.component';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

const routes: Routes = [{ path: 'app-shell', component: AppShellComponent }];

@NgModule({
  imports: [AppModule, ServerModule, RouterModule.forRoot(routes)],
  bootstrap: [AppComponent],
  declarations: [AppShellComponent]
})
export class AppServerModule {
  constructor(private router: Router) {
    // Routes must be reset because otherwise wildcard ** route will override app-shell path
    // (https://github.com/angular/angular-cli/issues/8929)
    this.router.resetConfig(routes);
  }
}
