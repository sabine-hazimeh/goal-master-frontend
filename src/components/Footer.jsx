import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faCopyright } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'; 
import "./styles/Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer_parts">
          <p className="footer_title">Contact Information</p>
          <div className="footer_details">
            <FontAwesomeIcon icon={faPhone} className="footer-icon" />
            <p>+961 3 374 791</p>
          </div>
          <div className="footer_details">
            <FontAwesomeIcon icon={faEnvelope} className="footer-icon" />
            <p>goalMaster@gmail.com</p>
          </div>
        </div>
        <div className="footer_parts">
          <p className="footer_title">Social Media</p>
          <div className="footer_details">
            <FontAwesomeIcon icon={faFacebookF} className="footer-icon" /> 
            <p>Goal Master</p>
          </div>
          <div className="footer_details">
            <FontAwesomeIcon icon={faInstagram} className="footer-icon" />
            <p>Goal_Master</p>
          </div>
        </div>
        <div className="footer_parts">
          <p className="footer_title">Copy Rights</p>
          <div className="footer_details">
            <FontAwesomeIcon icon={faCopyright} className="footer-icon" />
            <p>2024 Goal Master.<br /> All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
