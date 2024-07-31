import { PublicClientApplication } from '@azure/msal-browser';

const MSAL_CONFIG = {
  auth: {
    clientId: '344dcab6-cf4b-46f5-bc6a-cd681ea83865',
    authority:
      'https://login.microsoftonline.com/d55d6021-755d-4528-8982-3ff647447ac3',
    redirectUri: 'http://localhost:3000',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};

const LOGIN_REQUEST = {
  scopes: ['openid', 'offline_access'],
};

const TOKEN_REQUEST = {
  scopes: ['User.Read'],
};

const GRAPH_CONFIG = {
  graphUsersEndpoint: 'https://graph.microsoft.com/v1.0/users',
};

const PUBLIC_CLIENT_APPLICATION = new PublicClientApplication(MSAL_CONFIG);
async function initializeMsal() {
  await PUBLIC_CLIENT_APPLICATION.initialize();
}
initializeMsal();

export {
  MSAL_CONFIG,
  LOGIN_REQUEST,
  TOKEN_REQUEST,
  GRAPH_CONFIG,
  PUBLIC_CLIENT_APPLICATION,
};
