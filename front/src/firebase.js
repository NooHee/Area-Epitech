import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {

};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default getFirestore();

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = async () => {
    var res = await auth.signInWithPopup(provider);
    const userRef = firestore.doc(`users/${res.user.uid}`).get();
    if (userRef === {}) {
        await userRef.set({
            'spotify': { key: "" },
            'reddit': { key: "" },
            'Widgets': [],
        });
    }
};

export const generateUserDocument = async (user, name) => {
    if (!user) return;

    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const { email, displayName } = user;
        try {
            await userRef.set({
                email,
                displayName: name ? name: displayName,
                'spotify': { key: "" },
                'reddit': { key: "" },
                'Widgets': [],
            });
        } catch (error) {
            console.error("Error creating user document", error);
        }
    }
    return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
    if (!uid) return null;
    try {
        const userDocument = await firestore.doc(`users/${uid}`).get();
        return {
            uid,
            ...userDocument.data()
        };
    } catch (error) {
        console.error("Error fetching user", error);
    }
};