import { DocumentData, DocumentReference } from 'firebase/firestore';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { PostProps } from '../..';
import { useAuthContext, usePostContext } from './useContextUtil';

const useForm = () => {
  const { user, firebaseClient } = useAuthContext();
  const { getPosts } = usePostContext();
  const [content, setContent] = useState('');

  const onChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    if (name === 'content') {
      setContent(value);
    }
  };
  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const dataForm: Omit<PostProps, 'id'> = {
        content,
        email: user.email || '',
        uid: user.uid,
        createdAt: new Date().toLocaleDateString('ko', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      };

      await toast.promise(
        firebaseClient?.addPost(dataForm) as Promise<DocumentReference<DocumentData, DocumentData>>,
        {
          pending: '잠시만 기다려주세요',
          success: {
            render() {
              getPosts();
              setContent('');
              return '게시글을 작성하였습니다.';
            },
          },
          error: '예기치못한 에러가 발생하였습니다.',
        },
      );
    } catch (error) {
      console.error(error);
    }
  };
  return { content, onChangeValue, onSubmitForm };
};

export default useForm;
