// index.styled.ts
import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #f8fafc, #e2e8f0);
  padding: 80px 16px;
`;

export const Title = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
  color: #111827;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const CarouselWrapper = styled.div`
  position: relative;
  max-width: 1280px;
  margin: 64px auto 0;
`;

export const GreenBackground = styled.div`
  position: absolute;
  left: 5%;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  height: 450px;
  background: linear-gradient(to right, #bbf7d0, #86efac, #bbf7d0);
  opacity: 0.5;
  border-radius: 40px;
  z-index: 0;

  @media (max-width: 768px) {
    height: 420px;
  }
`;

export const GradientLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 128px;
  background: linear-gradient(to right, #e2e8f0, transparent);
  z-index: 10;
  pointer-events: none;
`;

export const GradientRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 128px;
  background: linear-gradient(to left, #e2e8f0, transparent);
  z-index: 10;
  pointer-events: none;
`;

export const ScrollContainer = styled.div`
  position: relative;
  z-index: 1;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 32px;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const CardsWrapper = styled.div`
  display: flex;
  gap: 24px;
  width: max-content;
`;

export const TestimonialCard = styled.div`
  width: 240px;
  min-width: 280px;
  background: white;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    width: 280px;
    min-width: 280px;
    padding: 20px;
  }
`;


export const StarsWrapper = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 24px;
`;

export const TestimonialText = styled.p`
  color: #4b5563;
  font-size: 1.125rem;
  line-height: 1.75;
  margin-bottom: 32px;
  min-height: 140px;

  @media (max-width: 768px) {
    font-size: 1rem;
    min-height: auto;
  }
`;

export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Avatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 0 4px #d1fae5;
`;

export const AuthorDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AuthorName = styled.h4`
  font-weight: bold;
  color: #111827;
  font-size: 1.125rem;
  margin-bottom: 2px;
`;

export const AuthorRole = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
`;

export const ScrollHint = styled.p`
  text-align: center;
  color: #9ca3af;
  margin-top: 32px;
  font-size: 0.875rem;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
`;
