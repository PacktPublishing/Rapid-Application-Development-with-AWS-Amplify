import React from 'react';
import { Text } from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native';
import Amplify from 'aws-amplify';
import GreatTheme from './AmplifyUIStyles';
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const App = async () => {
  return (
    <Text>Hello world</Text>
  );
};

const signUpConfig = {
  header: 'Please sign up here',
  hideAllDefaults: true,
  defaultCountryCode: '852',
  signUpFields: [
    {
      label: 'Please enter your email',
      key: 'email',
      placeholder: 'abc@domain.com',
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
      label: 'Please enter your mobile number',
      key: 'phone_number',
      placeholder: 'mobile number',
      required: false,
      displayOrder: 3,
      type: 'string'
    }
  ]
};

export default withAuthenticator(App,
  {
    usernameAttributes: 'email',
    signUpConfig: signUpConfig
  }, [], null, GreatTheme
)
