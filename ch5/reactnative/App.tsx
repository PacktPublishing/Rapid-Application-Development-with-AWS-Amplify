import React, {useEffect, useState, SetStateAction} from 'react';
import {View, Text, SafeAreaView, ScrollView, TextInput} from 'react-native';
import styles from './AppStyles';
import Amplify, {API, graphqlOperation} from 'aws-amplify';
import * as mutations from './src/graphql/mutations';
import * as queries from './src/graphql/queries';
import * as subscriptions from './src/graphql/subscriptions';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

const App = () => {
  const defaultPostState = {id: '', title: '', content: ''};
  // Post
  const [postState, setPostState] = useState(defaultPostState);
  const [posts, setPosts] = useState([]);
  // Create post section
  const [createSectionState, setCreateSectionState] = useState(true);
  // Update post section
  const [updateSectionState, setUpdateSectionState] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async (): Promise<any> => {
    try {
      console.log('fetching posts');
      const postData: any = await API.graphql(
        graphqlOperation(queries.listPosts),
      );
      const posts: any = postData.data.listPosts.items;
      setPosts(posts);
    } catch (err) {
      console.log('error fetching posts: ', err);
    }
  };

  const createSubscription: any = API.graphql(
    graphqlOperation(subscriptions.onCreatePost),
  );
  createSubscription.subscribe({
    next: (postData: any) => {
      console.log('onCreatePost', postData);
      fetchPosts();
    },
  });

  const updateSubscription: any = API.graphql(
    graphqlOperation(subscriptions.onUpdatePost),
  );
  updateSubscription.subscribe({
    next: (postData: any) => {
      console.log('onUpdatePost', postData);
      fetchPosts();
    },
  });
  const deleteSubscription: any = API.graphql(
    graphqlOperation(subscriptions.onDeletePost),
  );
  deleteSubscription.subscribe({
    next: (postData: any) => {
      console.log('onDeletePost', postData);
      fetchPosts();
    },
  });

  const setInput = (key: any, value: any): any => {
    setPostState({...postState, [key]: value});
  };

  const createPost = async (): Promise<any> => {
    try {
      if (!postState.title || !postState.content) return;
      const post = {...postState};
      console.log('creating post', post);
      const result = await API.graphql(
        graphqlOperation(mutations.createPost, {
          input: {title: post.title, content: post.content},
        }),
      );
      setPosts([...posts, post] as SetStateAction<never[]>);
      setPostState(defaultPostState);
      console.log('created post', result);
    } catch (err: any) {
      console.log('error creating post:', err);
    }
  };

  const updatePost = async (): Promise<any> => {
    try {
      if (!postState.title || !postState.content) return;
      const post = {...postState};
      console.log('updating post', post);
      const result = await API.graphql(
        graphqlOperation(mutations.updatePost, {
          input: {
            id: post.id,
            title: post.title,
            content: post.content,
          },
        }),
      );
      setUpdateSectionState(false);
      setCreateSectionState(true);
      console.log('updated post', result);
      setPostState(defaultPostState);
    } catch (err: any) {
      console.log('error updating post:', err);
    }
  };

  const deletePost = async (postID: string): Promise<any> => {
    try {
      if (!postID) return;
      console.log('deleting post', postID);
      const result = await API.graphql(
        graphqlOperation(mutations.deletePost, {
          input: {
            id: postID,
          },
        }),
      );
      console.log('deleted post', result);
    } catch (err: any) {
      console.log('error deleting post:', err);
    }
  };

  const findPosts = async (title: string): Promise<any> => {
    try {
      console.log('finding posts:', title);
      const postData: any = await API.graphql(
        graphqlOperation(queries.listPosts, {
          filter: {
            title: {
              contains: title,
            },
          },
        }),
      );
      console.log('found posts:');
      const posts: any = postData.data.listPosts.items;
      setPosts(posts);
    } catch (err) {
      console.log('error finding posts ', err);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          onChangeText={(val) => findPosts(val)}
          style={styles.input}
          placeholder="Search"
        />

        {createSectionState ? (
          <View>
            <Text style={styles.title}>Create Post</Text>
            <TextInput
              onChangeText={(val) => setInput('title', val)}
              style={styles.input}
              value={postState.title}
              placeholder="Title"
            />
            <TextInput
              onChangeText={(val) => setInput('content', val)}
              style={styles.textArea}
              value={postState.content}
              placeholder="Content"
            />
            <Text style={styles.button} onPress={createPost}>
              Create Post
            </Text>
          </View>
        ) : null}

        {updateSectionState ? (
          <View>
            <Text style={styles.title}>Update Post</Text>
            <TextInput
              onChangeText={(val) => setInput('title', val)}
              style={styles.input}
              value={postState.title}
              placeholder="Title"
            />
            <TextInput
              onChangeText={(val) => setInput('content', val)}
              style={styles.textArea}
              value={postState.content}
              placeholder="Content"
            />
            <Text style={styles.button} onPress={updatePost}>
              Update Post
            </Text>
          </View>
        ) : null}

        <ScrollView style={styles.scrollView}>
          {posts.map((post: any, index: any) => (
            <View key={post.id ? post.id : index} style={styles.post}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postContent}>{post.content}</Text>

              <View style={{flexDirection: 'row'}}>
                <Text
                  style={styles.postUpdate}
                  onPress={() => {
                    setPostState(post);
                    setUpdateSectionState(true);
                    setCreateSectionState(false);
                  }}>
                  Update
                </Text>
                <Text
                  style={styles.postDelete}
                  onPress={() => {
                    deletePost(post.id);
                  }}>
                  Delete
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default App;
