import { Component } from '@angular/core';

@Component({
  selector: 'voya-app',
  template: `<main-header></main-header>
              <router-outlet></router-outlet>
              <footer>@ VoyaCode</footer>`,
})
export class AppComponent  { name = 'Angular'; }
