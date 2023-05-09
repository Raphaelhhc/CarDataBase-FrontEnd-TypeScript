import { Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { SpinnerLoad } from '../../layouts/utils/spinnerload';
import OktaSignInWidget from './signinwidget';

const LoginWidget = ({ config }) => {

    const { oktaAuth, authState } = useOktaAuth();

    const onSuccess = (tokens) => {
        oktaAuth.handleLoginRedirect(tokens);
    };

    const onError = (err) => {
        console.log('Sign in error: ', err);
    };

    if (!authState) {
        return (
            <SpinnerLoad />
        );
    };

    return authState.isAuthenticated ?
    <Redirect to={{pathname: '/'}}/>
    :
    <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError}/>
};

export default LoginWidget;