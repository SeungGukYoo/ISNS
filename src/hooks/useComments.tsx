import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CommentProps, PostProps } from '../..';
import { useAuthContext } from './useContextUtil';

const useComments = () => {
  const { user, firebaseClient } = useAuthContext();
  const [content, setContent] = useState('');
  const [post, setPost] = useState<PostProps | null>(null);

  const { id } = useParams();
  const onChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.target;

    if (name === 'comment') {
      setContent(value);
    }
  };

  const deleteComment = async (comment: CommentProps) => {
    if (!post) return;
    try {
      if (confirm('댓글을 삭제하시겠습니까?')) {
        await firebaseClient?.deleteComment(comment, post.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !post || !id) return;
    try {
      const commentInfo = {
        uid: user?.uid,
        email: user?.email || '',
        photoUrl: user?.photoURL,
        createdAt: new Date().toLocaleDateString('ko', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        content,
      };

      await firebaseClient?.addComment(commentInfo, post.id);

      setContent('');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!id) return;
    const getComments = () => {
      firebaseClient?.getPostObserver(id, setPost);
    };
    getComments();
  }, [firebaseClient, id]);
  return { user, post, content, onSubmit, onChangeValue, deleteComment };
};

export default useComments;
