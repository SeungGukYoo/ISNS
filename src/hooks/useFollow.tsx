import { useCallback, useState } from 'react';
import { useAuthContext } from './useContextUtil';

const useFollow = () => {
  const { user, firebaseClient } = useAuthContext();
  const [follow, setFollow] = useState(false);
  const onUnFollowing = async (postId: string) => {
    if (!user?.uid) return;
    try {
      await firebaseClient?.unfollowingUser(user?.uid, postId);
      await firebaseClient?.unfollowerUser(user?.uid, postId);
    } catch (error) {
      console.error(error);
    }
  };
  const onFollowing = async (postId: string) => {
    if (!user?.uid) return;
    try {
      await firebaseClient?.followingUser(user?.uid, postId);
      await firebaseClient?.followerUser(user?.uid, postId);
    } catch (error) {
      console.error(error);
    }
  };

  const onFollow = useCallback(
    (postId: string) => {
      if (!user) return;
      firebaseClient?.followObserver(setFollow, user.uid, postId);
    },
    [firebaseClient, user],
  );

  return { follow, onFollowing, onUnFollowing, onFollow };
};

export default useFollow;
