import useForm from 'hooks/useForm';

import { FiImage } from 'react-icons/fi';

const PostEditForm = () => {
  const {
    imgUrl,
    content,
    hashtag,
    hashtags,
    progress,
    onHandleKeyup,
    onDeleteImg,
    onDeleteHashtag,
    onChangeValue,
    onSubmitForm,
  } = useForm();

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
        <input
          type="text"
          name="hashtag"
          className="post__form-hashtag"
          placeholder="#OOTD"
          value={hashtag}
          onKeyUp={onHandleKeyup}
          onChange={onChangeValue}
        />
      </div>

      <div className="post__form-submit-area">
        {imgUrl && (
          <div className="post__form-img-container">
            <img src={imgUrl} alt="image" />
            <button type="button" onClick={onDeleteImg} className="post__form-delete-img">
              X
            </button>
          </div>
        )}
        <div className="post__form-image-area">
          <label htmlFor="file-input" className="post__form-file">
            <FiImage className="post__form-file-icon" />
          </label>
          <input
            className="hidden"
            id="file-input"
            type="file"
            name="file-input"
            accept="image/*"
            onChange={onChangeValue}
          />
          <input
            type="submit"
            value={progress ? 'Wating' : 'Complate'}
            className="post__form-submit-btn"
          />
        </div>
      </div>
    </form>
  );
};

export default PostEditForm;
