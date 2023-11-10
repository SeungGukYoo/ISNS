import useForm from 'hooks/useForm';
import { AiFillHeart } from 'react-icons/ai';
import { FaRegComment, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import type { PostProps } from '../..';

const PostBox = ({ post }: { post: PostProps }) => {
  const { user, onDeleteData } = useForm();

  return (
    <div className="post__box" key={post.id}>
      <Link to={`/posts/${post.id}`}>
        <div className="post__box-profile">
          <div className="post__flex">
            {post.profileUrl && post.profileUrl?.length > 0 ? (
              <img src={post.profileUrl} className="post__box-img" />
            ) : (
              <FaUserCircle className="post__box-icon" />
            )}
            <div className="post__email">{post.email}</div>
            <div className="post__createdAt">{post.createdAt}</div>
          </div>
          <div className="post__content">{post.content}</div>
        </div>
      </Link>
      <div className="post__box-footer">
        {post.uid === user?.uid && (
          <>
            <button type="button" className="post__delete" onClick={() => onDeleteData(post.id)}>
              Delete
            </button>
            <button type="button" className="post__edit">
              <Link to={`/posts/edit/${post.id}`}>Edit</Link>
            </button>
          </>
        )}

        <button type="button" className="post__likes">
          <AiFillHeart />
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
