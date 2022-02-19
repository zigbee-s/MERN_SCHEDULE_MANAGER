import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import {Auth0Provider} from '@auth0/auth0-react';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="gauraang.us.auth0.com"
      clientId="H7IpbvKB6IuxVizgzJehuMWhUjym9u4m"
      redirectUri={window.location.origin}
      audience="my first auth0"
      scope="openid profile email"
    >
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
