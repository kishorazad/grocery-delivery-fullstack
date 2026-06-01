import { initializeApp } from "firebase/app";

import {
    getMessaging,
    onMessage,
    getToken,
} from "firebase/messaging";

const firebaseConfig = {

    apiKey:
        import.meta.env.VITE_FIREBASE_API_KEY,

    authDomain:
        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,

    projectId:
        import.meta.env.VITE_FIREBASE_PROJECT_ID,

    storageBucket:
        import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,

    messagingSenderId:
        import.meta.env
            .VITE_FIREBASE_MESSAGING_SENDER_ID,

    appId:
        import.meta.env.VITE_FIREBASE_APP_ID,
};

const app =
    initializeApp(firebaseConfig);

export const messaging =
    getMessaging(app);

// GENERATE FCM TOKEN
export const generateToken =
    async () => {

        const permission =
            await Notification.requestPermission();

        if (
            permission !== "granted"
        ) {

            console.log(
                "Notification permission denied"
            );

            return null;
        }

        const token = await getToken(
    messaging,
    {
        vapidKey:
            import.meta.env
                .VITE_FIREBASE_VAPID_KEY,

        serviceWorkerRegistration:
            await navigator.serviceWorker.ready,
    }
);

        console.log(
            "FCM TOKEN:",
            token
        );

        return token;
    };

// CLIENT WEBSITE POPUP NOTIFICATION
onMessage(
    messaging,
    (payload) => {

        console.log(
            "Foreground Message:",
            payload
        );

        new Notification(
            payload.notification?.title || "PillNow",
            {
                body:
                    payload.notification?.body,

                icon:
                    "/logo.png",

              
            }
        );
    }
);