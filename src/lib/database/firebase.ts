import admin from "firebase-admin";
import firebase_admin from "@/../secrets/firebase_admin.json";

export default function getApp(): admin.app.App {
    if (admin.apps.length == 0) {
        return admin.initializeApp({
            credential: admin.credential.cert(
                firebase_admin as admin.ServiceAccount
            ),
            storageBucket: "taskbuddy-42fba.appspot.com",
        });
    }

    return admin.app();
}
