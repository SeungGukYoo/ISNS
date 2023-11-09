import { doc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { createContext, useContext, useEffect, useState } from 'react';
import { PostProps, Props } from '../..';
import { AuthContext } from './authContext';

export const PostsContext = createContext({
  posts: [] as PostProps[],
});

const PostContextProvider = ({ children }: Props) => {
  const { firebaseClient, user } = useContext(AuthContext);
  const [posts, setPosts] = useState<PostProps[]>([]);
  useEffect(() => {
    const getPosts = async () => {
      if (!user) return;
      const postsArr: PostProps[] = [];
      const querySnapShot = await firebaseClient?.getAllPosts();
      querySnapShot?.forEach(doc => {
        postsArr.push({ id: doc.id, ...doc.data() } as PostProps);
      });
      setPosts(postsArr);
    };
    getPosts();
  }, [firebaseClient, user]);
  return <PostsContext.Provider value={{ posts }}>{children}</PostsContext.Provider>;
};

export default PostContextProvider;
