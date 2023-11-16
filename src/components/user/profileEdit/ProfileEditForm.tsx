import useProfile from 'hooks/useProfile';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import styles from './ProfileEditForm.module.scss';
const ProfileEditForm = () => {
  const { profileUrl, updateProfile, uploadProfile, changeValue, deleteProfilePhoto } =
    useProfile();
  return (
    <div className={styles.profile}>
      <form className={styles.profile__container} onSubmit={updateProfile}>
        <div className={styles.profile__img}>
          {profileUrl?.length ? (
            <img src={profileUrl} alt="user Profile" />
          ) : (
            <FaUserCircle className={styles.default__image} />
          )}

          <div className={styles.btn__container}>
            <label htmlFor="profile-file-upload" className={styles.upload__btn}>
              Upload Profile
            </label>
            <input
              type="file"
              accept="image/*"
              id="profile-file-upload"
              name="profile-file-upload"
              className="hidden"
              onChange={uploadProfile}
            />
            <label htmlFor="profile-file-delete" className={styles.delete__btn}>
              Delete Profile
            </label>
            <input
              type="button"
              accept="image/*"
              id="profile-file-delete"
              name="profile-file-delete"
              className="hidden"
              onClick={deleteProfilePhoto}
            />
          </div>
        </div>

        <div className={styles.name__container}>
          <div>
            <label htmlFor="display-name" className={styles.name}>
              Name
              <input type="text" name="display-name" onChange={changeValue} required />
            </label>
          </div>

          <button type="submit" className={styles.submit__btn}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditForm;
