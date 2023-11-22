import useFollow from 'hooks/useFollow';
import { useEffect } from 'react';
import { PostProps } from '../../..';

const FollowBox = ({ post }: { post: PostProps }) => {
  const { follow, onFollowing, onUnFollowing, onFollow } = useFollow();
  useEffect(() => {
    onFollow(post.uid);
  }, [post.uid, onFollow]);

  return (
    <>
      {follow ? (
        <button className="post__unfollowing-btn" onClick={() => onUnFollowing(post.uid)}>
          unFollow
        </button>
      ) : (
        <button className="post__following-btn" onClick={() => onFollowing(post.uid)}>
          Following
        </button>
      )}
    </>
  );
};

export default FollowBox;
