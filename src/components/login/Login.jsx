import React from 'react';
import Styles from './login.module.css';

const Login = () => {
	return (
		<div className={Styles.container}>
			<div className={Styles.small__container}>
				<div className={Styles.top}>
					<span>
						Welcome to Japan! <br /> ありがとお！！
					</span>
				</div>
				<div className={Styles.body}>
          <div className={Styles.des}>
            you can start it with Google Login only
          </div>
					<div className={Styles.loginbtn}>
						<div className={Styles.googleImg}>G</div>
						<span>Sign In with Google!</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
