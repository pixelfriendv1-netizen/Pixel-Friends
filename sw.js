// sw.js - Background Service Worker for handling Push Notifications

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Pixel Friends';
  const options = {
    body: data.body || 'You received a new notification!',
    icon: '/icon.png',
    badge: '/badge.png',
    data: { url: data.url || '/' },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
