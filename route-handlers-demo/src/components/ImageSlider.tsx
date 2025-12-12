"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/app/globals.css";

// import {serverSideFunction} from "@/utils/server-utils"; 

export default function ImageSlider() {
    var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
<div className="image-slider-container">
    <Slider {...settings}>
      <div>
        <img src="https://img.freepik.com/free-photo/beautiful-tree-middle-field-covered-with-grass-with-tree-line-background_181624-29267.jpg?semt=ais_hybrid&w=740&q=80" alt="Image 1"/>
      </div>
      <div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUeFp30ZaXxXo9gPyz2Db2mbxfu_a4fZyRA&s" alt="Image 2"/>
      </div>
      <div>
        <img src="https://img.freepik.com/free-photo/photorealistic-view-tree-nature-with-branches-trunk_23-2151478075.jpg?semt=ais_hybrid&w=740&q=80" alt="Image 3"/>
      </div>
      <div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPphJ6JdNCaIYlgiG2ZzqTvcOmYdB2RvHmYQ&s" alt="Image 4"/>
      </div>
      <div>
        <img src="https://www.shutterstock.com/image-photo/sun-sets-behind-mountain-ranges-600nw-2479236003.jpg" alt="Image 5"/>
      </div>
      <div>
        <img src="https://www.shutterstock.com/image-photo/sun-sets-behind-mountain-ranges-600nw-2479236003.jpg" alt="Image 6"/>
      </div>
    </Slider>
    </div>
  )
}