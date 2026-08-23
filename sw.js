self.addEventListener("push", function(event) {

  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch (error) {
    data = {
      title: "ConnectSphere 🔔",
      body: event.data ? event.data.text() : "You have a new notification."
    };
  }

  const title = data.title || "ConnectSphere 🔔";

  const options = {
    body: data.body || "You have a new ConnectSphere notification.",
    icon: data.icon || "./icon-192.png",
    badge: data.badge || "./icon-192.png",
    data: {
      url: data.url || "./"
    }
  };

  event.waitUntil(
    self.registration.showNotification(
      title,
      options
    )
  );

});


self.addEventListener("notificationclick", function(event) {

  event.notification.close();

  const url =
    event.notification.data &&
    event.notification.data.url
      ? event.notification.data.url
      : "./";

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then(function(clientList) {

      for (const client of clientList) {

        if ("focus" in client) {

          client.navigate(url);

          return client.focus();

        }

      }

      if (clients.openWindow) {

        return clients.openWindow(url);

      }

    })
  );

});
