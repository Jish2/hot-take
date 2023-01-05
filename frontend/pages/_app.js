import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

export default function App({ Component, pageProps }) {
	return (
		<div>
			<Head>
				<meta name="apple-mobile-web-app-title" content="HotTake" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta charSet="UTF-8" />
				<link rel="icon" href="/teal-fire-icon.svg" sizes="any" />
				<link rel="icon" href="/teal-fire-icon.svg" type="image/svg+xml" />
				<link rel="shortcut icon" href="/teal-fire-icon.svg" />

				{/* <link rel="shortcut icon" type="image/svg" href="../public/teal-fire-icon.svg" /> */}

				{/* <link rel="apple-touch-icon" size="512" href="../public/teal-fire-icon.svg" /> */}
				{/* <link rel="manifest" href="/manifest.json" /> */}

				<title>HotTake</title>
			</Head>
			<ChakraProvider>
				<Component {...pageProps} />
			</ChakraProvider>
		</div>
	);
}
