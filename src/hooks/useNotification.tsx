import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationType } from '../..';
import { useAuthContext } from './useContextUtil';

const useNotification = () => {
  const { user, firebaseClient } = useAuthContext();
  const [notifications, setNotifications] = useState<NotificationType[] | null>(null);
  const naviagte = useNavigate();
  const readNotification = async (notificationInfo: NotificationType) => {
    try {
      await firebaseClient?.updateNotification(notificationInfo.id);
      if (notificationInfo.url) {
        naviagte(`/posts/${notificationInfo.url}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      firebaseClient?.getNotification(user?.uid, setNotifications);
    }
  }, [user?.uid, firebaseClient]);

  return { notifications, readNotification };
};

export default useNotification;
