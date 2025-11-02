import styled from 'styled-components';


// connect wallet items and header styles
export const connectButtonDropdown = styled.div`
 position : relative
`

// text logo styling
export const TextLogo = styled.a`
	gap: 1rem;
	color: white;
	display: flex;
	@media (max-width: 576.98px) {
		display: none;
	}
`;

// svg logo styling
export const SVGLogo = styled.a`
	@media (min-width: 576.98px) {
		display: none;
	}
`;

export const HeaderContainer = styled.header`
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   position: sticky;
//   top: 0;
//   z-index: 1000;
display : flex;
width : 100%;
  justify-content: space-between;

`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    padding: 1rem;
  }
`;

export const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: white;
  cursor: pointer;

  @media (max-width: 576.98px) {
    gap: 0.5rem;
  }
`;

export const LogoIcon = styled.span`
  font-size: 2rem;

  @media (max-width: 576.98px) {
    font-size: 1.5rem;
  }
`;

export const LogoText = styled.div`
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.Inter};

    @media (max-width: 576.98px) {
      font-size: 1rem;
    }
  }

  p {
    font-size: 0.75rem;
    margin: 0;
    opacity: 0.8;

    @media (max-width: 576.98px) {
      font-size: 0.6rem;
    }
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 2rem;

  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    font-family: ${({ theme }) => theme.fonts.Inter};
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }

  @media (max-width: 768px) {
    order: 3;
    width: 100%;
    margin-top: 1rem;
    justify-content: center;
    gap: 1rem;
  }

  @media (max-width: 576.98px) {
    gap: 0.5rem;
    
    a {
      font-size: 0.875rem;
    }
  }
`;

export const WalletSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 576.98px) {
    gap: 0.5rem;
  }
`;



  /* background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); */
  /* font-family: ${({ theme }) => theme.fonts.Inter}; */



export const ConnectButton = styled.button`
background-color: #f07a2d;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  font-family: ${({ theme }) => theme.fonts.Chopsic}; 
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.2s;
  text-transform: uppercase;
  font-size: 13px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 576.98px) {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
  }
`;

export const WalletInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 576.98px) {
    gap: 0.5rem;
    flex-wrap: wrap;
  }
`;

export const NetworkBadge = styled.div<{ isCorrect: boolean }>`
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: bold;
  font-family: ${({ theme }) => theme.fonts.Inter};
  background: ${({ isCorrect }) => (isCorrect ? '#10b981' : '#ef4444')};
  color: white;
  animation: ${({ isCorrect }) => (!isCorrect ? 'pulse 2s infinite' : 'none')};

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
  }

  @media (max-width: 576.98px) {
    font-size: 0.65rem;
    padding: 0.2rem 0.5rem;
  }
`;

export const BalanceCard = styled.div`
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;

  @media (max-width: 576.98px) {
    padding: 0.4rem 0.7rem;
  }
`;

export const BalanceLabel = styled.div`
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.25rem;
  font-family: ${({ theme }) => theme.fonts.Inter};

  @media (max-width: 576.98px) {
    font-size: 0.6rem;
  }
`;

export const BalanceAmount = styled.div`
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
  font-family: ${({ theme }) => theme.fonts.Inter};

  @media (max-width: 576.98px) {
    font-size: 0.75rem;
  }
`;

export const AddressDropdown = styled.div`
  position: relative;
`;

export const AddressButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: bold;
  font-family: ${({ theme }) => theme.fonts.Inter};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 576.98px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
  }
`;


export const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 0.5rem);
  background: #1f2937;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  min-width: 200px;
  display: none;
  animation: fadeIn 0.2s;
  z-index: 9999;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 576.98px) {
    min-width: 180px;
  }
`;

export const DropdownContent = styled.div`
  padding: 1rem;

  @media (max-width: 576.98px) {
    padding: 0.75rem;
  }
`;

export const DropdownLabel = styled.div`
  font-size: 0.75rem;
  color: #9ca3af;
  margin-bottom: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.Inter};

  @media (max-width: 576.98px) {
    font-size: 0.65rem;
  }
`;

export const DropdownAddress = styled.div`
  color: white;
  font-size: 0.875rem;
  word-break: break-all;
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.fonts.Inter};

  @media (max-width: 576.98px) {
    font-size: 0.75rem;
  }
`;

export const DisconnectButton = styled.button`
  width: 100%;
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: bold;
  font-family: ${({ theme }) => theme.fonts.Inter};
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  position: relative;

  &:hover {
    background: #dc2626;
  }

  @media (max-width: 576.98px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.75rem;
  }
`;

export const BorrowNotice = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: 0.375rem;
  font-size: 0.75rem;
  color: #fbbf24;
  text-align: center;

  a {
    color: #fbbf24;
    text-decoration: underline;
    font-weight: bold;
    
    &:hover {
      color: #f59e0b;
    }
  }

  @media (max-width: 576.98px) {
    font-size: 0.65rem;
    padding: 0.5rem;
  }
`;
