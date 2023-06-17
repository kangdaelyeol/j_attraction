import React from 'react';
import Styles from './content.module.css';

const Content = () => {
	return (
		<div className={`${Styles.container}`}>
			<div className='header'>
				<div className='header__left'>
					<div className='profile__picture'>
            <img src="profile.png" alt="profile" />
          </div>
					<div className='profile__info'>
						<div className='info__top'>
							<span className='owner'> ownerName </span> <div className='createdAt'>3일</div>
						</div>
						<div className='info__bottom'>지역</div>
					</div>
				</div>
				<div className='header__right'> ... </div>
			</div>
      <div className="body">
        picture Array / width, height: 468
      </div>
      <div className="footer">
        <div className="footer__top">
          <div className="footer_t_left">
            likeBtn, commentBtn, sendBtn
          </div>
          <div className="footer_t_right">SaveBtn</div>
        </div>
        <div className="footer__middle">
          ownerId description
        </div>
      </div>
		</div>
	);
};

export default Content;
