

import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
	static async getInitialProps(
		ctx: DocumentContext
	): Promise<{
		styles: JSX.Element;
		html: string;
		head?: JSX.Element[];
	}> {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;
		// console.log(originalRenderPage);

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(
							<>
								<App {...props} />
							</>
						)
				});

			const initialProps = await Document.getInitialProps(ctx);

			// @ts-ignore
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				)
			};
		} finally {
			sheet.seal();
		}
	}
	render() {
		return (
			<Html>
				<Head>
					<link rel="icon" href="/assets/poker-chip.png" type="image/jpg" sizes="16x16" />
					<style>
						@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Prata&family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap');
					</style>
					<meta
						name="description"
						content="Mezo-genesis is a gaming platform built on the mezo blockchain."
					/>
					<meta property="og:type" content="website" />
					<meta
						property="og:title"
						content="Mezo-genesis"
					/>
					<meta property="og:image" content="/assets/svg-logo.svg" />
					<meta
						property="og:description"
						content="Mezo-genesis is a gaming platform built on the mezo blockchain."
					/>
					<meta
						name="twitter:title"
						content="Mezo-genesis is a gaming platform built on the mezo blockchain."
					/>
					<meta
						name="twitter:description"
						content="Mezo-genesis is a gaming platform built on the mezo blockchain.."
					/>
				</Head>
				<title> MEZO-genesis ⚡🪙 </title>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}