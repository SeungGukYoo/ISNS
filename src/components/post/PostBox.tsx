import FollowBox from 'components/follow/FollowBox';
import useForm from 'hooks/useForm';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import type { PostProps } from '../../..';

const PostBox = ({ post }: { post: PostProps }) => {
  const { user, onDeleteData, likeTooglePost } = useForm();

  return (
    <div className="post__box" key={post.id}>
      <div className="post__box-profile">
        <div className="post__flex">
          {post.profileUrl && post.profileUrl?.length > 0 ? (
            <img src={post.profileUrl} className="post__box-img" />
          ) : (
            <FaUserCircle className="post__box-icon" />
          )}
          <div className="post__flex-between">
            <div className="post__flex">
              <div className="post__email">{post.email}</div>
              <div className="post__createdAt">{post.createdAt}</div>
            </div>
            {user?.uid !== post.uid && <FollowBox post={post} />}
          </div>
        </div>
        {post?.imageUrl && (
          <div className="post__image">
            <img src={post.imageUrl} alt="image" />
          </div>
        )}

        <Link to={`/posts/${post.id}`}>
          <div className="post__content">{post.content}</div>
          <div className="post__form-hashtag-tags">
            {post?.hashtags.map((hashtag, idx) => (
              <span className="post__form-hashtag-tag" key={idx}>
                #{hashtag}
              </span>
            ))}
          </div>
        </Link>
      </div>
      <div className="post__box-footer">
        {post.uid === user?.uid && (
          <>
            <button type="button" className="post__delete" onClick={() => onDeleteData(post)}>
              Delete
            </button>
            <button type="button" className="post__edit">
              <Link to={`/posts/edit/${post.id}`}>Edit</Link>
            </button>
          </>
        )}

        <button type="button" className="post__likes" onClick={() => likeTooglePost(post)}>
          {post?.likes?.find(userId => userId === user?.uid) ? <AiFillHeart /> : <AiOutlineHeart />}
          {post?.likeCount || 0}
        </button>
        <button type="button" className="post__comments">
          <FaRegComment />
          {post?.comments?.length || 0}
        </button>
      </div>
    </div>
  );
};

export default PostBox;
