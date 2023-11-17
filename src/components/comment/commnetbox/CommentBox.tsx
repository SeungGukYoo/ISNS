import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { CommentProps } from '../../../..';
import styles from './CommentBox.module.scss';

const CommentBox = ({ comment }: { comment: CommentProps }) => {
  return (
    <div className={styles.comment}>
      <div className={styles.comment__header}>
        <div className={styles.comment__profile_box}>
          {comment.profileUrl ? (
            <img src={comment.profileUrl} alt="" />
          ) : (
            <FaUserCircle className={styles.profile__icon} />
          )}
        </div>
        <p>{comment.email}</p>
        <p>{comment.createdAt}</p>
      </div>
      <div className={styles.comment__body}>{comment.content}</div>
    </div>
  );
};

export default CommentBox;
