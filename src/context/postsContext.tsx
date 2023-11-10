import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { PostProps, Props } from '../..';
import { AuthContext } from './authContext';

export const PostsContext = createContext({
  posts: [] as PostProps[],
  getPosts: () => {},
});

const PostContextProvider = ({ children }: Props) => {
  const { firebaseClient, user } = useContext(AuthContext);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const getPosts = useCallback(async () => {
    if (!user) return;
    const postsArr: PostProps[] = [];
    const sortedQuerySnapShot = await firebaseClient?.getSortedPosts();

    sortedQuerySnapShot?.forEach(doc => {
      postsArr.push({ id: doc.id, ...doc.data() } as PostProps);
    });
    setPosts(postsArr);
  }, [firebaseClient, user]);
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return <PostsContext.Provider value={{ posts, getPosts }}>{children}</PostsContext.Provider>;
};

export default PostContextProvider;
