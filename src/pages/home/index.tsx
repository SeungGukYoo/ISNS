import { AiFillHeart } from 'react-icons/ai';
import { FaRegComment, FaUser } from 'react-icons/fa';
import { FiImage } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import type { PostProps } from '../../..';
const posts: PostProps[] = [
  {
    id: '1',
    email: 'test1@email.com',
    content: 'content text',
    createdAt: '2023-11-08 Tue',
    uid: 'unique ID',
    profileUrl: '',
    likeCount: 1,
    likes: ['a'],
    comments: [],
  },
  {
    id: '2',
    email: 'test2@email.com',
    content: 'content text2',
    createdAt: '2023-11-08 Tue',
    uid: 'unique ID2',
    profileUrl: '',
    likeCount: 3,
    likes: ['a'],
    comments: ['a'],
  },
  {
    id: '3',
    email: 'test3@email.com',
    content: 'content tex3',
    createdAt: '2023-11-08 Tue',
    uid: 'unique ID3',
    profileUrl: '',
    likeCount: 3,
    likes: ['a', 'b', 'c'],
    comments: ['a', 'b'],
  },
];

function HomePage() {
  const handleFileUpload = () => {
    console.log('event');
  };
  const handleDelete = () => {
    console.log('event');
  };
  return (
    <div className="home">
      <div className="home__title">Home</div>
      <div className="home__tabs">
        <div className="home__tab home__tab-active">For YOU</div>
        <div className="home__tab">Following</div>
      </div>
      <form action="" className="post__form">
        <textarea
          name="content"
          id="content"
          className="post__form-textarea"
          placeholder="What is Happening"
          required
        />
        <div className="post__form-submit-area">
          <label htmlFor="file-input" className="post__form-file">
            <FiImage className="post__form-file-icon" />
          </label>
          <input
            className="hidden"
            type="file"
            name="file-input"
            accept="image/*"
            onChange={handleFileUpload}
          />
          <input type="submit" value="Tweet" className="post__form-submit-btn" />
        </div>
      </form>
      <div className="post">
        {posts.map(el => (
          <div className="post__box" key={el.id}>
            <Link to={`/posts/${el.id}`}>
              <div className="post__box-profile">
                <div className="post__flex">
                  {el.profileUrl && el.profileUrl?.length > 0 ? (
                    <img src={el.profileUrl} />
                  ) : (
                    <FaUser className="post__box-avatar" />
                  )}
                  <div className="post__email">{el.email}</div>
                  <div className="post__createdAt">{el.createdAt}</div>
                </div>
                <div className="post__content">{el.content}</div>
              </div>
            </Link>
            <div className="post__box-footer">
              {/* post.uid===user.uid */}
              <>
                <button type="button" className="post__delete" onClick={handleDelete}>
                  Delete
                </button>
                <button type="button" className="post__edit">
                  <Link to={`/posts/edit/${el.id}`}>Edit</Link>
                </button>
              </>
              <button type="button" className="post__likes">
                <AiFillHeart />
                {el?.likeCount || 0}
              </button>
              <button type="button" className="post__comments">
                <FaRegComment />
                {el?.comments?.length || 0}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
