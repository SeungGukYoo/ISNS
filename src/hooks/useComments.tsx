import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { PostProps } from '../..';
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
  return { post, content, onSubmit, onChangeValue };
};

export default useComments;
