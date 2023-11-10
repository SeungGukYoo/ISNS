import useForm from 'hooks/useForm';
import { FiImage } from 'react-icons/fi';

const PostForm = () => {
  const { content, onChangeValue, onSubmitForm } = useForm();

  return (
    <form onSubmit={onSubmitForm} className="post__form">
      <textarea
        name="content"
        id="content"
        className="post__form-textarea"
        placeholder="What is Happening"
        value={content}
        onChange={onChangeValue}
        required
      />
      <div className="post__form-hashtags-area">
        <div className="post__form-hashtag-tags">
          {Array.from({ length: 5 }).map((el, idx) => {
            console.log(idx);
            return (
              <span className="post__form-hashtag-tag" key={idx}>
                #hashtag
              </span>
            );
          })}
        </div>
        <input type="text" name="hashtag" className="post__form-hashtag" placeholder="#OOTD" />
      </div>
      <div className="post__form-submit-area">
        <label htmlFor="file-input" className="post__form-file">
          <FiImage className="post__form-file-icon" />
        </label>
        <input className="hidden" type="file" name="file-input" accept="image/*" />
        <input type="submit" value="Tweet" className="post__form-submit-btn" />
      </div>
    </form>
  );
};

export default PostForm;
