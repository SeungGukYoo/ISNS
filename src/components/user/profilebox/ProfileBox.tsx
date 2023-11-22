import PostBox from 'components/post/PostBox';
import useProfile from 'hooks/useProfile';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './ProfileBox.module.scss';
const ProfileBox = () => {
  const {
    user,
    posts,
    follower,
    following,
    tabType,
    profileUrl,
    language,
    changeTabType,
    changeLanguage,
  } = useProfile();

  return (
    <div className={styles.profile}>
      <div className={styles.profile__container}>
        <div className={styles.profile__img}>
          {profileUrl ? (
            <img src={profileUrl} alt="user Profile" />
          ) : (
            <FaUserCircle className={styles.default__image} />
          )}
          <div className={styles.profile__btn_box}>
            <Link className={styles.upload__page_btn} to="/profile/edit">
              Profile Edit
            </Link>
            <button className={styles.profile__language} onClick={changeLanguage}>
              {language === 'ko' ? 'English' : '한국어'}
            </button>
          </div>
        </div>

        <div>
          <div className={styles.profile__info}>
            <p className={styles.email}>Email: {user?.email}</p>
            <p className={styles.name}>
              {user?.displayName ? `Name: ${user?.displayName}` : '이름을 작성해주세요'}
            </p>
          </div>
          <div className={styles.profile__follower}>
            <p className={styles.following}>Following: {following}</p>
            <p className={styles.follower}>Follower: {follower}</p>
          </div>
        </div>
      </div>
      <div className={styles.profile__tabs}>
        <div
          className={`${styles.profile__tab} ${tabType === 'post' && styles.profile__tab_active}`}
          onClick={() => changeTabType('like')}
        >
          POST
        </div>
        <div
          className={`${styles.profile__tab} ${tabType === 'like' && styles.profile__tab_active}`}
          onClick={() => changeTabType('post')}
        >
          LIKE
        </div>
      </div>
      <div className={styles.profile__posts}>
        {posts.length > 0 ? (
          posts.map(post => <PostBox post={post} key={post.id} />)
        ) : (
          <div className="post__no-post">
            <div className="post__text">게시글이 없습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileBox;
