import { createContext, useContext, useEffect, useState } from 'react';
import { PostProps, Props } from '../..';
import { AuthContext } from './authContext';

export const PostsContext = createContext({
  posts: [] as PostProps[],
});

const PostContextProvider = ({ children }: Props) => {
  const { firebaseClient } = useContext(AuthContext);
  const [posts, setPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    firebaseClient?.getPostsObserver(setPosts);
  }, [setPosts, firebaseClient]);

  return <PostsContext.Provider value={{ posts }}>{children}</PostsContext.Provider>;
};

export default PostContextProvider;
