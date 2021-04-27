import React from "react";
import {signIn} from "next-auth/client";

import "./providerButtons.module.css";

const ProviderIcon = ({provider}) => {
  switch (provider) {
    case "facebook":
      return <img src="/icons/facebook-blue.svg"></img>;
    case "twitter":
      return <img src="icons/twitter-blue.svg"></img>;
    case "google":
      return <img src="icons/google-blue.svg"></img>;
    case "github":
      return <img src="icons/github-blue.svg"></img>;
    default:
      return null;
  }
};

const ProviderButtons = ({providers, callbackUrl}) => {
  return (
    <div>
      {Object.values(providers).map((provider) => (
        <button
          key={provider.name}
          className="provider-button"
          onClick={() => signIn(provider.id, {callbackUrl})}
        >
          <div className="provider-button-content">
            <ProviderIcon provider={provider.id} />
            <div>Sign in with {provider.name}</div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ProviderButtons;
