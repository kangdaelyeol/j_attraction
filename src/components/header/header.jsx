import React from "react";
import Styles from "./header.module.css";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();

  const onTitleClick = () => {
    navigate("/main")
  }
  return (
    <div className={Styles.container}>
      <div className={Styles.logo}>logo</div>
      <div onClick={onTitleClick} className={Styles.title}>JAT</div>
      <div className="right">
        <div className={Styles.login}>Sign out</div>
      </div>
    </div>
  )
}


export default Header;