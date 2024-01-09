import React, {useState, useEffect} from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import about1 from "./About.jpg";
import about2 from "./about2.jpg"
import about3 from "./about3.jpg"
import about4 from "./about4.jpg"
import about5 from "./about5.jpg"
import about6 from "./about6.jpg"
import about7 from "./about7.jpg"

const About = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [about1, about2, about3, about4, about5, about6, about7]; // Add more images to the array as needed
  
    useEffect(() => {
      // Update the image index every 3 seconds (adjust the timing as needed)
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
  
      // Clear the interval on component unmount to avoid memory leaks
      return () => clearInterval(intervalId);
    }, [images.length]);

  return (
    <div className="about-section-container" id="#About">
      <div className="about-section-image-container">
      <img src={images[currentImageIndex]} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">What is FootixVibe?</h1>
        <p className="primary-text">
          FootixVibe is not just another app, it is all you need to stay updated
          on football all around the world. Live scores? We have it. Highlights?
          We have it. Match schedule? We have it. News? We have them. Get access
          to all of them in one click. <br /> <br /> We have gathered the entire
          football world into one single screen for you to not miss out on
          anything from anywhere you are.
        </p>
      </div>
    </div>
  );
};

export default About;
