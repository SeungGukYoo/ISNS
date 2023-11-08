import React from 'react';
import { FiImage } from 'react-icons/fi';

const PostForm = () => {
  const handleFileUpload = () => {
    console.log('event');
  };
  return (
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
  );
};

export default PostForm;