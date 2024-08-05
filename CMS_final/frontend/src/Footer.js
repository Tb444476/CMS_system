import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaPinterest, FaInstagram, FaReddit, FaArrowUp } from 'react-icons/fa';
import logo from './Images/Bestowal.png'; // Adjust the path as necessary
import './App.css'; // Import the CSS file

const Footer = () => {
  // Function to handle scroll-to-top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer mt-5">
      <Container>
        <Row>
          <Col md={6} className="footer-section">
            <img src={logo} alt="Bestowal Logo" className="footer-logo mb-3" />
            <p className="address">
              First floor, Above CSB Bank, Opp. Thyssenkrupp Industry, Near Ambedkar Chowk, Pimpri, Pune - Maharashtra, India - 411 018.
            </p>
            <h5>+91 94055 30011</h5>
          </Col>
          <Col md={6} className="footer-section">
            <Row className='footerrow'>
              <Col md={4}>
                <h5>Company</h5>
                <ul className="list-unstyled">
                  <li><a href="#career">Career</a></li>
                  <li><a href="#policy">Policy</a></li>
                  <li><a href="#about">About Us</a></li>
                </ul>
              </Col>
              <Col md={4}>
                <h5>Support</h5>
                <ul className="list-unstyled">
                  <li><a href="#contact">Contact</a></li>
                  <li><a href="#community">Community</a></li>
                </ul>
              </Col>
              <Col md={4}>
                <h5>Contact</h5>
                <ul className="list-unstyled">
                  <li><a href="mailto:info@bestowal.com">HR: hr@bestowal.com</a></li>
                  <li><a href="mailto:support@bestowal.com">Support: support@bestowal.com</a></li>
                  <li><a href="mailto:sales@bestowal.com">Business: sales@bestowal.com</a></li>
                </ul>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <h5>Social</h5>
                <div className="social-icons mr-10">
      <a href="https://www.linkedin.com/company/bestowal-systems-and-services-private-limited/" className="facebook" target="_blank" rel="noopener noreferrer">
        <FaFacebook />
      </a>
      <a href="https://x.com/bestowalsystems?t=tUhwfo5zEXhU5SON5Ice2g&s=09" className="twitter" target="_blank" rel="noopener noreferrer">
        <FaTwitter />
      </a>
      <a href="https://www.linkedin.com/company/bestowal-systems-and-services-private-limited/" className="linkedin" target="_blank" rel="noopener noreferrer">
        <FaLinkedin />
      </a>
      <a href="https://youtube.com/@bestowalsystems?si=JwmKOLGIGSFmTbk5" className="youtube" target="_blank" rel="noopener noreferrer">
        <FaYoutube />
      </a>
      <a href="https://pin.it/5aaQo7dzK" className="pinterest" target="_blank" rel="noopener noreferrer">
        <FaPinterest />
      </a>
      <a href="https://www.instagram.com/bestowalsystems?igsh=MWY1ODV5Mmc4am02aA==" className="instagram" target="_blank" rel="noopener noreferrer">
        <FaInstagram />
      </a>
      <a href="https://www.reddit.com/user/bestowalsystems/" className="reddit" target="_blank" rel="noopener noreferrer">
        <FaReddit />
      </a>
    </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <hr />
      <Container>
        <Row className="footer-bottom">
          <Col className="text-center">
            <p>
              Copyright © 2024 Bestowal System & Services. 
              <a href="https://www.bestowalsystems.com"> www.bestowalsystems.com </a> | All Rights Reserved.
            </p>
          </Col>
          <Col className="text-right">
            <Button className="scroll-top-btn" onClick={scrollToTop}>
              <FaArrowUp />
            </Button>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
