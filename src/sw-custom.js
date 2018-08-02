// Voya Code service worker logic
self.addEventListener('notificationclick', function (event) {
  const notification = event.notification;
  const urlEnd = (notification.data && notification.data.url) || '';
  const navigationUrl = 'https://voyacode.com' + urlEnd;
  const availableActions = Notification.maxActions || 0;

  // If browser doesn't support actions, activate navigation on click
  if (availableActions === 0 || event.action === 'navigate') {
    event.waitUntil(clients.openWindow(navigationUrl));
    notification.close();
  }
});
