import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../authentication/auth.service';

// This is a header component which contains all main navigation and a logo.

@Component({
  selector: 'main-header',
  templateUrl: 'main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit() {}
}
