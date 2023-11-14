import { useEffect, useState } from 'react';
import { PostProps } from '../..';
import { useAuthContext } from './useContextUtil';

const useProfile = () => {
  const { user, firebaseClient } = useAuthContext();
  const [posts, setPosts] = useState<PostProps[]>([]);
  useEffect(() => {
    const getPost = async () => {
      try {
        if (user?.uid) {
          const snapshot = await firebaseClient?.getPersonalPost(user?.uid);
          const postsData: PostProps[] = [];
          snapshot?.forEach(element => {
            postsData.push({ ...element.data(), id: element.id } as PostProps);
          });
          setPosts(postsData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getPost();
  }, [firebaseClient, user?.uid]);

  return { user, posts };
};

export default useProfile;
