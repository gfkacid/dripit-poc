"use client";
import "@/assets/styles/home.css";
import React, { useCallback } from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Video = ({ slide }) => {
  return (
    <video
      className="absolute"
      autoPlay
      muted
      style={{
        height: "inherit",
        width: "inherit",
        verticalAlign: "top",
        top: 0,
        left: 0,
        objectFit: "cover",
      }}
    >
      <source src={slide.source} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

function Slides({ data }) {
  const getSlideBackground = useCallback((slide) => {
    if (slide.style === "image") return slide.source;

    return "";
  }, []);

  return (
    <div className="h-[32rem] overflow-hidden">
      <AutoplaySlider
        className="home-slider w-full h-full"
        play={true}
        cancelOnInteraction={false} // should stop playing on user interaction
        interval={9000}
        bullets={true}
      >
        {data.map((slide, index) => {
          return (
            <div
              key={index}
              className="drop-slide bg-cover bg-no-repeat w-full h-full overflow-hidden"
              style={{
                backgroundImage:
                  slide.type === "image"
                    ? `url(${getSlideBackground(slide)})`
                    : "",
              }}
            >
              {slide.type === "video" ? <Video slide={slide}></Video> : null}
              {/* <p className="drop-slide-caption text-white text-3xl font-black text-center mb-2">
                {screen.title}
              </p>
              <p className="drop-slide-caption text-white text-xl font-black text-center">
                {screen.artist}
              </p> */}
            </div>
          );
        })}
      </AutoplaySlider>
    </div>
  );
}

export default Slides;
