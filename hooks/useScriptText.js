import { useEffect } from 'react';

export default function useScriptText(text) {
  useEffect(() => {
    const script = document.createElement('script');

    script.text = text;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [text]);
};
