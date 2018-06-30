import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';

@Component({
  templateUrl: 'cookie-policy.component.html',
  styleUrls: ['./cookie-policy.component.scss']
})
export class CookiePolicyComponent {
  constructor(private analytics: AnalyticsService) { }

  get acceptsCookies(){
    return this.analytics.acceptsCookies;
  }

  acceptCookies(){
    this.analytics.acceptCookies();
    this.analytics.initialiseAnalytics();
  }

  removeCookies(){
    this.analytics.removeCookies();
  }
}
