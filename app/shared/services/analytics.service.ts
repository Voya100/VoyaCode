import { Injectable } from '@angular/core';

// tslint:disable-next-line:ban-types
declare let ga: Function;

@Injectable()
export class AnalyticsService {

  pageView(path: string){
    if(!ga){return; }
    ga('set', 'page', path);
    ga('send', 'pageview');
  }

  event(category: string, action: string, label: string = null, value: number = null) {
    if(!ga){return; }
    ga('send', 'event', {
      Category: category,
      Label: label,
      Action: action,
      Value: value
    });
  }
}
