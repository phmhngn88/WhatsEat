import React from "react";
import "./Banner.css";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Banner1 from "../../assets/Banner/Banner1.jpg";
import Banner2 from "../../assets/Banner/Banner2.jpg";
import Banner3 from "../../assets/Banner/Banner3.jpg";

const slideImages = [
  {
    url: "../../assets/Banner/Banner1.jpg",
    caption: "Slide 1",
    image: Banner1,
  },
  {
    url: "../../assets/Banner/Banner2.jpg",
    caption: "Slide 2",
    image: Banner2,
  },
  {
    url: "../../assets/Banner/Banner3.jpg",
    caption: "Slide 3",
    image: Banner3,
  },
];

const Banner = () => {
  return (
    <div className="slide-container">
      <Slide className="slide">
        {slideImages.map((slideImage, index) => (
          <div className="each-slide" key={index}>
            <div style={{ backgroundImage: `url(${slideImage.url})` }}>
              <img
                src={slideImage.image}
                alt={slideImage.caption}
                className="image"
              />
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Banner;
