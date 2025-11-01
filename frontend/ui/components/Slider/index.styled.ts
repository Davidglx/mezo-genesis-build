import styled from "styled-components";

export const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 900px;
  height: 450px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
`;

export const SlidesWrapper = styled.div<{ $current: number }>`
  display: flex;
  width: 500%;
  height: 100%;
  transform: ${({ $current }) => `translateX(-${$current * 100}%)`};
  transition: transform 0.6s ease-in-out;
`;

export const Slide = styled.div`
  flex: 0 0 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  color: white;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
  }
`;

export const SlideContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 40px;
  max-width: 500px;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.9;
  }
`;

export const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 2rem;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s ease;

  &.prev {
    left: 15px;
  }
  &.next {
    right: 15px;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

export const Dots = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  display: flex;
  gap: 8px;
`;

export const Dot = styled.button<{ $active?: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: ${({ $active }) =>
    $active ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.5)"};
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }
`;
