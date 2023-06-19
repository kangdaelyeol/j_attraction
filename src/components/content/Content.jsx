import React, { useEffect, useRef, useState } from 'react';
import Styles from './content.module.css';
import Detail from './Detail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHeart,
	faComment,
	faBookmark,
} from '@fortawesome/free-regular-svg-icons';

const Content = ({ trip }) => {
	const { title, category, createdAt, description, picture, owner } = trip;
	const [boxPosition, setBoxPosition] = useState(0);
  const [detail, setDetail] = useState(false);
	const LEFTUNIT = 500;
	const MAXLEFT = (picture.length - 1) * LEFTUNIT;
	console.log(MAXLEFT, boxPosition);
	const onLeftClick = () => {
		if (-boxPosition<=0) return;
		boxRef.current.style.left = `${boxPosition + LEFTUNIT}px`;
		setBoxPosition((c) => c + LEFTUNIT);
	};

  const onMiddleClick = () => {
    setDetail(true);
  }

	const onRightClick = () => {
		if (-MAXLEFT >= boxPosition) return;
		boxRef.current.style.left = `${boxPosition - LEFTUNIT}px`;
		setBoxPosition((c) => c - LEFTUNIT);
	};
	const boxRef = useRef();
	useEffect(() => {
		boxRef.current.style.left = '0px';
	}, []);
	return (
		<div className={`${Styles.container}`}>
			<div className={Styles.header}>
				<div className={Styles.header__left}>
					<div className={Styles.profile__picture}>
						<img
							src='https://res.cloudinary.com/dfvqmpyji/image/upload/v1684905405/uploads/jzilk9x2ydftrtdinzst.jpg'
							alt='profile'
						/>
					</div>
					<div className={Styles.profile__info}>
						<div className={Styles.info__top}>
							<span className={Styles.owner}>{owner.displayName}</span>
							<div className={Styles.createdAt}>{createdAt.relative}</div>
						</div>
					</div>
				</div>
				<div className={Styles.header__right}> ... </div>
			</div>
			<div className={Styles.body}>
				<div ref={boxRef} className={Styles.picture__box}>
					{picture.map((url, ind) => {
						return <img src={url} key={ind} alt='thumb' />;
					})}
				</div>
				<div className={Styles.left} onClick={onLeftClick}>
					{' '}
				</div>
				<div className={Styles.middle} onClick={onMiddleClick}>
					{' '}
				</div>
				<div className={Styles.right} onClick={onRightClick}>
					{' '}
				</div>
			</div>
			<div className={Styles.footer}>
				<div className={Styles.footer__top}>
					<div className={Styles.footer_t_left}>
						<FontAwesomeIcon icon={faHeart} />{' '}
						<FontAwesomeIcon icon={faComment} />
					</div>
					<div className={Styles.footer_t_right}>
						<FontAwesomeIcon icon={faBookmark} />
					</div>
				</div>
				<div className={Styles.footer__middle}>
					{title} {description}
				</div>
			</div>
      {detail ? <Detail trip={trip} setDetail={setDetail}/> : ""}
		</div>
	);
};

export default Content;
