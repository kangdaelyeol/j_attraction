import React from "react";
import Styles from "./header.module.css";

const Header = () => {
  return (
    <div className={Styles.container}>
      <div className="left">logo</div>
      <div className="title">Title</div>
      <div className="right">
        <div className="login__btn">Sign out</div>
      </div>
    </div>
  )
}


export default Header;