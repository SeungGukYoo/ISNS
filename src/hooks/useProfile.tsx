import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { PostProps } from '../..';
import { useAuthContext } from './useContextUtil';
const useProfile = () => {
  const { user, firebaseClient } = useAuthContext();
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [profileUrl, setProfileUrl] = useState(user?.photoURL);
  const [isSave, setIsSave] = useState(false);
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
        setIsSave(true);
      };
    }
  };

  const updateProfile = async () => {
    if (!profileUrl) return;
    try {
      const snapShot = await firebaseClient?.uploadImage(key, profileUrl);
      const downLoadUrl = await firebaseClient?.downloadImge(snapShot);
      if (user?.photoURL && user?.photoURL?.length > 0) {
        await firebaseClient?.deleteImage(user?.photoURL);
      }
      if (downLoadUrl && firebaseClient) {
        await toast.promise(firebaseClient?.updateProfileData(downLoadUrl), {
          pending: '잠시만 기다려주세요.',
          success: {
            render() {
              setIsSave(false);
              setProfileUrl(user?.photoURL);
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

  return { user, posts, isSave, profileUrl, updateProfile, uploadProfile };
};

export default useProfile;
