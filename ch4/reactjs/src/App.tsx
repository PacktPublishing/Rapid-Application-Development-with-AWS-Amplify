import React from 'react';
import './App.css';
import Amplify, { Auth } from 'aws-amplify';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

Auth.configure({
  authenticationFlowType: 'USER_PASSWORD_AUTH'
});

const App = () => {
  const [authState, setAuthState] = React.useState<AuthState>();
  const [user, setUser] = React.useState<any | undefined>();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData)
    });
  }, []);

  return (
    <div className="container">
      <h3>Gooday, {authState === AuthState.SignedIn && user ? user.username : 'mate'}</h3>
      <p><AmplifySignOut /></p>
    </div>
  )
}

export default withAuthenticator(App);