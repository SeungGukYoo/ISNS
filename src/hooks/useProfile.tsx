import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { PostProps } from '../..';
import { useAuthContext } from './useContextUtil';
const useProfile = () => {
  const navigate = useNavigate();
  const { user, firebaseClient } = useAuthContext();
  const [displayName, setDisplayName] = useState(user?.displayName);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [profileUrl, setProfileUrl] = useState(user?.photoURL);
  const [tabType, setTabType] = useState<'post' | 'like'>('post');

  const key = `${user?.uid}/${uuidv4()}`;
  const uploadProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files?.length === 0) return;
    if (files) {
      const file = files?.[0];

      const fileReader = new FileReader();

      fileReader?.readAsDataURL(file);
      fileReader.onloadend = (fileEvent: ProgressEvent<FileReader>) => {
        const { result } = fileEvent.currentTarget as FileReader;
        setProfileUrl(result as string);
      };
    }
  };
  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'display-name') {
      setDisplayName(value.trim());
    }
  };
  const deleteProfilePhoto = () => {
    if (user?.photoURL) {
      setProfileUrl('');
    }
  };
  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName || displayName?.length < 1) {
      toast.error('공백을 제외한 한글자 이상 입력하세요!');
      return;
    }
    try {
      let downLoadUrl;

      if (!profileUrl) downLoadUrl = '';
      else if (profileUrl !== user?.photoURL) {
        const snapShot = await firebaseClient?.uploadImage(key, profileUrl);
        downLoadUrl = await firebaseClient?.downloadImge(snapShot);
      } else downLoadUrl = profileUrl;

      if (user?.photoURL) {
        await firebaseClient?.deleteImage(user?.photoURL);
      }

      if (firebaseClient && displayName) {
        await toast.promise(firebaseClient?.updateProfileData(downLoadUrl as string, displayName), {
          pending: '잠시만 기다려주세요.',
          success: {
            render() {
              setProfileUrl(user?.photoURL);
              navigate(-1);
              return '안전하게 저장되었습니다.';
            },
          },
          error: '예기치 못한 에러가 발생하였습니다.',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const changeTabType = async (type: typeof tabType) => {
    if (!user) return;
    try {
      let snapShot;
      if (type === 'like') {
        snapShot = await firebaseClient?.getPersonalPost(user?.uid);
        setTabType('post');
      } else {
        snapShot = await firebaseClient?.getLikePosts(user?.uid);
        setTabType('like');
      }
      const postsData: PostProps[] = [];
      snapShot?.forEach(element => {
        postsData.push({ ...element.data(), id: element.id } as PostProps);
      });
      setPosts(postsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        if (user?.uid) {
          const snapshot = await firebaseClient?.getPersonalPost(user?.uid);
          const postsData: PostProps[] = [];
          snapshot?.forEach(element => {
            postsData.push({ ...element.data(), id: element.id } as PostProps);
          });
          setPosts(postsData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getPost();
  }, [firebaseClient, user?.uid]);

  return {
    user,
    posts,
    profileUrl,
    tabType,
    changeTabType,
    updateProfile,
    uploadProfile,
    changeValue,
    deleteProfilePhoto,
  };
};

export default useProfile;
