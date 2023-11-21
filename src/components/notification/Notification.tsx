import useNotification from 'hooks/useNotification';
import React from 'react';
import NotificationBox from './NotificationBox';

const Notification = () => {
  const { notifications, readNotification } = useNotification();
  return (
    <div>
      {notifications ? (
        notifications.map(notification => (
          <div key={notification.id} onClick={() => readNotification(notification)}>
            <NotificationBox notification={notification} />
          </div>
        ))
      ) : (
        <div className="post__no-post">알림이 없습니다.</div>
      )}
    </div>
  );
};

export default Notification;
