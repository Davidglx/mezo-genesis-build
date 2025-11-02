// import styled, { keyframes } from "styled-components";

// const glow = keyframes`
//   0% { filter: drop-shadow(0 0 2px #00ffcc); }
//   50% { filter: drop-shadow(0 0 8px #00ffcc); }
//   100% { filter: drop-shadow(0 0 2px #00ffcc); }
// `;

// export const PoweredWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 8px;
//   padding: 16px;
//   font-family: ${({ theme }) => theme.fonts.Inter || "Roboto, sans-serif"};
//   background: transparent;
// `;

// export const Text = styled.p`
//  color: #f07a2d;
//   font-size: 1.3rem;
//  font-family: ${({ theme }) => theme.fonts.Chopsic}; 
//   opacity: 0.8;
//   letter-spacing: 0.5px;
// `;

// export const Logo = styled.img`
//   width: 120px;
//   height: auto;
//   cursor: pointer;
//   transition: transform 0.3s ease, opacity 0.5s ease;
//   animation: ${glow} 3s infinite ease-in-out;

//   &:hover {
//     transform: scale(1.08);
//     opacity: 0.95;
//   }
// `;



import styled, { keyframes } from "styled-components";

const glow = keyframes`
  0% { filter: drop-shadow(0 0 2px #00ffcc); }
  50% { filter: drop-shadow(0 0 8px #00ffcc); }
  100% { filter: drop-shadow(0 0 2px #00ffcc); }
`;

export const PoweredWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  font-family: ${({ theme }) => theme.fonts.Inter || "Roboto, sans-serif"};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 6px;
    padding: 12px;
  }
`;

export const Text = styled.p`
  color: #f07a2d;
  font-size: 1.3rem;
  font-family: ${({ theme }) => theme.fonts.Chopsic}; 
  opacity: 0.8;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const Logo = styled.img`
  width: 120px;
  height: auto;
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.5s ease;
  animation: ${glow} 3s infinite ease-in-out;

  &:hover {
    transform: scale(1.08);
    opacity: 0.95;
  }

  @media (max-width: 768px) {
    width: 90px;
  }

  @media (max-width: 480px) {
    width: 70px;
  }
`;
