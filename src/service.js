import axios from 'axios';

const CLOUD_NAME = 'dfvqmpyji';
const UPLOAD_PRESET = 'qzlqkpry';

const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
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
	measurementId: 'G-Q9TK0X5MSY',
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

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
