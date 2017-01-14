import { Component } from '@angular/core';

@Component({
  selector: 'voya-app',
  template:  `<main-header></main-header>
              <main>
                <router-outlet></router-outlet>
              </main>
              <main-footer></main-footer>`,
})
export class AppComponent  {}
