import useComments from 'hooks/useComments';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { CommentProps } from '../../../..';
import styles from './CommentBox.module.scss';

const CommentBox = ({ comment }: { comment: CommentProps }) => {
  const { user, deleteComment } = useComments();

  return (
    <div className={styles.comment}>
      <div className={styles.comment__header}>
        <div className={styles.comment__profile_box}>
          {comment.photoUrl ? (
            <img src={comment.photoUrl} alt="" />
          ) : (
            <FaUserCircle className={styles.profile__icon} />
          )}
        </div>
        <p>{comment.email}</p>
        <p>{comment.createdAt}</p>
      </div>
      <div className={styles.comment__body}>{comment.content}</div>
      {user?.uid === comment.uid && (
        <div className={styles.comment__btn_area}>
          <button className={styles.comment__delete} onClick={() => deleteComment(comment)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(CommentBox);
