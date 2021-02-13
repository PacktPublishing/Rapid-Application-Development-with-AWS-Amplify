import React from 'react'; //, { useEffect, useState, SetStateAction }
import './App.css';

import Amplify from 'aws-amplify'; //, { API, graphqlOperation }
//import { createTodo } from './graphql/mutations';
//import { listTodos } from './graphql/queries';

import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn, AmplifySignOut, AmplifyForgotPassword } from '@aws-amplify/ui-react';

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

//const initialState = { name: '', description: '' }
const App = () => {

  const [authState, setAuthState] = React.useState<AuthState>();
  const [user, setUser] = React.useState<any | undefined>();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
        setAuthState(nextAuthState);
        setUser(authData)
    });
  }, []);

  /*
  const [formState, setFormState] = useState(initialState);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const setInput = (key: any, value: any):any => {
    setFormState({ ...formState, [key]: value });
  }

  const fetchTodos = async (): Promise<any> => {
    try {
      const todoData:any = await API.graphql(graphqlOperation(listTodos));
      const todos:any = todoData.data.listTodos.items;
      setTodos(todos);
    } catch (err) { 
      console.log('error fetching todos');
    }
  }

  const addTodo = async (): Promise<any> => {
    try {
      if (!formState.name || !formState.description) return;
      const todo = { ...formState };
      setTodos([...todos, todo] as SetStateAction<never[]>);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createTodo, {input: todo}));
    } catch (err) {
      console.log('error creating todo:', err);
    }
  }
  */

  return authState === AuthState.SignedIn && user ? (
    <div className="container">
      <h2>Amplify Todos</h2>
      <h3>Gooday, {user ? user.username : 'mate'}</h3>
      {/*
      <input
        onChange={event => setInput('name', event.target.value)}
        value={formState.name} 
        placeholder="Name"
      />
      <input
        onChange={event => setInput('description', event.target.value)}
        value={formState.description}
        placeholder="Description"
      />
      <button onClick={addTodo}>Create Todo</button>
      {
        todos.map((todo: any, index: any) => (
          <div key={todo.id ? todo.id : index} className="todo">
            <p className="todoName">{todo.name}</p>
            <p className="todoDescription">{todo.description}</p>
          </div>
        ))
      }
      */}
      <p><AmplifySignOut /></p>
    </div>
  ) : (
    <div className="container">
      <AmplifyAuthenticator usernameAlias="email">
        <AmplifySignIn 
            slot="sign-in"
            headerText="Please login"
            usernameAlias="email"
            submitButtonText="Log in"
            formFields={[
              {
                type: "email",
                label: "Please enter your email address",
                placeholder: "you@domain.com",
                required: true,
              },
              {
                type: "password",
                label: "Please enter your password",
                placeholder: "********",
                required: true,
              }
            ]} 
          />
          <AmplifySignUp
            slot="sign-up"
            usernameAlias="email"
            headerText="Please sign up here:"
            haveAccountText="Already have an account?"
            submitButtonText="Sign up"
            formFields={[
              {
                type: "email",
                label: "Please enter your email",
                placeholder: "you@domain.com",
                required: true,
              },
              {
                type: "password",
                label: "Plase use a strong password",
                placeholder: "********",
                required: true,
              },
              {
                type: "phone_number",
                label: "Plase enter your phone number",
                placeholder: "123-123-1234",
                required: false,
              },
            ]} 
          />
          <AmplifyForgotPassword
            slot="forgot-password"
            usernameAlias="email"
            headerText="Forgot Password" />
      </AmplifyAuthenticator>
    </div>
      
  );
}

export default App