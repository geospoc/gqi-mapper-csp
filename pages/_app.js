import {CookiesProvider} from "react-cookie";
import {Provider as AuthProvider} from "next-auth/client";
import useScriptText from "../hooks/useScriptText";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.css";

export default function MyApp({Component, pageProps}) {
  const scriptText =
    "\
		const setVh = () => {\
			let vh = window.innerHeight * 0.01;\
			document.documentElement.style.setProperty('--vh', `${vh}px`);\
		};\
		window.addEventListener('load', setVh);\
		window.addEventListener('resize', setVh);";
  useScriptText(scriptText);

  return (
    <CookiesProvider>
      <AuthProvider session={pageProps.session}>
        <Component {...pageProps} />
      </AuthProvider>
    </CookiesProvider>
  );
}
