importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
});

const messaging =
    firebase.messaging();

messaging.onBackgroundMessage(
    function(payload) {

        console.log(
            "Background Message:",
            payload
        );

        self.registration.showNotification(
            payload.notification.title,
            {
                body:
                    payload.notification.body,

                icon:
                    "/logo.png",

                image:
                    payload.notification.image,
            }
        );
    }
);