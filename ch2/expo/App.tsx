import React, { useEffect, useState, SetStateAction } from 'react';

import { View, Text, TextInput, Button } from 'react-native';

import styles from './AppStyles';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { createTodo } from './src/graphql/mutations';
import { listTodos } from './src/graphql/queries';

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = { name: '', description: '' }

const App = () => {
  const [formState, setFormState] = useState(initialState);
  const [todos, setTodos] = useState<any[]>([]);

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
      setTodos([...todos, todo] as SetStateAction<any[]>);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createTodo, {input: todo}));
    } catch (err) {
      console.log('error creating todo:', err);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={val => setInput('name', val)}
        style={styles.input}
        value={formState.name} 
        placeholder="Name"
      />
      <TextInput
        onChangeText={val => setInput('description', val)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <Button title="Create Todo" onPress={addTodo} />
      {
        todos.map((todo, index) => (
          <View key={todo.id ? todo.id : index} style={styles.todo}>
            <Text style={styles.todoName}>{todo.name}</Text>
            <Text>{todo.description}</Text>
          </View>
        ))
      }
    </View>
  )
}

export default App;