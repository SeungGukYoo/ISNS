import { DocumentData, DocumentReference } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PostProps } from '../..';
import { useAuthContext, usePostContext } from './useContextUtil';

const useForm = () => {
  const { user, firebaseClient } = useAuthContext();
  const { getPosts } = usePostContext();
  const [content, setContent] = useState('');
  const [post, setPost] = useState<Omit<PostProps, 'id'> | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const onDeleteData = async (postId: string) => {
    if (confirm('게시글을 삭제하시겠습니까?')) {
      try {
        await toast.promise(firebaseClient?.deletePost(postId) as Promise<void>, {
          pending: '잠시만 기다려주세요.',
          success: {
            render() {
              getPosts();
              return '게시글을 삭제하였습니다.';
            },
          },
          error: '예기치 못한 에러가 발생하였습니다.',
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

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
      let dataForm: Omit<PostProps, 'id'>;
      if (id && post) {
        dataForm = {
          ...post,
          content,
          createdAt: new Date().toLocaleDateString('ko', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        };

        await toast.promise(
          firebaseClient?.updatePost(id, dataForm) as Promise<
            DocumentReference<DocumentData, DocumentData>
          >,
          {
            pending: '잠시만 기다려주세요',
            success: {
              render() {
                getPosts();
                navigate('/');
                return '게시글을 수정하였습니다.';
              },
            },
            error: '예기치못한 에러가 발생하였습니다.',
          },
        );
      } else {
        dataForm = {
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
          firebaseClient?.addPost(dataForm) as Promise<
            DocumentReference<DocumentData, DocumentData>
          >,
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!id) return;
    const isExistPost = async () => {
      const postData = await firebaseClient?.getPost(id);
      setContent(postData?.data()?.content);
      setPost(postData?.data() as Omit<PostProps, 'id'>);
    };
    isExistPost();
  }, [firebaseClient, id]);

  return { user, content, onChangeValue, onSubmitForm, onDeleteData };
};

export default useForm;
