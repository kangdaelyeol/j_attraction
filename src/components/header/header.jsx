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
      <div className="left">logo</div>
      <div onClick={onTitleClick} className="title">Title</div>
      <div className="right">
        <div className="login__btn">Sign out</div>
      </div>
    </div>
  )
}


export default Header;