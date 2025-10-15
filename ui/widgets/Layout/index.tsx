

// importing relevant modules and parts of layout
import React from 'react';
import Header from '../../components/Header';
import Scroll from '../../components/Scroll';

// import WebFont from 'webfontloader' and stylings from styled-component;
import { FooterWrapper, HeaderWrapper, LayoutWrapper, Main } from './index.styled';



// JSX Component
const Layout = ({ children, background }: { children: React.ReactNode, background: boolean }): JSX.Element => {
	return (
		<LayoutWrapper style={{
			// backgroundImage: background ? "url('/assets/pageBG.svg')" : "url('/assets/Landing.png')"
			backgroundImage: background ? "url('/assets/pageBG.svg')" : "url('/assets/first-mezo-wallie.jpg')"
		}}>
			 { !background &&  <Scroll/> }
			<HeaderWrapper>
				<Header />
			</HeaderWrapper>
			<Main>{children}</Main>
			{/* <FooterWrapper>
				<Footer />
			</FooterWrapper> */}
		</LayoutWrapper>
	);
};

// exporting
export default Layout;
