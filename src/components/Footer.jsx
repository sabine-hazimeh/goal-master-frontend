import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faCopyright } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'; // Import brand icons
import "./styles/Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="contact_info">
          <h5>Contact Information</h5>
          <div className="footer_details">
            <FontAwesomeIcon icon={faPhone} className="footer-icon" />
            <p>+961 3 374 791</p>
          </div>
          <div className="footer_details">
            <FontAwesomeIcon icon={faEnvelope} className="footer-icon" />
            <p>goalMaster@gmail.com</p>
          </div>
        </div>
        <div className="media">
          <h5>Social Media</h5>
          <div className="footer_details">
            <FontAwesomeIcon icon={faFacebookF} className="footer-icon" /> {/* Updated icon */}
            <p>Goal Master</p>
          </div>
          <div className="footer_details">
            <FontAwesomeIcon icon={faInstagram} className="footer-icon" />
            <p>Goal_Master</p>
          </div>
        </div>
        <div className="copyright">
          <h5>Copy Rights</h5>
          <div className="footer_details">
            <FontAwesomeIcon icon={faCopyright} className="footer-icon" />
            <p>2024 Goal Master. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
