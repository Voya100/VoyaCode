import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { isPlatformBrowser } from '@angular/common';

declare var window: any;

@Injectable()
export class AnalyticsService {
  acceptsCookies: boolean = false;
  isBrowser: boolean;

  get analyticsActive(): boolean {
    return this.acceptsCookies && !!this.ga;
  }

  get ga() {
    return this.isBrowser && window['ga'];
  }

  constructor(private storage: LocalStorageService, @Inject(PLATFORM_ID) private platformId) {
    this.isBrowser = isPlatformBrowser(platformId);
    const acception = storage.get('acceptsCookies');
    if (acception === null) {
      // Accepted by default
      this.acceptCookies();
    } else {
      this.acceptsCookies = acception === 'true';
    }
    this.initialiseAnalytics();
  }

  acceptCookies() {
    this.storage.set('acceptsCookies', 'true');
    this.acceptsCookies = true;
  }

  removeCookies() {
    this.storage.set('acceptsCookies', 'false');
    this.acceptsCookies = false;
    this.removeCookie('_ga');
    this.removeCookie('_gid');
  }

  initialiseAnalytics() {
    if (!this.analyticsActive) {
      return;
    }
    this.ga('set', 'anonymizeIp', true);
    this.ga('create', 'UA-105686700-1', 'auto');
  }

  pageView(path: string) {
    if (!this.analyticsActive) {
      return;
    }
    this.ga('set', 'page', path);
    this.ga('send', 'pageview');
  }

  // tslint:disable-next-line:no-null-keyword
  event(category: string, action: string, label: string = null, value: number = null) {
    if (!this.analyticsActive) {
      return;
    }
    this.ga('send', 'event', {
      Category: category,
      Label: label,
      Action: action,
      Value: value
    });
  }

  private removeCookie(name: string) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}
