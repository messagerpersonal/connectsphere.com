self.addEventListener("push", event => {
  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = {
      title: "ConnectSphere 🔔",
      body: event.data ? event.data.text() : "You have a reminder."
    };
  }

  const title = data.title || "ConnectSphere 🔔";

  const options = {
    body: data.body || "You have a scheduled reminder.",
    icon: "/connectsphere.com/icon-192.png",
    badge: "/connectsphere.com/icon-192.png",
    data: {
      url: data.url || "/connectsphere.com/"
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener("notificationclick", event => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(
      event.notification.data?.url || "/connectsphere.com/"
    )
  );
});
