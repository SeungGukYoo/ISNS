import { NotificationType } from '../../..';

const NotificationBox = ({ notification }: { notification: NotificationType }) => {
  return (
    <div className="notification">
      <div className="notification__flex">
        <div className="notification__img-box">
          {notification.photoUrl ? <img src={notification.photoUrl} alt="" /> : 'null'}
        </div>
        <div className="notification__content-box">
          <p className="notification__content">{notification.content}</p>
          <p className="notification__email">{notification.createdAt}</p>
        </div>
      </div>
      <div>{!notification.read && <div className="notification__dot"></div>}</div>
    </div>
  );
};

export default NotificationBox;
