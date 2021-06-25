import React, { useEffect, useState, SetStateAction } from "react";
import "./App.css";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";
import * as subscriptions from "./graphql/subscriptions";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

const App = () => {
  const defaultPostState = { id: "", title: "", content: "" };
  // Post
  const [postState, setPostState] = useState(defaultPostState);
  const [posts, setPosts] = useState([]);
  // Create post section
  const [createSectionState, setCreateSectionState] = useState(true);
  // Update post section
  const [updateSectionState, setUpdateSectionState] = useState(false);

  useEffect(() => {

    const fetchPosts = async (): Promise<any> => {
      try {
        console.log("fetching posts");
        const postData: any = await API.graphql(
          graphqlOperation(queries.listPosts)
        );
        const posts: any = postData.data.listPosts.items;
        setPosts(posts);
      } catch (err) {
        console.log("error fetching posts: ", err);
      }
    };
    
    const createSubscription: any = API.graphql(
      graphqlOperation(subscriptions.onCreatePost)
    );
    createSubscription.subscribe({
      next: (postData: any) => {
        console.log("onCreatePost", postData);
        fetchPosts();
      },
    });

    const updateSubscription: any = API.graphql(
      graphqlOperation(subscriptions.onUpdatePost)
    );
    updateSubscription.subscribe({
      next: (postData: any) => {
        console.log("onUpdatePost", postData);
        fetchPosts();
      },
    });

    const deleteSubscription: any = API.graphql(
      graphqlOperation(subscriptions.onDeletePost)
    );
    deleteSubscription.subscribe({
      next: (postData: any) => {
        console.log("onDeletePost", postData);
        fetchPosts();
      },
    });
    
    return () => {
      createSubscription.unsubscribe();
      updateSubscription.unsubscribe();
      updateSubscription.unsubscribe();
    };
  }, []);

  const setInput = (key: any, value: any): any => {
    setPostState({ ...postState, [key]: value });
  };

  const createPost = async (): Promise<any> => {
    try {
      if (!postState.title || !postState.content) return;
      const post = { ...postState };
      console.log("creating post", post);
      const result = await API.graphql(
        graphqlOperation(mutations.createPost, {
          input: { title: post.title, content: post.content },
        })
      );
      setPosts([...posts, post] as SetStateAction<never[]>);
      setPostState(defaultPostState);
      console.log("created post", result);
    } catch (err: any) {
      console.log("error creating post:", err);
    }
  };

  const updatePost = async (): Promise<any> => {
    try {
      if (!postState.title || !postState.content) return;
      const post = { ...postState };
      console.log("updating post", post);
      const result = await API.graphql(
        graphqlOperation(mutations.updatePost, {
          input: {
            id: post.id,
            title: post.title,
            content: post.content,
          },
        })
      );
      setUpdateSectionState(false);
      setCreateSectionState(true);
      console.log("updated post", result);
      setPostState(defaultPostState);
    } catch (err: any) {
      console.log("error updating post:", err);
    }
  };

  const deletePost = async (postID: string): Promise<any> => {
    try {
      if (!postID) return;
      console.log("deleting post", postID);
      const result = await API.graphql(
        graphqlOperation(mutations.deletePost, {
          input: {
            id: postID,
          },
        })
      );
      console.log("deleted post", result);
    } catch (err: any) {
      console.log("error deleting post:", err);
    }
  };

  const findPosts = async (title: string): Promise<any> => {
    try {
      console.log("finding posts:", title);
      const postData: any = await API.graphql(
        graphqlOperation(queries.listPosts, {
          filter: {
            title: {
              contains: title,
            },
          },
        })
      );
      console.log("found posts:");
      const posts: any = postData.data.listPosts.items;
      setPosts(posts);
    } catch (err) {
      console.log("error finding posts ", err);
    }
  };

  return (
    <div>
      <div className="container">
        <input
          className="find"
          type="search"
          onChange={(event) => findPosts(event.target.value)}
          placeholder="Find post by title"
        />
        {createSectionState === true ? (
          <section className="create-section">
            <h2>Create Post</h2>
            <input
              onChange={(event) => setInput("title", event.target.value)}
              value={postState.title}
              placeholder="Title"
            />
            <textarea
              onChange={(event) => setInput("content", event.target.value)}
              value={postState.content}
              placeholder="Content"
            />
            <button className="create-button" onClick={createPost}>
              Create
            </button>
          </section>
        ) : null}

        {updateSectionState === true ? (
          <section className="update-section">
            <h2>Update Post</h2>
            <input
              onChange={(event) => setInput("title", event.target.value)}
              value={postState.title}
              placeholder="Title"
            />
            <textarea
              onChange={(event) => setInput("content", event.target.value)}
              value={postState.content}
              placeholder="Content"
            />
            <button className="create-button" onClick={updatePost}>
              Update
            </button>
          </section>
        ) : null}

        {posts.map((post: any, index: any) => (
          <div key={post.id ? post.id : index} className="post">
            <label className="post-title">{post.title}</label>
            <p className="post-content">{post.content}</p>
            <button
              className="update-button"
              onClick={() => {
                setPostState(post);
                setCreateSectionState(false);
                setUpdateSectionState(true);
              }}
            >
              Update
            </button>
            <button
              className="delete-button"
              onClick={() => {
                deletePost(post.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
