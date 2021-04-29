import {useEffect} from "react";

export default function useScriptText(text) {
  useEffect(() => {
    var scriptFound = false;
    let allsuspects = document.getElementsByTagName("script");
    for (let i = allsuspects.length; i >= 0; i--) {
      if (
        allsuspects[i] &&
        allsuspects[i].getAttribute("src") === null &&
        allsuspects[i].text.includes("setVh")
      ) {
        scriptFound = true;
        break;
      }
    }
    if (!scriptFound) {
      const script = document.createElement("script");

      script.text = text;
      script.async = true;

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [text]);
}
