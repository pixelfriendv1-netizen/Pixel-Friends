// sw.js - Service Worker script for receiving push events

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Pixel Friends';
  const options = {
    body: data.body || 'You received a new message!',
    icon: '/icon.png', // Optional: Path to icon
    badge: '/badge.png', // Optional: Path to badge
    data: { url: data.url || '/' },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
