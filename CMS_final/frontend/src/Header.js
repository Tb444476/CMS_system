import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { IoIosSearch } from 'react-icons/io';
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "./Images/Bestowal.png";
import './App.css'; // Import your custom CSS file

const MyNavbar = () => {
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showSapDropdown, setShowSapDropdown] = useState(false);
  const [showAppDropdown, setShowAppDropdown] = useState(false);
  const [showWebDropdown, setShowWebDropdown] = useState(false);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);

  const handleIndustryMouseEnter = () => setShowIndustryDropdown(true);
  const handleIndustryMouseLeave = () => setShowIndustryDropdown(false);

  const handleServicesMouseEnter = () => setShowServicesDropdown(true);
  const handleServicesMouseLeave = () => setShowServicesDropdown(false);

  const handleSapMouseEnter = () => setShowSapDropdown(true);
  const handleSapMouseLeave = () => setShowSapDropdown(false);

  const handleAppMouseEnter = () => setShowAppDropdown(true);
  const handleAppMouseLeave = () => setShowAppDropdown(false);

  const handleWebMouseEnter = () => setShowWebDropdown(true);
  const handleWebMouseLeave = () => setShowWebDropdown(false);

  const handleCompanyMouseEnter = () => setShowCompanyDropdown(true);
  const handleCompanyMouseLeave = () => setShowCompanyDropdown(false);

  return (
    <Navbar expand="lg" className="fixed-top navbar-custom">
      <Nav.Link as={Link} to="/home" className="NavTab">
        <Image src={logo} className="img" height={70} />
      </Nav.Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="navigation mx-auto">
          <Nav.Link href="#home" className="nav-item">Home</Nav.Link>
          <NavDropdown
            title="Industry"
            id="industry-dropdown"
            className="nav-item"
            show={showIndustryDropdown}
            onMouseEnter={handleIndustryMouseEnter}
            onMouseLeave={handleIndustryMouseLeave}
          >
            <NavDropdown.Item href="#engineering">Engineering Cloud </NavDropdown.Item>
            <NavDropdown.Item href="#electronics">Electronics Industry</NavDropdown.Item>
            <NavDropdown.Item href="#chemical">Chemical Industry</NavDropdown.Item>
            <NavDropdown.Item href="#supply">Supply Industry</NavDropdown.Item>
            <NavDropdown.Item href="#pharma">Pharma Industry</NavDropdown.Item>
            <NavDropdown.Item href="#semiconductor">Semiconductor Industry</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title="Services"
            id="services-dropdown"
            className="nav-item"
            show={showServicesDropdown}
            onMouseEnter={handleServicesMouseEnter}
            onMouseLeave={handleServicesMouseLeave}
          >
            <NavDropdown
              title="SAP Services"
              id="sap-dropdown"
              className="dropdown-submenu"
              show={showSapDropdown}
              onMouseEnter={handleSapMouseEnter}
              onMouseLeave={handleSapMouseLeave}
            >
              <NavDropdown.Item href="#sap-service-1"></NavDropdown.Item>
              <NavDropdown.Item href="#sap-service-2">SAP IBP</NavDropdown.Item>
              <NavDropdown.Item href="#sap-service-3">SAP S/4HANA Implementation</NavDropdown.Item>
              <NavDropdown.Item href="#sap-service-4">SAP S/4 Monitoring & Support</NavDropdown.Item>
              <NavDropdown.Item href="#sap-service-4">SAP Cloud Service</NavDropdown.Item>
              <NavDropdown.Item href="#sap-service-4">SAP Business One</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Mobile Services"
              id="app-dropdown"
              className="dropdown-submenu"
              show={showAppDropdown}
              onMouseEnter={handleAppMouseEnter}
              onMouseLeave={handleAppMouseLeave}
            >
              <NavDropdown.Item href="#app-service-1">Node JS Development</NavDropdown.Item>
              <NavDropdown.Item href="#app-service-2">React Native Development</NavDropdown.Item>
              <NavDropdown.Item href="#app-service-3">Android Development</NavDropdown.Item>
              <NavDropdown.Item href="#app-service-4">iOS Development</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Web Services"
              id="web-dropdown"
              className="dropdown-submenu"
              show={showWebDropdown}
              onMouseEnter={handleWebMouseEnter}
              onMouseLeave={handleWebMouseLeave}
            >
              <NavDropdown.Item href="#web-service-1">Java Development</NavDropdown.Item>
              <NavDropdown.Item href="#web-service-2">React JS Development</NavDropdown.Item>
              <NavDropdown.Item href="#web-service-3">Dot Net Development</NavDropdown.Item>
              <NavDropdown.Item href="#web-service-4">PHP Development</NavDropdown.Item>
              <NavDropdown.Item href="#web-service-4">Angular JS Development</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown.Item href="#resource-solution">Resource Solution</NavDropdown.Item>
            <NavDropdown.Item href="#rpa-implementation">RPA Implementation</NavDropdown.Item>
            <NavDropdown.Item href="#digital-marketing">Digital Marketing</NavDropdown.Item>
            <NavDropdown.Item href="#seo">Search Engine Optimization</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title="Company"
            id="company-dropdown"
            className="nav-item"
            show={showCompanyDropdown}
            onMouseEnter={handleCompanyMouseEnter}
            onMouseLeave={handleCompanyMouseLeave}
          >
            <NavDropdown.Item href="#company-1">Career Page</NavDropdown.Item>
            <NavDropdown.Item href="#company-2">Life at Bestowal</NavDropdown.Item>
            <NavDropdown.Item href="#company-3">History of Bestowal</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#about" className="nav-item">About Us</Nav.Link>
          <Nav.Link href="#contact" className="nav-item">Contact Us</Nav.Link>
          <Nav.Link href="#blogs" className="nav-item">Blogs</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <div className="contact-button-container">
        <IoIosSearch className="search-icon" />
        <Button variant="primary" className="contact-button">Let's Talk</Button>
      </div>
    </Navbar>
  );
};

export default MyNavbar;
