import React, { useState } from "react";
import {
  SliderContainer,
  SlidesWrapper,
  Slide,
  NavButton,
  Dots,
  Dot,
  SlideContent,
} from "./index.styled";

const slides = [
  {
    title: "Explore New Worlds",
    text: "Discover amazing experiences with our travel collection.",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    title: "Fresh Inspirations",
    text: "Find your daily motivation and fuel your creativity.",
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
  },
  {
    title: "Tech & Innovation",
    text: "Stay ahead of the curve with the latest tech trends.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
  {
    title: "Design the Future",
    text: "Turn ideas into beautiful realities with our tools.",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
  {
    title: "Adventure Awaits",
    text: "Step out of your comfort zone and explore the unknown.",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((p) => (p + 1) % slides.length);
  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);
  const goTo = (i: number) => setCurrent(i);

  return (
    <SliderContainer>
      <SlidesWrapper $current={current}>
        {slides.map((slide, i) => (
          <Slide key={i} style={{ backgroundImage: `url(${slide.img})` }}>
            <SlideContent>
              <h2>{slide.title}</h2>
              <p>{slide.text}</p>
            </SlideContent>
          </Slide>
        ))}
      </SlidesWrapper>

      <NavButton className="prev" onClick={prev}>‹</NavButton>
      <NavButton className="next" onClick={next}>›</NavButton>

      <Dots>
        {slides.map((_, i) => (
          <Dot key={i} $active={i === current} onClick={() => goTo(i)} />
        ))}
      </Dots>
    </SliderContainer>
  );
};

export default Slider;
