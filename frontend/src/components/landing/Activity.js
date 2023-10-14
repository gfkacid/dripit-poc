"use client";
import { getlatestActivity } from "@/store/landing/actions";
import { selecLandingActivity } from "@/store/landing/selectors";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect } from "react";
import Slider from "react-slick";
import PreviewActivity from "@/components/drops/PreviewActivity";

const settings = {
  dots: false,
  arrows: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  speed: 4000,
  autoplaySpeed: 4000,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Activity = ({ data }) => {
  const dispatch = useDispatch();
  const activity = useSelector((state) => data || selecLandingActivity(state));

  const fetchActivity = useCallback(
    () => dispatch(getlatestActivity()),
    [dispatch]
  );

  useEffect(() => {
    // const interval = setInterval(fetchActivity, 5000);
    // return () => clearInterval(interval);
  }, [dispatch, fetchActivity]);

  if (!activity?.length) return null;

  return (
    <div className="mt-24 mb-24">
      <h4 className="text-sm mb-10">_ ACTIVITY</h4>

      <Slider {...settings}>
        {activity.map((activity, index) => (
          <div key={index}>
            <PreviewActivity activity={activity} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Activity;
