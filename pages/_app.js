import { CookiesProvider } from "react-cookie";
import useScriptText from '../hooks/useScriptText';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';


export default function MyApp({ Component, pageProps }) {

	const scriptText = "\
		const setVh = () => {\
			let vh = window.innerHeight * 0.01;\
			document.documentElement.style.setProperty('--vh', `${vh}px`);\
		};\
		window.addEventListener('load', setVh);\
		window.addEventListener('resize', setVh);";
	useScriptText(scriptText);

	return  (
		<CookiesProvider>
			<Component {...pageProps} />
		</CookiesProvider>
	);
}
