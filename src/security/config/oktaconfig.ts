export const oktaConfig = {

    clientId: '0oa9e5mew3ItpDbRV5d7',

    issuer: 'https://dev-46143953.okta.com/oauth2/default',
    
    redirectUri: 'http://localhost:3000/login/callback',
    
    scopes: ['openid', 'profile', 'email'],
    
    pkce: true,
    
    disableHttpsCheck: true
    
}