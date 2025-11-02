// // index.styled.ts
// import styled from 'styled-components';

// export const Container = styled.div`
//   min-height: 100vh;
//   background: linear-gradient(to bottom right, #f8fafc, #e2e8f0);
//   padding: 80px 16px;
// `;

// export const Title = styled.h2`
//   font-size: 3rem;
//   font-weight: bold;
//   text-align: center;
//   margin-bottom: 16px;
//   color: #111827;
//   max-width: 1280px;
//   margin-left: auto;
//   margin-right: auto;

//   @media (max-width: 768px) {
//     font-size: 2rem;
//   }
// `;

// export const CarouselWrapper = styled.div`
//   position: relative;
//   max-width: 1280px;
//   margin: 64px auto 0;
// `;

// export const GreenBackground = styled.div`
//   position: absolute;
//   left: 5%;
//   right: 5%;
//   top: 50%;
//   transform: translateY(-50%);
//   height: 450px;
//   background: linear-gradient(to right, #bbf7d0, #86efac, #bbf7d0);
//   opacity: 0.5;
//   border-radius: 40px;
//   z-index: 0;

//   @media (max-width: 768px) {
//     height: 420px;
//   }
// `;


// export const ScrollContainer = styled.div`
//   position: relative;
//   z-index: 1;
//   overflow-x: auto;
//   overflow-y: hidden;
//   padding-bottom: 32px;
//   scroll-snap-type: x mandatory;
//   scroll-behavior: smooth;

//   &::-webkit-scrollbar {
//     display: none;
//   }
//   -ms-overflow-style: none;
//   scrollbar-width: none;
// `;

// export const CardsWrapper = styled.div`
//   display: flex;
//   gap: 24px;
//   width: max-content;
// `;

// export const TestimonialCard = styled.div`
//   width: 240px;
//   min-width: 280px;
//   background: white;
//   border-radius: 20px;
//   padding: 24px;
//   box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
//   transition: all 0.3s ease;

//   &:hover {
//     box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
//     transform: translateY(-5px);
//   }

//   @media (max-width: 768px) {
//     width: 280px;
//     min-width: 280px;
//     padding: 20px;
//   }
// `;


// export const StarsWrapper = styled.div`
//   display: flex;
//   gap: 4px;
//   margin-bottom: 24px;
// `;

// export const TestimonialText = styled.p`
//   color: #4b5563;
//   font-size: 1.125rem;
//   line-height: 1.75;
//   margin-bottom: 32px;
//   min-height: 140px;

//   @media (max-width: 768px) {
//     font-size: 1rem;
//     min-height: auto;
//   }
// `;

// export const AuthorInfo = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 16px;
// `;

// export const Avatar = styled.img`
//   width: 64px;
//   height: 64px;
//   border-radius: 50%;
//   object-fit: cover;
//   box-shadow: 0 0 0 4px #d1fae5;
// `;

// export const AuthorDetails = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// export const AuthorName = styled.h4`
//   font-weight: bold;
//   color: #111827;
//   font-size: 1.125rem;
//   margin-bottom: 2px;
// `;

// export const AuthorRole = styled.p`
//   color: #6b7280;
//   font-size: 0.875rem;
// `;

// export const ScrollHint = styled.p`
//   text-align: center;
//   color: #9ca3af;
//   margin-top: 32px;
//   font-size: 0.875rem;
//   max-width: 1280px;
//   margin-left: auto;
//   margin-right: auto;
// `;



import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f9fafb, #eef2ff);
  padding: 100px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  text-align: center;
  color: #0f172a;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.p`
  text-align: center;
  max-width: 680px;
  color: #475569;
  margin-top: 12px;
  font-size: 1.125rem;
  line-height: 1.7;
`;

export const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1280px;
  margin-top: 80px;
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
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #a7f3d0;
    border-radius: 9999px;
  }
`;

export const CardsWrapper = styled.div`
  display: flex;
  gap: 32px;
  padding: 10px 40px;
  width: max-content;
`;

export const StepCard = styled.div`
  background: #ffffff;
  border-radius: 24px;
  padding: 32px 28px;
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

  @media (max-width: 768px) {
    min-width: 260px;
    padding: 24px;
  }
`;

export const StepIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const StepText = styled.p`
  color: #334155;
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 28px;
  text-align: center;
  min-height: 120px;
`;

export const StepInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
`;

export const Avatar = styled.img`
  width: 58px;
  height: 58px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 0 4px #d1fae5;
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
`;

export const StepRole = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

export const ScrollHint = styled.p`
  text-align: center;
  color: #94a3b8;
  margin-top: 36px;
  font-size: 0.9rem;
`;
