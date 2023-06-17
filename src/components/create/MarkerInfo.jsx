import React, { useRef, useState } from 'react';
import Styles from './markerinfo.module.css';
import { cloudinaryService } from '../../service.js';


const MarkerInfo = ({
	currentMarker,
	markerId,
	onMarkerDelete,
	imgChange,
	infoChange,
  markerPicturesChange
}) => {
  const cloudinary = new cloudinaryService();
  const [currentPicture, setCurrentPicture] = useState(null);
  const placeRef = useRef();
	const timeRef = useRef();
	const costRef = useRef();
	const descriptionRef = useRef();
  const fileRef = useRef();
  console.log(currentMarker.picture);
  const onUploadClick = (e, ind) => {
		// e.preventDefault();
		fileRef.current.click({ ind });
	};

	const onFileInput = async () => {
		const files = fileRef.current.files;
		const imgIndex = currentPicture || currentMarker.picture.length;
    const newPictures = [...currentMarker.picture];
    newPictures[imgIndex] = "loading";
		markerPicturesChange(newPictures);

		// 클라우드서비스 파일 인풋 await -> url 받아오기
		try {
			const fileInfo = await cloudinary.uploadFile(files);
			const newFileUrl = fileInfo.url;

			// url 셋팅
      const newPictures = [...currentMarker.picture];
      newPictures[imgIndex] = newFileUrl;
      markerPicturesChange(newPictures);
		} catch (e) {
			console.log(e);
      const newPictures = [...currentMarker.picture];
      newPictures.splice(imgIndex + 1, 1);
			markerPicturesChange(newPictures);
		}
	};

	const onPictureClick = (ind) => {
		setCurrentPicture(ind);
	};

	const onPictureOver = () => {
		if (currentPicture !== null) setCurrentPicture(null);
	};

	const onEditPicture =  () => {
		// index - currentPicture
		fileRef.current.click();
	}

	const onRmPicture = () => {
		const newPictures = [...currentMarker.picture];
		newPictures.splice(currentPicture, 1);
		markerPicturesChange(newPictures);
	}




	const onInfoInput = () => {
		const placeVal = placeRef.current.value;
		const timeVal = timeRef.current.value;
		const costVal = costRef.current.value;
		const descriptionVal = descriptionRef.current.value;
		infoChange(
			{
				name: placeVal,
				time: timeVal,
				cost: costVal,
				description: descriptionVal,
			},
			markerId
		);
	};

	const setPictureSrc = (src, index) => {
		imgChange(src, index, markerId);
	};
	console.log(currentMarker);

	return (
		<div className={Styles.target__info}>
			<input
				type='text'
				className={Styles.placename}
				placeholder='지역 이름'
				ref={placeRef}
				value={currentMarker?.name || ''}
				onInput={onInfoInput}
			/>
			<input
				type='text'
				className={Styles.time}
				placeholder='시간'
				ref={timeRef}
				value={currentMarker?.time || ''}
				onInput={onInfoInput}
			/>
			<input
				type='text'
				className={Styles.cost}
				placeholder='비용'
				ref={costRef}
				value={currentMarker?.cost || ''}
				onInput={onInfoInput}
			/>
			<textarea
				placeholder='설명'
				name='description'
				id='description'
				cols='30'
				rows='4'
				ref={descriptionRef}
				value={currentMarker?.description || ''}
				onInput={onInfoInput}
			></textarea>
      <div className={Styles.picture__box}>
				{currentMarker?.picture?.map((v, ind) => {
					return (
						<div
							className={Styles.picture}
							onClick={(e) => {
								onPictureClick(ind);
							}}
							data-index={ind}
							key={ind}
						>
							<div
								className={`${Styles.picture__img} ${
									currentPicture === ind ? Styles.img__focus : ''
								}`}
							>
								<button className={Styles.picture__ed} onClick={onEditPicture}>Edit</button>
								<button className={Styles.picture__rm} onClick={onRmPicture}>Remove</button>
								{v === 'loading' ? (
									<div className={Styles.loading}></div>
								) : (
									<img
										className={Styles.picture__content}
										src={v}
										alt='thumb'
									/>
								)}
							</div>
						</div>
					);
				})}
				<div
					className={Styles.picture}
					onMouseMove={onPictureOver}
					onClick={onUploadClick}
				>
					<div className={Styles.picture__img}> + </div>
				</div>
				<input
					className={Styles.upload}
					ref={fileRef}
					type='file'
					accept='image/*'
					onInput={onFileInput}
				/>
			</div>
			<button
				className={Styles.delete__btn}
				onClick={() => onMarkerDelete(markerId)}
			>
				Remove
			</button>
		</div>
	);
};

export default MarkerInfo;
