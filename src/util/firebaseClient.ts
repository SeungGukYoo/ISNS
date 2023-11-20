import {
  Auth,
  GithubAuthProvider,
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  QuerySnapshot,
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { UploadResult, deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
import app, { db } from 'firebaseApp';
import { Dispatch, SetStateAction } from 'react';
import { CommentProps, PostProps } from '../..';
import { storage } from './../firebaseApp';

interface FirebaseClientType {
  gitHubProvider: GithubAuthProvider;
  googleProvider: GoogleAuthProvider;
  // authenticate
  getAuthData(): Auth;
  authChanged(callback: React.Dispatch<React.SetStateAction<User | null>>): void;
  createEmailUser(email: string, password: string): Promise<User>;
  loginEmail(email: string, password: string): Promise<User>;
  companyLogin(company: string): Promise<User | undefined>;
  loginGoogle(): Promise<User>;
  loginGithub(): Promise<User>;
  logoutUser(): Promise<void>;
  updateProfileData(downloadUrl: string, displayName: string): Promise<void>;

  // store
  postObserver(userUid: string | null, path: string): void;
  getDocData(): DocumentReference<DocumentData, DocumentData>;
  followObserver(
    callBack: React.Dispatch<React.SetStateAction<boolean>>,
    userId: string,
    postId: string,
  ): void;
  getPostsObserver(callBack: React.Dispatch<React.SetStateAction<PostProps[]>>): void;
  getPostObserver(
    postId: string,
    callBack: React.Dispatch<React.SetStateAction<PostProps | null>>,
  ): void;
  getFollower(callBack: React.Dispatch<React.SetStateAction<number>>, userId: string): void;
  getFollowing(callBack: React.Dispatch<React.SetStateAction<number>>, userId: string): void;
  getPost(pstId: string): Promise<DocumentSnapshot<DocumentData, DocumentData>>;
  addPost(data: Omit<PostProps, 'id'>): Promise<DocumentReference<DocumentData, DocumentData>>;
  updatePost(postId: string, postData: Omit<PostProps, 'id'>): Promise<unknown>;
  deletePost(postId: string): Promise<void>;
  searchPost(hashtag: string, callback: React.Dispatch<React.SetStateAction<PostProps[]>>): void;
  getPersonalPost(uid: string): Promise<QuerySnapshot<DocumentData, DocumentData>>;
  getLikePosts(uid: string): Promise<QuerySnapshot<DocumentData, DocumentData>>;
  likePost(postId: string, userUid: string, likesCount: number): Promise<void>;
  unLikePost(postId: string, userUid: string, likesCount: number): Promise<void>;
  addComment(commentInfo: CommentProps, postId: string): Promise<void>;
  deleteComment(userUid: CommentProps, postId: string): Promise<unknown>;
  followingUser(myId: string, postId: string): Promise<void>;
  followerUser(myId: string, postId: string): Promise<void>;
  unfollowingUser(myId: string, postId: string): Promise<void>;
  unfollowerUser(myId: string, postId: string): Promise<void>;
  // storage
  uploadImage(uuid: string, result: string): Promise<UploadResult>;
  downloadImge(snapshot: UploadResult): Promise<string>;
  deleteImage(uuid: string, imgUrl: string): Promise<void>;
}

class FirebaseClient implements FirebaseClientType {
  gitHubProvider: GithubAuthProvider;
  googleProvider: GoogleAuthProvider;
  constructor() {
    this.googleProvider = new GoogleAuthProvider();
    this.gitHubProvider = new GithubAuthProvider();
  }
  getFollowing(callBack: React.Dispatch<React.SetStateAction<number>>, userId: string): void {
    const docRef = doc(db, 'following', userId);

    onSnapshot(docRef, snapShot => {
      const snapshotData = snapShot.data();
      callBack(snapshotData?.users.length);
    });
  }
  getFollower(callBack: React.Dispatch<React.SetStateAction<number>>, userId: string): void {
    const docRef = doc(db, 'follower', userId);
    onSnapshot(docRef, snapShot => {
      const snapshotData = snapShot.data();
      callBack(snapshotData?.users.length || 0);
    });
  }
  followObserver(
    callBack: Dispatch<SetStateAction<boolean>>,
    userId: string,
    postId: string,
  ): void {
    const ref = doc(db, 'following', userId);

    onSnapshot(ref, snapShot => {
      const snapshotData = snapShot.data();
      if (snapshotData) {
        const result = snapshotData.users.includes(postId);
        callBack(result || 0);
      }
    });
  }
  postObserver(userUid: string | null = null, path: string): (data: string) => void {
    let ref: DocumentReference<DocumentData, DocumentData> | null = null;
    if (userUid) {
      ref = doc(db, path, userUid);
    } else ref = doc(db, path);

    return (data: string) => {
      if (!ref) return;
      onSnapshot(ref, snapShot => {
        console.log(snapShot.data(), data);
      });
    };
  }
  unfollowingUser(myId: string, postId: string): Promise<void> {
    return updateDoc(doc(db, 'following', myId), {
      users: arrayRemove(postId),
    });
  }
  unfollowerUser(myId: string, postId: string): Promise<void> {
    return updateDoc(doc(db, 'follower', postId), {
      users: arrayRemove(myId),
    });
  }
  followerUser(myId: string, postId: string): Promise<void> {
    return setDoc(
      doc(db, 'follower', postId),
      {
        users: arrayUnion(myId),
      },
      {
        merge: true,
      },
    );
  }
  followingUser(myId: string, postId: string): Promise<void> {
    return setDoc(
      doc(db, 'following', myId),
      {
        users: arrayUnion(postId),
      },
      {
        merge: true,
      },
    );
  }

  deleteComment(userUid: CommentProps, postId: string): Promise<unknown> {
    const postRef = doc(db, 'posts', postId);
    return updateDoc(postRef, {
      comments: arrayRemove(userUid),
    });
  }

  addComment(commentInfo: CommentProps, postId: string): Promise<void> {
    const postRef = doc(db, 'posts', postId);

    return updateDoc(postRef, {
      comments: arrayUnion(commentInfo),
    });
  }
  getLikePosts(uid: string) {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, where('likes', 'array-contains', uid), orderBy('createdAt', 'desc'));
    return getDocs(q);
  }

  unLikePost(postId: string, userUid: string, likeCount: number): Promise<void> {
    const unLikePostRef = doc(db, 'posts', postId);
    return updateDoc(unLikePostRef, {
      likes: arrayRemove(userUid),
      likeCount,
    });
  }
  likePost(postId: string, userUid: string, likeCount: number) {
    const likePostRef = doc(db, 'posts', postId);
    return updateDoc(likePostRef, {
      likes: arrayUnion(userUid),
      likeCount,
    });
  }
  updateProfileData(downloadUrl: string, displayName: string): Promise<void> {
    const auth = getAuth(app);
    if (!auth.currentUser) throw new Error('로그인이 필요한 접근');
    return updateProfile(auth.currentUser, {
      photoURL: downloadUrl,
      displayName,
    });
  }
  getPersonalPost(uid: string): Promise<QuerySnapshot<DocumentData, DocumentData>> {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, where('uid', '==', uid), orderBy('createdAt', 'desc'));
    return getDocs(q);
  }

  deleteImage(imgUrl: string): Promise<void> {
    const postImgRef = ref(storage, imgUrl);
    return deleteObject(postImgRef);
  }

  downloadImge(snapshot: UploadResult | undefined): Promise<string> {
    if (!snapshot) throw new Error('유효하지 않는 이미지');
    return getDownloadURL(snapshot?.ref);
  }
  uploadImage(uuid: string, imgString: string) {
    const postImgRef = ref(storage, uuid);
    return uploadString(postImgRef, imgString, 'data_url');
  }
  searchPost(hashtag: string, callBack: React.Dispatch<React.SetStateAction<PostProps[]>>): void {
    const postsRef = collection(db, 'posts');

    const searchQuery = query(
      postsRef,
      where('hashtags', 'array-contains-any', [hashtag]),
      orderBy('createdAt', 'desc'),
    );

    onSnapshot(searchQuery, snapShot => {
      const matchPost = snapShot?.docs.map(post => ({ id: post.id, ...post.data() }) as PostProps);
      callBack(matchPost);
    });
    return;
  }

  getPostsObserver(callBack: React.Dispatch<React.SetStateAction<PostProps[]>>): void {
    const docRef = collection(db, 'posts');
    const queryData = query(docRef, orderBy('createdAt', 'desc'));
    onSnapshot(queryData, snapShot => {
      const postsArr: PostProps[] = [];
      snapShot.forEach(doc =>
        postsArr.push({
          id: doc.id,
          ...doc.data(),
        } as PostProps),
      );
      callBack(postsArr);
    });
  }
  getPostObserver(
    postId: string,
    callBack: React.Dispatch<React.SetStateAction<PostProps | null>>,
  ): void {
    const docRef = doc(db, 'posts', postId);
    onSnapshot(docRef, doc => {
      callBack({ id: doc.id, ...doc.data() } as PostProps);
    });
  }

  updatePost(postId: string, postData: Omit<PostProps, 'id'>): Promise<unknown> {
    const docRef = doc(db, 'posts', postId);

    return updateDoc(docRef, {
      ...postData,
    });
  }

  getPost(postId: string) {
    const docRef = doc(db, 'posts', postId);
    return getDoc(docRef);
  }
  deletePost(postId: string) {
    const docRef = doc(db, 'posts', postId);
    return deleteDoc(docRef);
  }

  addPost(data: Omit<PostProps, 'id'>) {
    return addDoc(collection(db, 'posts'), data);
  }
  getDocData() {
    return doc(db, 'posts');
  }
  async companyLogin(company: string): Promise<User | undefined> {
    let userInfo: User | undefined;
    if (company === 'google') userInfo = await this.loginGoogle();
    else if (company === 'github') userInfo = await this.loginGithub();

    if (userInfo) return userInfo;
    throw new Error('일치하지 않음');
  }
  loginGoogle() {
    const auth = this.getAuthData();
    return signInWithPopup(auth, this.googleProvider).then(result => {
      const user = result.user;
      return user;
    });
  }
  loginGithub(): Promise<User> {
    const auth = this.getAuthData();
    return signInWithPopup(auth, this.gitHubProvider).then(result => {
      const user = result.user;
      return user;
    });
  }
  logoutUser() {
    const auth = this.getAuthData();
    return signOut(auth);
  }
  authChanged(callback: React.Dispatch<React.SetStateAction<User | null>>) {
    const auth = this.getAuthData();
    onAuthStateChanged(auth, user => {
      if (user) callback(user);
      else callback(null);
    });
  }
  getAuthData() {
    return getAuth(app);
  }
  loginEmail(email: string, password: string) {
    const auth = this.getAuthData();

    return signInWithEmailAndPassword(auth, email, password).then(userCredential => {
      const user = userCredential.user;
      return user;
    });
  }

  createEmailUser(email: string, password: string) {
    const auth = this.getAuthData();

    return createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
      const user = userCredential.user;
      return user;
    });
  }
}

export default FirebaseClient;
