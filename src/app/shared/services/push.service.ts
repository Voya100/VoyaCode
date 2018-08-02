import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { HttpClient } from '@angular/common/http';
import { SwPush } from '@angular/service-worker';
import { environment } from 'environments/environment';

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
    if ('Notification' in window && 'PushManager' in window && navigator.serviceWorker) {
      return true;
    }
    return false;
  }

  notificationPermissionDenied(): boolean {
    // Notification's static properties are added in TypeScript 3.0, which angular cli doesn't support yet
    return (Notification as any).permission === 'denied';
  }

  async subscribeToBlogNotifications() {
    const subscriber = await this.swPush
      .requestSubscription({
        serverPublicKey: environment.vapidPublicKey
      })
      .catch(e => {
        throw new Error(PushError.SUBSCRIPTION_REJECTED);
      });
    console.warn(subscriber);
    await this.http.post<{ message: string }>('/api/blogs/push/subscribe', subscriber).toPromise();
    this.addTopicToStorage('blogs');
  }

  async unsubscribeFromBlogNotifications() {
    // Endpoint is required, so subscription needs to be requested
    // If user is already subscribed, it shouldn't give a confirmation pop-up
    const subscriber = await this.swPush
      .requestSubscription({
        serverPublicKey: environment.vapidPublicKey
      })
      .catch(e => {
        throw new Error(PushError.SUBSCRIPTION_REJECTED);
      });
    const result = await this.http.post<{ message: string }>('/api/blogs/push/unsubscribe', subscriber).toPromise();
    this.removeTopicFromStorage('blogs');
    return result;
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
