import { AuthContext } from 'context/authContext';
import { PostsContext } from 'context/postsContext';
import React, { useContext, useState } from 'react';

const useForm = () => {
  const { user, firebaseClient } = useContext(AuthContext);
  const { getPosts } = useContext(PostsContext);
  const [content, setContent] = useState('');
  const [error, setError] = useState<null | string>(null);

  const onChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    if (name === 'content') {
      setContent(value);
    }
  };
  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (content.trim().length < 5) {
      setError('5글자 이상 입력해주시길 바랍니다.');
      return;
    }

    try {
      const dataForm = {
        content,
        email: user?.email,
        uid: user?.uid,
        createdAt: new Date().toLocaleDateString('ko', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      };
      const response = await firebaseClient?.addPost(dataForm);
      if (response) {
        setContent('');
        getPosts();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { content, onChangeValue, onSubmitForm };
};

export default useForm;
