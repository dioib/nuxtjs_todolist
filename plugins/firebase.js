import firebase from 'firebase'
// Initialize Firebase

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "××××××××××××××",
        authDomain: "××××××××××××××",
        databaseURL: "××××××××××××××",
        projectId: "××××××××××××××",
        storageBucket: "××××××××××××××",
        messagingSenderId: "××××××××××××××"
    });
};
export default firebase