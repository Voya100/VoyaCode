import { Injectable } from '@angular/core';

// tslint:disable-next-line:ban-types
declare let ga: Function;

@Injectable()
export class AnalyticsService {

  public pageView(path: string){
    ga('set', 'page', path);
    ga('send', 'pageview');
  }

  public event(category: string, action: string, label: string = null, value: number = null) {
    ga('send', 'event', {
      Category: category,
      Label: label,
      Action: action,
      Value: value
    });
  }
}
