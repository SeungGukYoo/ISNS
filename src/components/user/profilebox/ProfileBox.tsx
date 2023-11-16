import PostBox from 'components/post/PostBox';
import useProfile from 'hooks/useProfile';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './ProfileBox.module.scss';
const ProfileBox = () => {
  const { user, posts, profileUrl } = useProfile();

  return (
    <div className={styles.profile}>
      <div className={styles.profile__container}>
        <div className={styles.profile__img}>
          {profileUrl ? (
            <img src={profileUrl} alt="user Profile" />
          ) : (
            <FaUserCircle className={styles.default__image} />
          )}
          <Link className={styles.upload__page_btn} to="/profile/edit">
            Profile Edit
          </Link>
        </div>

        <div>
          <div className={styles.profile__info}>
            <p className={styles.email}>Email: {user?.email}</p>
            <p className={styles.name}>
              {user?.displayName ? `Name: ${user?.displayName}` : '이름을 작성해주세요'}
            </p>
            <p>Post Count: {posts.length}</p>
          </div>
          <div className={styles.profile__follower}>
            <p className={styles.follower}>Follower: 5</p>
            <p className={styles.following}>Following: 1</p>
          </div>
        </div>
      </div>

      <div className={styles.profile__posts}>
        {posts.map(post => (
          <PostBox post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default ProfileBox;
