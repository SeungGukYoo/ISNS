import PostBox from 'components/post/PostBox';
import useProfile from 'hooks/useProfile';
import { FaUserCircle } from 'react-icons/fa';
import styles from './ProfileBox.module.scss';
const ProfileBox = () => {
  const { user, posts, isSave, profileUrl, updateProfile, uploadProfile } = useProfile();

  return (
    <div className={styles.profile}>
      <div className={styles.profile__container}>
        <div className={styles.profile__img}>
          {profileUrl ? (
            <img src={profileUrl} alt="user Profile" />
          ) : (
            <FaUserCircle className={styles.default__image} />
          )}
          <label htmlFor="profile-file" className={styles.upload__btn}>
            Upload Profile
          </label>
          <input
            type="file"
            accept="image/*"
            id="profile-file"
            name="profile-file"
            className="hidden"
            onChange={uploadProfile}
          />
          {isSave && (
            <button onClick={updateProfile} className={styles.updateBtn}>
              save
            </button>
          )}
        </div>

        <div>
          <div className={styles.profile__info}>
            <p className={styles.email}>Email: {user?.email}</p>
            <p className={styles.name}>Name: {user?.displayName}</p>
            <p>Post Count: {posts.length}</p>
          </div>
          <div className={styles.profile__follower}>
            <p className={styles.follower}>Follower: 5</p>
            <p className={styles.following}>Following: 1</p>
          </div>
        </div>
      </div>
      {/* post */}
      <div className={styles.profile__posts}>
        {posts.map(post => (
          <PostBox post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default ProfileBox;
