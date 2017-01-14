import { Component } from '@angular/core';

@Component({
  selector: 'voya-app',
  template: `<header>
                <nav>Navigation
                  <a routerLink="">Home</a>
                  <a routerLink="blogs">Blogs</a>
                </nav>
              </header>
              <router-outlet></router-outlet>
              <footer>@ VoyaCode</footer>`,
})
export class AppComponent  { name = 'Angular'; }
