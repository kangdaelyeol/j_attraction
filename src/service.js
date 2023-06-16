import axios from "axios";

const CLOUD_NAME = 'dfvqmpyji';
const UPLOAD_PRESET = 'qzlqkpry';

const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

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
