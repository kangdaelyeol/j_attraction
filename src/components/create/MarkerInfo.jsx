import React, { useRef, useState } from 'react';
import Styles from './day.module.css';

const ImgDes = ({ imgsrc, index, onChangeFile }) => {
	const inputRef = useRef();

	const onBtnClick = (e) => {
		e.preventDefault();
		inputRef.current.click();
	};

	const onFileInput = async () => {
		const files = inputRef.current.files;
		await onChangeFile(files, index);
	};

	return (
		<div className={Styles.img__des} onClick={onBtnClick}>
			<img className={Styles.img__place} src={imgsrc} alt='desimg' />
			<input
				type='file'
				accept='image/*'
				ref={inputRef}
				onChange={onFileInput}
			/>
		</div>
	);
};

const Imginput = ({ currentMarker, loading, setLoading, setPictureSrc }) => {
	const onChangeFile = async (files, index) => {
		setLoading(index);
		// TO DO: await -> fileInput / get src

		// set picture Src -> setPictureSrc(src, index)
		setLoading(false);
	};
	return (
		<div className={Styles.img__container}>
			{currentMarker.picture.map((v, index) => {
				return (
					<div className={Styles.img__inputed} data-index={index}>
						{loading === index ? (
							<div className={Styles.loading}> </div>
						) : (
							<ImgDes imgsrc={v} onChangeFile={onChangeFile} />
						)}
					</div>
				);
			})}
			<div className='img__input'></div>
		</div>
	);
};

const MarkerInfo = ({
	currentMarker,
	markerId,
	onMarkerDelete,
	imgChange,
  infoChange
}) => {
	const [loading, setLoading] = useState(false);
	const onMarkerInput = () => {};

	const onPictureInput = () => {};
	const placeRef = useRef();
	const timeRef = useRef();
	const costRef = useRef();
	const descriptionRef = useRef();

	const onInfoInput = () => {
		const placeVal = placeRef.current.value;
		const timeVal = timeRef.current.value;
		const costVal = costRef.current.value;
		const descriptionVal = descriptionRef.current.value;
		infoChange({
			name: placeVal,
			time: timeVal,
			cost: costVal,
			description: descriptionVal,
		}, markerId);
	};

	const setPictureSrc = (src, index) => {
		imgChange(src, index, markerId);
	};
  console.log(currentMarker);

	return (
		<div className={Styles.target__info}>
			<input
				type='text'
				className='placename'
				placeholder='지역 이름'
				ref={placeRef}
				value={currentMarker?.name || ''}
        onInput={onInfoInput}
			/>
			<input
				type='text'
				className='time'
				placeholder='시간'
				ref={timeRef}
				value={currentMarker?.time || ''}
        onInput={onInfoInput}
			/>
			<input
				type='text'
				className='cost'
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
				rows='10'
				ref={descriptionRef}
				value={currentMarker?.description || ''}
        onInput={onInfoInput}
			></textarea>
			<Imginput currentMarker={currentMarker} />
			<button onClick={() => onMarkerDelete(markerId)}>
				removecurrnet
			</button>
		</div>
	);
};

export default MarkerInfo;
