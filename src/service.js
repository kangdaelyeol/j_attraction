import axios from 'axios';
import { initializeApp } from 'firebase/app';
import {
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	getAuth,
	onAuthStateChanged,
} from 'firebase/auth';
import {
	getFirestore,
	doc,
	setDoc,
	collection,
	query,
	where,
	getDocs,
	deleteDoc,
	orderBy,
} from 'firebase/firestore';

const CLOUD_NAME = 'dfvqmpyji';
const UPLOAD_PRESET = 'qzlqkpry';

const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.REACT_APP_APIKEY,
	authDomain: 'jattraction-79aac.firebaseapp.com',
	projectId: 'jattraction-79aac',
	storageBucket: 'jattraction-79aac.appspot.com',
	messagingSenderId: '628041195084',
	appId: process.env.REACT_APP_APPID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


export class FirebaseService {
	checkLoginState = (setLogin) => {
		const myAuth = getAuth();
		onAuthStateChanged(myAuth, (user) => {
			if (!user) {
				return this.signOut();
			} else {
				this.getUserById(user.uid).then((result) => {
					return setLogin({
						state: true,
						user: result,
					});
				});
			}
		});
	};

	// check If account exists
	getUserById = async (uid) => {
		let userInfo;
		const ref = collection(db, 'users');
		const q = query(ref, where('uid', '==', uid));
		const snapshot = await getDocs(q);
		snapshot.forEach((v) => {
			userInfo = v.data();
		});
		return userInfo;
	};

	createUser = async (info) => {
		try {
			await setDoc(doc(db, 'users', info.uid), info);
			return true;
		} catch (e) {
			return e;
		}
	};

	onLogin = async () => {
		const auth = getAuth();
		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			// The signed-in user info.
			const { uid, email, photoURL, displayName } = result.user;

			const user = {
				uid,
				email,
				profile: photoURL,
				displayName,
				rated: {
					// recipeId: score(Number)
				},
				copied: [
					// recipeId
				],
			};
			// Definition Of User Schema
			// Check -> if user info exists already
			const userInfoFromDB = await this.getUserById(user.uid);
			if (!userInfoFromDB) {
				await this.createUser(user);
			}
      console.log(user);
			return {
				type: 'success',
				user,
			};
		} catch (error) {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.email;
			// The AuthCredential type that was used.
			const credential_1 = GoogleAuthProvider.credentialFromError(error);
			return {
				type: 'error',
				errorCode,
				errorMessage,
				email,
				credential_1,
			};
		}
	};

	signOut = async () => {
		const auth = getAuth();
		try {
			await signOut(auth);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	};
}

export class cloudinaryService {
	uploadFile = async (files) => {
		const formdata = new FormData();

		for (let i = 0; i < files.length; i++) {
			let file = files[i];
			formdata.append('file', file);
			formdata.append('upload_preset', UPLOAD_PRESET);
			for (let k of formdata.keys()) console.log(k);
			for (let v of formdata.values()) console.log(v);
		}

		const fileRes = await axios({
			url: cloudinaryUrl,
			method: 'POST',
			data: formdata,
		});
		console.log(fileRes);
		// const res = await fileRes.json();

		return fileRes.data;
	};
}
