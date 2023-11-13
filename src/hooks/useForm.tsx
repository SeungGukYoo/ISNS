import { DocumentData, DocumentReference } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PostProps } from '../..';
import { useAuthContext } from './useContextUtil';

const useForm = () => {
  const { user, firebaseClient } = useAuthContext();
  const [content, setContent] = useState('');
  const [post, setPost] = useState<Omit<PostProps, 'id'> | null>(null);
  const [hashtag, setHashtag] = useState<string>('');
  const [hashtags, setHashtags] = useState<string[]>([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const onDeleteData = async (postId: string) => {
    if (confirm('게시글을 삭제하시겠습니까?')) {
      try {
        await toast.promise(firebaseClient?.deletePost(postId) as Promise<void>, {
          pending: '잠시만 기다려주세요.',
          success: {
            render() {
              if (id) navigate('/');
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

  const onHandleKeyup = (e: React.KeyboardEvent) => {
    if (e.code === 'Space' && hashtag.length > 0) {
      if (hashtags?.includes(hashtag)) {
        toast.error('이미 존재하는 해시태그 입니다.');
      } else {
        setHashtags(prev => (prev?.length ? [...prev, hashtag] : [hashtag]));
        setHashtag('');
      }
    }
  };

  const onDeleteHashtag = (hashtag: string) => {
    setHashtags(hashtags.filter(tag => tag !== hashtag));
  };
  const onChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === 'content') {
      setContent(value);
    }
    if (name === 'hashtag') {
      setHashtag(value);
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
          hashtags,
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
          hashtags,
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
                return '게시글을 작성하였습니다.';
              },
            },
            error: '예기치못한 에러가 발생하였습니다.',
          },
        );
      }
      setContent('');
      setHashtag('');
      setHashtags([]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!id) return;
    const isExistPost = async () => {
      const postData = await firebaseClient?.getPost(id);
      setContent(postData?.data()?.content);
      setHashtags(postData?.data()?.hashtags);
      setPost(postData?.data() as Omit<PostProps, 'id'>);
    };
    isExistPost();
  }, [firebaseClient, id]);

  return {
    id,
    post,
    user,
    content,
    hashtag,
    hashtags,
    onChangeValue,
    onSubmitForm,
    onDeleteData,
    onDeleteHashtag,
    onHandleKeyup,
  };
};

export default useForm;
