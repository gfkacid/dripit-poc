"use client";
import "@/assets/styles/home.css";
import React from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";

const screens = [
  {
    backgroundColor: "#4a9c8c",
    title: "God's plan",
    artist: "Drake",
    media:
      "https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F221130104041-01-spotify-top-artists-2022.jpg",
  },
  {
    backgroundColor: "#4a9c8c",
    title: "Dududu",
    artist: "Blackpink",
    media: "https://flowbite.com/docs/images/carousel/carousel-2.svg",
  },
  {
    backgroundColor: "#4a9c8c",
    title: "God's plan",
    artist: "Drake",
    media: "https://flowbite.com/docs/images/carousel/carousel-3.svg",
  },
  {
    backgroundColor: "#4a9c8c",
    title: "God's plan",
    artist: "Drake",
    media: "https://flowbite.com/docs/images/carousel/carousel-4.svg",
  },
];

const AutoplaySlider = withAutoplay(AwesomeSlider);

function Slides() {
  return (
    <div className="h-[32rem] overflow-hidden">
      <AutoplaySlider
        className="home-slider w-full h-full"
        play={true}
        cancelOnInteraction={false} // should stop playing on user interaction
        interval={6000}
        bullets={true}
      >
        {screens.map((screen, index) => (
          <div
            key={index}
            className="drop-slide bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${screen.media})` }}
          >
            <p className="drop-slide-caption text-white text-3xl font-black text-center mb-2">
              {screen.title}
            </p>
            <p className="drop-slide-caption text-white text-xl font-black text-center">
              {screen.artist}
            </p>
          </div>
        ))}
      </AutoplaySlider>
    </div>
  );
}

export default Slides;
