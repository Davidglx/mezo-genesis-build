

/// importing relevant styles
import { FooterContainer, SocialLink , FooterItem} from './index.styled';

// footer JSX  Component
const Footer = () => {
	return (
		<FooterContainer>
			<FooterItem>Sponsored by </FooterItem>
			<SocialLink href="https://polygon.technology/" target='_blank'>
			 <img src='/assets/matic_logo.png' alt='polygon'/>
			</SocialLink>
			<SocialLink href='https://chain.link/' target='_blank'>
			  <img src='/assets/chainlink.png' alt='alchemy' style={{
				  width: "2rem"
			  }}/>
			 </SocialLink>
			<SocialLink href='https://www.alchemy.com/' target='_blank'>
			  <img src='/assets/alchemy.png' alt='alchemy' style={{
				  width: "2rem"
			  }}/>
			 </SocialLink>
			<SocialLink href="https://xend.finance/" target='_blank'>
			 <img src='/assets/xend_finance.png' alt='xend finance'/>
			</SocialLink>
		</FooterContainer>
	);
};

export default Footer;
