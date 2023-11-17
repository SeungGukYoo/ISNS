import useComments from 'hooks/useComments';
import CommentBox from '../commnetbox/CommentBox';
import styles from './CommentForm.module.scss';

const CommentForm = () => {
  const { post, content, onSubmit, onChangeValue } = useComments();

  return (
    <>
      <form className={styles.post__form} onSubmit={onSubmit}>
        <textarea
          name="comment"
          id="comment"
          className={styles.post__form_textarea}
          placeholder="comment..."
          required
          value={content}
          onChange={onChangeValue}
        />
        <div className={styles.post__form_submit_area}>
          <input type="submit" value="Comment" className={styles.post__form_submit_btn} />
        </div>
      </form>
      {post?.comments && post?.comments?.length > 0 ? (
        post?.comments.map((comment, idx) => {
          return <CommentBox comment={comment} key={idx} />;
        })
      ) : (
        <div className={styles.post__form_no_comment}>댓글이 없습니다.</div>
      )}
    </>
  );
};

export default CommentForm;
