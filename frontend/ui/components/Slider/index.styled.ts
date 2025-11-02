import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f9fafb, #eef2ff);
  padding: 100px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) { padding: 60px 16px; }
  @media (max-width: 480px) { padding: 40px 12px; }
`;

export const Title = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  text-align: center;
  color: #0f172a;
  letter-spacing: -0.02em;

  @media (max-width: 768px) { font-size: 2rem; }
  @media (max-width: 480px) { font-size: 1.6rem; }
`;

export const Subtitle = styled.p`
  text-align: center;
  max-width: 680px;
  color: #475569;
  margin-top: 12px;
  font-size: 1.125rem;
  line-height: 1.7;

  @media (max-width: 768px) { font-size: 1rem; max-width: 90%; }
  @media (max-width: 480px) { font-size: 0.9rem; }
`;

export const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1280px;
  margin-top: 80px;

  @media (max-width: 768px) { margin-top: 60px; }
  @media (max-width: 480px) { margin-top: 40px; }
`;

export const GradientBackground = styled.div`
  position: absolute;
  left: 4%;
  right: 4%;
  top: 50%;
  transform: translateY(-50%);
  height: 460px;
  border-radius: 48px;
  background: linear-gradient(90deg, #bbf7d0, #86efac, #bbf7d0);
  opacity: 0.35;
  z-index: 0;

  @media (max-width: 768px) { height: 380px; }
  @media (max-width: 480px) { height: 300px; }
`;


export const ScrollContainer = styled.div`
  position: relative;
  z-index: 1;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding-bottom: 24px;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;

  -ms-overflow-style: none;
`;


export const CardsWrapper = styled.div`
  display: flex;
  gap: 32px;
  padding: 10px 40px;
  width: max-content;

  @media (max-width: 768px) { gap: 24px; padding: 10px 20px; }
  @media (max-width: 480px) { gap: 16px; padding: 10px 12px; }
`;

export const StepCard = styled.div`
  background: #ffffff;
  border-radius: 24px;
  padding: 24px 20px;
  width: 280px;
  min-width: 280px;
  scroll-snap-align: start;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid rgba(229, 231, 235, 0.6);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.15);
  }

  @media (max-width: 768px) { min-width: 240px; padding: 20px; }
  @media (max-width: 480px) { min-width: 200px; padding: 16px; }
`;

export const StepIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;

  @media (max-width: 480px) { margin-bottom: 12px; }
`;

export const StepText = styled.p`
  color: #334155;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 20px;
  text-align: left;
  min-height: 100px;
  overflow-wrap: break-word;

  @media (max-width: 768px) { font-size: 0.85rem; min-height: 90px; margin-bottom: 16px; }
  @media (max-width: 480px) { font-size: 0.8rem; min-height: 80px; margin-bottom: 12px; }
`;

export const StepInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;

  @media (max-width: 480px) { gap: 10px; }
`;

export const Avatar = styled.img`
  width: 58px;
  height: 58px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 0 4px #d1fae5;

  @media (max-width: 768px) { width: 50px; height: 50px; }
  @media (max-width: 480px) { width: 42px; height: 42px; }
`;

export const StepDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const StepName = styled.h4`
  font-weight: 600;
  color: #111827;
  font-size: 1.05rem;

  @media (max-width: 768px) { font-size: 0.95rem; }
  @media (max-width: 480px) { font-size: 0.85rem; }
`;

export const StepRole = styled.p`
  font-size: 0.875rem;
  color: #6b7280;

  @media (max-width: 768px) { font-size: 0.8rem; }
  @media (max-width: 480px) { font-size: 0.75rem; }
`;
