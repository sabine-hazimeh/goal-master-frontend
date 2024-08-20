import React from "react";
import "./styles/Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="contact_info">
            <h5>Contact Information</h5>
        <div className="footer_details">
        <FontAwesomeIcon icon={faPhone} className="footer-icon"/>
            <p>+961 3 374 791</p>
          </div>
          <div className="footer_details">
          <FontAwesomeIcon icon={faEnvelope} className="footer-icon"/>
            <p>goalMaster@gmail.com</p>
          </div>
        </div>
        <div className="media">
            <h5>Social Media </h5>
            <div className="footer_details">
            <FontAwesomeIcon icon={faFacebook} className="footer-icon"/>
            <p>Goal Master</p>
          </div>
          <div className="footer_details">
          <FontAwesomeIcon icon={faInstagram} className="footer-icon"/>
            <p>Goal_Master</p>
          </div>
        </div>
        <div className="copyright">
          <h5>Copy Rights</h5>
          <div className="footer_details">
          <FontAwesomeIcon icon={faCopyright} className="footer-icon"/>
            <p>2024 Goal Master. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
