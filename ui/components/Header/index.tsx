import { HeaderContainer, TextLogo, SVGLogo, ConnectButton } from './index.styled';
import { AngleDownIcon } from '../../svgs';

const Header = (): JSX.Element => {
  return (
    <HeaderContainer>
      <TextLogo href="/">
        <img
          style={{ width: "12rem" }}
          src="/assets/mezo.svg"
          alt="logo"
        />
      </TextLogo>

      <SVGLogo href="/">
        <img src="/assets/svg-logo.svg" alt="svg logo" />
      </SVGLogo>

      <div className='dropdown'>
        <ConnectButton>
          Connect Wallet
          <AngleDownIcon size='20' />
        </ConnectButton>
      </div>
    </HeaderContainer>
  );
};

export default Header;
