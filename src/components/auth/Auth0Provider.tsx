import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

interface Auth0ProviderWithHistoryProps {
  prop: any;
}

const Auth0ProviderWithHistory = (props: React.PropsWithChildren<Auth0ProviderWithHistoryProps>) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN || 'test';
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || 'test';
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  const history = useHistory();

  const onRedirectCallback = (appState: any) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={audience}
    >
      {props.children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
