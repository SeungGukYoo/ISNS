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
  updateDoc,
  where,
} from 'firebase/firestore';
import { UploadResult, deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
import app, { db } from 'firebaseApp';
import { PostProps } from '../..';
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
  getDocData(): DocumentReference<DocumentData, DocumentData>;
  getPostsObserver(callBack: React.Dispatch<React.SetStateAction<PostProps[]>>): void;
  getPost(pstId: string): Promise<DocumentSnapshot<DocumentData, DocumentData>>;
  addPost(data: Omit<PostProps, 'id'>): Promise<DocumentReference<DocumentData, DocumentData>>;
  updatePost(postId: string, postData: Omit<PostProps, 'id'>): Promise<unknown>;
  deletePost(postId: string): Promise<void>;
  searchPost(hashtag: string, callback: React.Dispatch<React.SetStateAction<PostProps[]>>): void;
  getPersonalPost(uid: string): Promise<QuerySnapshot<DocumentData, DocumentData>>;
  likePost(postId: string, userUid: string, likesCount: number): Promise<void>;
  unLikePost(postId: string, userUid: string, likesCount: number): Promise<void>;
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
