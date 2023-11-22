import { useCallback, useEffect, useState } from 'react';
import { PostProps } from '../..';
import { useAuthContext } from './useContextUtil';

const usePosts = () => {
  const { user, firebaseClient } = useAuthContext();
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [tabType, setTabType] = useState<'all' | 'following'>('all');
  const changeTabType = useCallback(
    async (type: typeof tabType) => {
      if (!user) return;

      try {
        if (type === 'following') {
          const postsData: PostProps[] = [];
          const followingPostList = await firebaseClient?.getFollowingPost(user.uid);

          followingPostList?.forEach(post => {
            postsData.push({ id: post.id, ...post.data() } as PostProps);
          });

          setPosts(postsData || null);
          setTabType('following');
        } else {
          firebaseClient?.getPostsObserver(setPosts);
          setTabType('all');
        }
      } catch (error) {
        console.error(error);
      }
    },
    [firebaseClient, user],
  );

  useEffect(() => {
    changeTabType('all');
  }, [changeTabType, firebaseClient]);
  return { posts, tabType, changeTabType };
};

export default usePosts;
