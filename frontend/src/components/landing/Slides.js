"use client";
import "@/assets/styles/home.css";
import { getSlides } from "@/store/landing/actions";
import {
  selectSlidesActive,
  selectSlidesData,
} from "@/store/landing/selectors";
import { setSlidesActive, setSlidesData } from "@/store/landing/slice";
import React, { useCallback, useEffect } from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import { useDispatch, useSelector } from "react-redux";

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
      <source src={slide?.source} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

function Slides({ data }) {
  const dispatch = useDispatch();
  const slides = useSelector(selectSlidesData);
  const active = useSelector(selectSlidesActive);

  const getSlideBackground = useCallback((slide) => {
    if (slide.type === "image") return slide.source;

    return "";
  }, []);

  useEffect(() => {
    if (data && !slides?.length) {
      dispatch(setSlidesData(data));
      // dispatch(setSlidesActive(data?.[0]?.source));
    }
  }, [data, dispatch, slides?.length]);

  useEffect(() => {
    dispatch(getSlides());
  }, [dispatch]);

  return (
    <div className="h-[32rem] overflow-hidden">
      <AutoplaySlider
        className="home-slider w-full h-full"
        play={true}
        cancelOnInteraction={false} // should stop playing on user interaction
        interval={9000}
        bullets={true}
        onTransitionStart={(props) => {
          dispatch(setSlidesActive(props.currentIndex));
        }}
      >
        {(slides?.length ? slides : data).map((slide, index) => {
          return (
            <div
              key={index}
              className="drop-slide bg-cover bg-no-repeat w-full h-full overflow-hidden relative"
              style={{
                backgroundImage:
                  slide.type === "image"
                    ? `url(${getSlideBackground(slide)})`
                    : "",
              }}
            >
              {slide.type === "video" ? (
                <Video slide={slide} key={active} />
              ) : null}
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
