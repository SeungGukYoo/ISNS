import useForm from 'hooks/useForm';

import { AiFillHeart } from 'react-icons/ai';
import { FaRegComment, FaUserCircle } from 'react-icons/fa';
import { MdOutlineNavigateBefore } from 'react-icons/md';
import { Link } from 'react-router-dom';
const PostDetailForm = () => {
  const { post, id, user, hashtags, onDeleteData, onDeleteHashtag } = useForm();

  return (
    <div className="post__box" key={id}>
      <div>
        <MdOutlineNavigateBefore className="post__arrow-icon" />
        <div className="post__box-profile">
          <div className="post__flex">
            {post?.profileUrl && post.profileUrl?.length > 0 ? (
              <img src={post.profileUrl} className="post__box-img" />
            ) : (
              <FaUserCircle className="post__box-icon" />
            )}
            <div className="post__email">{post?.email}</div>
            <div className="post__createdAt">{post?.createdAt}</div>
          </div>
          <div className="post__content">{post?.content}</div>
          <div className="post__form-hashtag-tags">
            {hashtags.map((el, idx) => {
              return (
                <span
                  className="post__form-hashtag-tag"
                  key={idx}
                  onClick={() => onDeleteHashtag(el)}
                >
                  #{el}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div className="post__box-footer">
        {post?.uid === user?.uid && id && (
          <>
            <button type="button" className="post__delete" onClick={() => onDeleteData(id)}>
              Delete
            </button>
            <button type="button" className="post__edit">
              <Link to={`/posts/edit/${id}`}>Edit</Link>
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

export default PostDetailForm;
