//import styles from './layout.module.scss'
import useScriptURL from "../hooks/useScriptURL";
import useScriptText from "../hooks/useScriptText";

export default function Layout({children, myClass}) {
  let c = "cover-container d-flex w-100 h-100 mx-auto flex-column";
  if (myClass) {
    c += " " + myClass;
  }
  useScriptURL("https://www.googletagmanager.com/gtag/js?id=UA-177568679-3");
  const scriptText =
    "\
		window.dataLayer = window.dataLayer || [];\
		function gtag(){dataLayer.push(arguments);}\
		gtag('js', new Date());\
		gtag('config', 'UA-177568679-3');";
  useScriptText(scriptText);

  return <div className={c}>{children}</div>;
}
