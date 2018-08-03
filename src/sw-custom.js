// Voya Code service worker logic
self.addEventListener('notificationclick', function (event) {
  const notification = event.notification;
  const navigationUrl = (notification.data && notification.data.url) || '';
  const availableActions = Notification.maxActions || 0;

  // If browser doesn't support actions, activate navigation on click
  if (availableActions === 0 || event.action === 'navigate') {
    notification.close();
    if (clients.openWindow) {
      event.waitUntil(clients.openWindow(navigationUrl));
    }
  }
});
