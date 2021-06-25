import React, {useEffect, useState, SetStateAction} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput
} from 'react-native';
import styles from './AppStyles';
import Amplify, {API, graphqlOperation, Storage} from 'aws-amplify';
import * as mutations from './src/graphql/mutations';
import * as queries from './src/graphql/queries';
import * as subscriptions from './src/graphql/subscriptions';
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import {S3Image} from 'aws-amplify-react-native';
import { LogBox } from 'react-native';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

const App = () => {

  LogBox.ignoreAllLogs();

  const defaultPostState = {id: '', title: '', content: '', image: ''};
  // Post
  const [postState, setPostState] = useState(defaultPostState);
  const [posts, setPosts] = useState([]);
  // Create post section
  const [createSectionState, setCreateSectionState] = useState(true);
  // Update post section
  const [updateSectionState, setUpdateSectionState] = useState(false);
  //image upload
  const [img, setImg] = useState('');

  const urlToBlob = async (url:string) => {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onerror = reject;
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) resolve(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    })
  }

  const onImageUploadChange = async ():Promise<void> => {
    try {
      const options: ImageLibraryOptions = {
        mediaType: 'photo',
        quality: 0.1,
        maxWidth: 400,
        maxHeight: 300
      };

      launchImageLibrary(options,  async (response) => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          setImg(response.uri as string);
          if (response.uri as string) {
            const file: any = response.uri;
            const fileName: any = file.replace(/^.*[\\\/]/, '');
            const contentType: any = fileName.split('.').pop().toLowerCase();
            setInput("image", fileName);
            const responseData = await urlToBlob(file);

            Storage.put(fileName, responseData, {
              contentType: 'image/' + contentType,
            })
              .then(async (result: any) => {
                console.log('result.key', result.key);
                setImg((await Storage.get(result.key)) as string);
                console.log('onImageUploadChange result:', result);
                //setInput('image', img);
              })
              .catch((err) => console.error(err));
          }
          console.log('onImageUploadChange img:', img);
        }
      });
    } catch (err) {
      console.error('onImageUploadChange err:', err);
    }
  };
  
  useEffect(():void => {
    fetchPosts();
  }, []);

  const fetchPosts = async (): Promise<void> => {
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
          input: {
            title: post.title,
            content: post.content,
            image: post.image,
          },
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
            image: post.image,
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
            <View>
              <Text
                style={styles.button}
                onPress={() => {
                  onImageUploadChange();
                }}>
                Pick an image from camera roll
              </Text>
              {img ? (
                <Image source={{uri: img}} style={{width: 320, height: 200}} />
              ) : null}
            </View>
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
              
              <S3Image style={styles.postImage} level="public" imgKey={post.image} />

              <Text style={styles.postTitle}>{post.title} {post.image}</Text>
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
