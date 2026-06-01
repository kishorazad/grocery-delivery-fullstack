importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js"
);

firebase.initializeApp({

  apiKey: "AIzaSyDvkT7FQ0Q3fZa-LNCeBzSaef2XC_2u8Cg",

  authDomain: "pradeep-af09d.firebaseapp.com",

  projectId: "pradeep-af09d",

  storageBucket: "pradeep-af09d.appspot.com",

  messagingSenderId: "158647624674",

  appId: "1:158647624674:web:5971aa52a49650996b0fbb",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(
  function (payload) {

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