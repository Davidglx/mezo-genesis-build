import React, { useRef, useEffect } from "react";
import {
  Container,
  Title,
  Subtitle,
  CarouselWrapper,
  GradientBackground,
  ScrollContainer,
  CardsWrapper,
  StepCard,
  StepIconWrapper,
  StepText,
  StepInfo,
  Avatar,
  StepDetails,
  StepName,
  StepRole,
} from "./index.styled";

import { steps } from "./MOCK_DATA";

const StepsCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let index = 0;
    const cards = container.querySelectorAll("div[role='stepcard']");
    const cardWidth = cards[0]?.clientWidth || 300;
    const gap = 32;

    const scrollInterval = setInterval(() => {
      index++;
      if (index >= steps.length) index = 0;

      const scrollPosition = (cardWidth + gap) * index;
      container.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }, 2500);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <Container>
      <Title>Steps to Use Mezo-Genesis</Title>
      <Subtitle>Follow these simple steps to start your blockchain journey.</Subtitle>

      <CarouselWrapper>
        <GradientBackground />
        <ScrollContainer ref={scrollRef}>
          <CardsWrapper>
            {steps.map((step, index) => (
              <StepCard key={index} role="stepcard">
                <StepIconWrapper>
                  <img
                    src={step.image}
                    alt={step.name}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 12,
                      boxShadow: "0 0 12px rgba(0,255,204,0.4)",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLImageElement).style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                    }}
                  />

                </StepIconWrapper>

                <StepText>
                  {step.text}{" "}
                  {step.link && (
                    <a
                      href={step.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#2563eb", textDecoration: "underline" }}
                    >
                      {step.link.label}
                    </a>
                  )}
                </StepText>

                <StepInfo>
                  {/* <Avatar src={step.image} alt={step.name} /> */}
                  <StepDetails>
                    <StepName>{step.name}</StepName>
                    <StepRole>{step.role}</StepRole>
                  </StepDetails>
                </StepInfo>
              </StepCard>
            ))}
          </CardsWrapper>
        </ScrollContainer>
      </CarouselWrapper>
    </Container>
  );
};

export default StepsCarousel;
