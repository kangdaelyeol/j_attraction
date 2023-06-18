import React, { useRef, useState } from 'react';
import Styles from './content.module.css';

const Content = ({trip}) => {
  const {budget, category, createdAt, date, picture} = trip;
  const [boxPosition, setBoxPosition] = useState(0);
  const LEFTUNIT = 500;
  const MAXLEFT = (picture.length-1) * LEFTUNIT;
  const onLeftClick = () => {
    if(-MAXLEFT >= boxPosition) return;
    boxRef.current.style.left = `${boxPosition - LEFTUNIT}px`;
    setBoxPosition((c) => c - LEFTUNIT);
  }

  const onRightClick = () => {
    if(-MAXLEFT < boxPosition) return
    boxRef.current.style.left = `${boxPosition + LEFTUNIT}px`;
    setBoxPosition((c) => c + LEFTUNIT);
  }
  const boxRef = useRef();
	return (
		<div className={`${Styles.container}`}>
			<div className={Styles.header}>
				<div className={Styles.header__left}>
					<div className={Styles.profile__picture}>
            <img src="profile.png" alt="profile" />
          </div>
					<div className={Styles.profile__info}>
						<div className={Styles.info__top}>
							<span className={Styles.owner}> ownerName </span> <div className={Styles.createdAt}>3일</div>
						</div>
						<div className={Styles.info__bottom}>지역</div>
					</div>
				</div>
				<div className={Styles.header__right}> ... </div>
			</div>
      <div className={Styles.body}>
        <div ref={boxRef} className={Styles.picture__box}>
          {picture.map((url, ind) => {
            return <img src={url} key={ind} alt="thumb"/>
          })}
        </div>
        <div className={Styles.left} onClick={onLeftClick}> </div>
        <div className={Styles.right} onClick={onRightClick}> </div>
      </div>
      <div className={Styles.footer}>
        <div className={Styles.footer__top}>
          <div className={Styles.footer_t_left}>
            likeBtn, commentBtn, sendBtn
          </div>
          <div className={Styles.footer_t_right}>SaveBtn</div>
        </div>
        <div className={Styles.footer__middle}>
          ownerId description
        </div>
      </div>
		</div>
	);
};

export default Content;
