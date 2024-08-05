import React, { useState ,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  FaEnvelope,
  FaPhone,
  FaUser,
  FaBuilding,
  FaList,
  FaRegComment,
} from "react-icons/fa";
import {
  Carousel,
  Button,
  Card,
  Row,
  Col,
  Container,
  Image,
  Form,
  InputGroup,
} from "react-bootstrap";
import "./App.css";
import Bestowal from "./Images/Bestowal.png";
import background from "./Images/img-hero.jpg";
import arrow from "./Images/arrow1.jpg";
import bag from "./Images/background.jpeg";
import Mobile from "./Images/Mobile.jpg";
import Web from "./Images/Web.jpg";
import { FaArrowRight } from "react-icons/fa";
import software from "./Images/Software.png";
import contact from "./Images/img-contact.png";
import { FaCaretDown } from "react-icons/fa";
import TM from "./Images/TM.png";
import Infosys from "./Images/Infosys.png";
import GC from "./Images/gitacloud.png";
import Dynpro from "./Images/dynpro.jpg";
import sai from "./Images/sai.png";
import sapture from "./Images/saptrue.png";
import wudza from "./Images/wudza.png";
import HIC from "./Images/HIC.png";
import ats from "./Images/ats.png";
import Aysmtech from "./Images/aysmtech.png";
import crave from "./Images/crave.png";
import acnovate from "./Images/acnovate.png";
import DG from "./Images/daynilgroup.png";
import crafsol from "./Images/abc1.png";
import medha from "./Images/medha.png";
import yash from "./Images/yash.png";
import ST from "./Images/ST.png";
import rudersoft from "./Images/rudersoft.png";
import product from "./Images/img-Product.png";
import process from "./Images/img-Process.png";
import people from "./Images/img-People.png";
import SAS from "./Images/SAS.jpg";
import Other from "./Images/other.jpg";
import { CgProfile } from "react-icons/cg";
import { FaHandHoldingUsd } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { SlNote } from "react-icons/sl";
// Define the logos array outside the component

import axios from 'axios';
// import './Home.module.css';
import './index.css';

const Home = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get('http://localhost:5000/load/home');
        setHtmlContent(response.data.content);
      } catch (error) {
        console.error('Error fetching the home page content:', error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="home-container">
      <header>
        <h1>Welcome to Bestowal</h1>
      </header>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default Home;
