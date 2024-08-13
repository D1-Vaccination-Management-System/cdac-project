import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../images/1.jpg";
import img2 from "../images/2.jpg";
import img3 from "../images/3.jpg";
import img4 from "../images/4.jpg";

// Slider settings
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: true,
};

const ImageSlider = () => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg">
      <Slider {...settings}>
        <div>
          <img
            src={img1}
            alt="Slide 1"
            className="w-full h-auto object-cover transform transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div>
          <img
            src={img2}
            alt="Slide 2"
            className="w-full h-auto object-cover transform transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div>
          <img
            src={img3}
            alt="Slide 3"
            className="w-full h-auto object-cover transform transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div>
          <img
            src={img4}
            alt="Slide 4"
            className="w-full h-auto object-cover transform transition-transform duration-500 hover:scale-105"
          />
        </div>
      </Slider>
    </div>
  );
};

export default ImageSlider;
