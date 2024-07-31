const msal = require('@azure/msal-node');

function createClientApp(
  clientId: string,
  clientSecret: string,
  tenantId: string
) {
  const config = {
    auth: {
      clientId: clientId,
      authority: `https://login.microsoftonline.com/${tenantId}`,
      clientSecret: clientSecret,
    },
  };

  const cca = new msal.ConfidentialClientApplication(config);

  async function getToken() {
    const clientCredentialRequest = {
      scopes: ['https://graph.microsoft.com/.default'],
    };

    try {
      const response = await cca.acquireTokenByClientCredential(
        clientCredentialRequest
      );
      return response.accessToken;
    } catch (error) {
      console.error(error);
    }
  }

  return { getToken };
}

module.exports = createClientApp;
