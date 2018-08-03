import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    // Service worker is registered here instead of AppModule because it doesn't work
    // (https://github.com/angular/angular-cli/issues/8779)
    if ('serviceWorker' in navigator && environment.production) {
      return navigator.serviceWorker.register('/sw-master.js');
    }
  })
  .catch(err => console.log(err));
