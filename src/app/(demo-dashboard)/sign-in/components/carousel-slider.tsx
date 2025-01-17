"use client";
import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import styled from "@emotion/styled";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderWrapper = styled("div")`
  .slick-dots {
    position: absolute;

    width: 100%;
    display: flex !important;
    justify-content: center;
  }

  .slick-dots li {
    width: 14px;
    height: 8px;
    margin: 0 5px;
    transition: width 0.3s ease-in-out;
  }

  .slick-dots li.slick-active {
    width: 56px;
  }

  .ft-slick__dots--custom {
    height: 8px;
    width: 14px;
    background-color: rgba(112, 104, 88, 1);
    border-radius: 4px;
    position: relative;
  }

  .slick-dots .slick-active .ft-slick__dots--custom {
    width: 56px;
    overflow: hidden;
    position: relative;
    background-color: rgba(186, 174, 146, 1);
  }

  @keyframes loading {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }

  .slick-dots .slick-active .loading {
    height: 8px;
    animation: loading var(--autoplay-speed) linear infinite;
    background-image: linear-gradient(
      270deg,
      rgba(186, 174, 146, 1),
      rgba(112, 104, 88, 1)
    );
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 4px;
  }
`;

function CarouselSlider() {
  const autoplaySpeed = 4000;

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: autoplaySpeed,
    fade: true,
    cssEase: "linear",
    arrows: false,
    dots: true,
    appendDots: (dots: any) => <ul>{dots}</ul>,
    customPaging: (i: any) => (
      <div className="ft-slick__dots--custom">
        <div className="loading" />
      </div>
    ),
  };
  return (
    <SliderWrapper
      className="w-full"
      style={{ "--autoplay-speed": `${autoplaySpeed}ms` } as any}
    >
      <Slider {...settings}>
        <div className="flex flex-col items-center text-center px-10">
          <h2 className="font-poly text-3xl leading-7 text-neutral-800">
            Effortless access to the{" "}
            <span className="text-[#7C3AED]">
              knowledge that matters most.
            </span>
          </h2>
          <p className="font-nunito text-lg leading-10 font-normal text-secondary">
            Save your time for the important stuff
          </p>
          <Image
            src="/studying.png"
            alt="Slide 1"
            width={300}
            height={300}
            className="m-auto slider-image"
          />
        </div>
        <div className="flex flex-col items-center text-center px-10">
          <h2 className="font-poly text-3xl leading-7 text-neutral-800">
            <span className="text-[#7C3AED]">Streamline</span> Your
            Workflow
          </h2>
          <p className="font-nunito text-lg leading-10 font-normal text-secondary">
            Turn scattered data into real-time tasks that boost your team's
            performance.
          </p>
          <Image
            src="/user-flow.png"
            alt="Slide 1"
            width={300}
            height={300}
            className="m-auto slider-image"
          />
        </div>
        <div className="flex flex-col items-center text-center px-10">
          <h2 className="font-poly text-3xl leading-7 text-neutral-800">
            Insights That
            <span className="text-[#7C3AED]"> Drive Action</span>
          </h2>
          <p className="font-nunito text-lg leading-10 font-normal text-secondary">
            Simplify your workflow with actionable, data-driven insights.
          </p>
          <Image
            src="/consulting.png"
            alt="Slide 1"
            width={300}
            height={300}
            className="m-auto slider-image"
          />
        </div>
      </Slider>
    </SliderWrapper>
  );
}

export default CarouselSlider;
