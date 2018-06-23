import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

// tslint:disable-next-line:ban-types
declare let ga: Function;

@Injectable()
export class AnalyticsService {

  acceptsCookies: boolean;

  get analyticsActive(): boolean{
    return this.acceptsCookies && !!ga;
  }

  constructor(private storage: LocalStorageService){
    const acception = storage.get('acceptsCookies');
    if(acception === null){
      this.acceptCookies();
    }
    this.acceptsCookies = acception === 'true';
    this.initialiseAnalytics();
  }

  acceptCookies(){
    this.storage.set('acceptsCookies', 'true');
    this.acceptsCookies = true;
  }

  removeCookies(){
    this.storage.set('acceptsCookies', 'false');
    this.acceptsCookies = false;
    this.removeCookie('_ga');
    this.removeCookie('_gid');
  }

  initialiseAnalytics(){
    if(!this.analyticsActive){return; }
    ga('set', 'anonymizeIp', true);
    ga('create', 'UA-105686700-1', 'auto');
  }

  pageView(path: string){
    if(!this.analyticsActive){return; }
    ga('set', 'page', path);
    ga('send', 'pageview');
  }

  event(category: string, action: string, label: string = null, value: number = null) {
    if(!this.analyticsActive){return; }
    ga('send', 'event', {
      Category: category,
      Label: label,
      Action: action,
      Value: value
    });
  }

  private removeCookie(name: string){
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}
