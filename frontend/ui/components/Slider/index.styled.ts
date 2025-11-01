import styled from "styled-components";

export const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 300px; /* smaller section */
  margin: 80px auto;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  background: #f8f8f8;
`;

export const SlidesWrapper = styled.div<{ $current: number }>`
  display: flex;
  flex-direction: column;
  height: 500%; /* 5 slides stacked */
  transform: ${({ $current }) => `translateY(-${$current * 100}%)`};
  transition: transform 0.7s ease-in-out;
`;

export const Slide = styled.div`
  flex: 0 0 20%; /* 1/5 of total height */
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff758c, #ff7eb3);
  color: white;
  font-weight: bold;
  font-size: 1.2rem;

  &:nth-child(2) {
    background: linear-gradient(135deg, #43cea2, #185a9d);
  }
  &:nth-child(3) {
    background: linear-gradient(135deg, #ff9966, #ff5e62);
  }
  &:nth-child(4) {
    background: linear-gradient(135deg, #00c6ff, #0072ff);
  }
  &:nth-child(5) {
    background: linear-gradient(135deg, #7f00ff, #e100ff);
  }
`;

export const SlideContent = styled.div`
  text-align: center;
  padding: 30px;
  h3 {
    font-size: 1.4rem;
    margin-bottom: 10px;
  }
  p {
    font-size: 0.95rem;
    opacity: 0.9;
  }
`;
