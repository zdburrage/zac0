import config from '../../auth_config_a.json';

const { domain, clientId, audience, apiUri, errorPath } = config as {
  domain: string;
  clientId: string;
  audience?: string;
  apiUri: string;
  errorPath: string;
};

export const environment = {
  production: false,
  auth: {
    domain,
    clientId,
    ...(audience && audience !== 'YOUR_API_IDENTIFIER' ? { audience } : null),
    redirectUri: window.location.origin,
    errorPath,
  },
  httpInterceptor: {
    allowedList: [
      `${apiUri}/api/organization/*`,`${apiUri}/api/organizations/*`, `${apiUri}/api/external`, `${apiUri}/api/users/*`, `${apiUri}/api/connections*`, `${apiUri}/api/clients`
    ],
  },
};