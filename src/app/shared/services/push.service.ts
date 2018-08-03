import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from 'environments/environment';

import { take, timeout } from 'rxjs/operators';

export enum PushError {
  SUBSCRIPTION_REJECTED = 'SUBSCRIPTION_REJECTED'
}

@Injectable()
export class PushService {
  constructor(private swPush: SwPush, private storage: LocalStorageService, private http: HttpClient) {}

  private readonly topicStorageKey = 'push-topic-subscriptions';

  private get topics() {
    return this.storage.get<string[]>(this.topicStorageKey) || [];
  }
  private set topics(topics: string[]) {
    this.storage.set(this.topicStorageKey, topics);
  }

  browserSupportsPushNotifications(): boolean {
    if (
      'Notification' in window &&
      'PushManager' in window &&
      navigator.serviceWorker &&
      navigator.serviceWorker.controller // Checks that service worker is active
    ) {
      return true;
    }
    return false;
  }
  // Note: Notification permission can also be 'default', hence 2 separate methods instead of 1 boolean
  notificationPermissionDenied(): boolean {
    // Notification's static properties are added in TypeScript 3.0, which angular cli doesn't support yet
    return (Notification as any).permission === 'denied';
  }

  notificationPermissionGranted(): boolean {
    return (Notification as any).permission === 'granted';
  }

  async subscribeToBlogNotifications() {
    const subscriber = await this.swPush
      .requestSubscription({
        serverPublicKey: environment.vapidPublicKey
      })
      .catch(e => {
        console.warn('push subscription error', e);
        throw new Error(PushError.SUBSCRIPTION_REJECTED);
      });
    console.warn(subscriber);
    await this.http.post<{ message: string }>('/api/blogs/push/subscribe', subscriber).toPromise();
    this.addTopicToStorage('blogs');
  }

  async unsubscribeFromBlogNotifications() {
    // Singular topic can be removed from the server only if user hasn't removed permission
    // If permission is removed, backend will remove subscription automatically
    if (this.notificationPermissionGranted()) {
      const subscriber = await this.swPush.subscription.pipe(take(1), timeout(1000)).toPromise();
      await this.http.post<{ message: string }>('/api/blogs/push/unsubscribe', subscriber).toPromise();
    }
    this.removeTopicFromStorage('blogs');
    return { message: 'Successfully unsubscribed.' };
  }

  isSubscribedToTopic(topic: string) {
    return this.topics.includes(topic);
  }

  addTopicToStorage(topic: string) {
    this.topics = [...this.topics, topic];
  }

  removeTopicFromStorage(topic: string) {
    this.topics = this.topics.filter(topicName => topicName !== topic);
  }
}
