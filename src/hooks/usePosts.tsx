import { useCallback, useEffect, useState } from 'react';
import { PostProps } from '../..';
import { useAuthContext } from './useContextUtil';

const usePosts = () => {
  const { user, firebaseClient } = useAuthContext();
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [tabType, setTabType] = useState<'all' | 'following'>('all');
  const changeTabType = useCallback(async (type: typeof tabType) => {
    if (!user) return;

    try {
      let snapShot;
      if (type === 'following') {
        snapShot = await firebaseClient?.getLikePosts(user?.uid);
        const postsData: PostProps[] = [];
        snapShot?.forEach(element => {
          postsData.push({ ...element.data(), id: element.id } as PostProps);
        });
        setPosts(postsData);
        setTabType('following');
      } else {
        firebaseClient?.getPostsObserver(setPosts);
        setTabType('all');
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    changeTabType('all');
  }, [changeTabType, firebaseClient]);
  return { posts, tabType, changeTabType };
};

export default usePosts;
