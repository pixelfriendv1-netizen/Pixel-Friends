// Service Worker for Pixel Friends Push Notifications

self.addEventListener('push', function(event) {
  let data = {
    title: 'Pixel Friends',
    body: 'You have a new update!',
    icon: '/Pixel-Friends/favicon.ico', // Adjust icon path if needed
    url: '/Pixel-Friends/'
  };

  if (event.data) {
    try {
      data = Object.assign(data, event.data.json());
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/Pixel-Friends/favicon.ico',
    badge: data.badge || data.icon,
    data: {
      url: data.url || '/Pixel-Friends/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  const targetUrl = event.notification.data && event.notification.data.url 
    ? event.notification.data.url 
    : '/Pixel-Friends/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      // If a tab is already open, focus it and navigate to the URL
      for (let i = 0; i < clientList.length; i++) {
        let client = clientList[i];
        if (client.url.includes('/Pixel-Friends/') && 'focus' in client) {
          return client.focus();
        }
      }
      // If no tab is open, open a new one
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
