import React, { useState, useEffect, useRef } from "react";
import {
  SliderContainer,
  SlidesWrapper,
  Slide,
  SlideContent,
} from "./index.styled";

const slides = [
  { title: "Explore New Worlds", text: "Discover amazing experiences." },
  { title: "Fresh Inspirations", text: "Fuel your creativity daily." },
  { title: "Tech & Innovation", text: "Stay ahead with smart ideas." },
  { title: "Design the Future", text: "Turn visions into reality." },
  { title: "Adventure Awaits", text: "Step into the unknown." },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (!containerRef.current) return;
      e.preventDefault();

      const delta = e.deltaY;
      if (delta > 0) {
        // scroll down
        setCurrent((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
      } else {
        // scroll up
        setCurrent((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };

    const container = containerRef.current;
    container?.addEventListener("wheel", handleScroll, { passive: false });
    return () => container?.removeEventListener("wheel", handleScroll);
  }, []);

  return (
    <SliderContainer ref={containerRef}>
      <SlidesWrapper $current={current}>
        {slides.map((slide, i) => (
          <Slide key={i}>
            <SlideContent>
              <h3>{slide.title}</h3>
              <p>{slide.text}</p>
            </SlideContent>
          </Slide>
        ))}
      </SlidesWrapper>
    </SliderContainer>
  );
};

export default Slider;
