import useProfile from 'hooks/useProfile';
import { FaUserCircle } from 'react-icons/fa';
import styles from './ProfileBox.module.scss';
const ProfileBox = () => {
  const { user } = useProfile();

  return (
    <div className={styles.profile}>
      <div className={styles.profile__container}>
        <div className={styles.profile__img}>
          {user?.photoURL ? (
            <img src={user?.photoURL} alt="" />
          ) : (
            <FaUserCircle className={styles.default__image} />
          )}
        </div>
        <div>
          <div className={styles.profile__info}>
            <p className={styles.email}>Email: {user?.email}</p>
            <p className={styles.name}>Name: {user?.displayName}</p>
          </div>
          <div className={styles.profile__follower}>
            <p className={styles.follower}>Follower: 5</p>
            <p className={styles.following}>Following: 1</p>
          </div>
        </div>
      </div>
      {/* post */}
    </div>
  );
};

export default ProfileBox;
