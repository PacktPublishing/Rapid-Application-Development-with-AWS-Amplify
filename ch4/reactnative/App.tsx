import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './AppStyles';
import { Authenticator } from 'aws-amplify-react-native';
import Amplify, { Auth } from 'aws-amplify';
import GreatTheme from './AmplifyUIStyles';

import awsExports from "./aws-exports";

Amplify.configure({
  ...awsExports,
  Auth: {
    oauth: {},
    authenticationFlowType: 'USER_PASSWORD_AUTH'
  },
  Analytics: {
    disabled: true
  }
});

const App = () => {

  const [authState, setAuthState] = React.useState<any>();
  const [user, setUser] = React.useState<any | undefined>();

  const setCurrentUser = () => {
    Auth.currentAuthenticatedUser()
      .then((user: any) => {
        setUser(user);
      })
      .catch((info: any) => {
        console.log("Info: ", info);
      });
  };

  return (authState && user) ? (
    <View style={styles.container}>
      <Text>Gooday {(authState && user) ? user.username : 'mate'}</Text>
      <Button title="Sign out" onPress={() => {
        Auth.signOut().then(
          () => {
            setAuthState(null);
            setUser(null);
          }
        ).catch((info: any) => console.log("Info: ", info));
      }} />
    </View>
  ) : (
      <Authenticator
        signUpConfig={signUpConfig}
        onStateChange={(authState: any) => {
          setAuthState(authState);
          setCurrentUser();
        }}
        theme={GreatTheme}
      />

    );
};

const signUpConfig = {
  header: 'Please sign up here',
  hideAllDefaults: true,
  defaultCountryCode: '61',
  signUpFields: [
    {
      label: 'Please enter your username',
      key: 'username',
      placeholder: 'username',
      required: true,
      displayOrder: 1,
      type: 'string'
    },
    {
      label: 'Please enter a strong password',
      key: 'password',
      placeholder: '********',
      required: true,
      displayOrder: 2,
      type: 'password'
    },
    {
      label: 'Please enter your email',
      key: 'email',
      placeholder: 'abc@domain.com',
      required: true,
      displayOrder: 3,
      type: 'string'
    },
    {
      label: 'Please enter your mobile number',
      key: 'phone_number',
      placeholder: 'mobile number',
      required: false,
      displayOrder: 4,
      type: 'string'
    }
  ]
};

export default App;