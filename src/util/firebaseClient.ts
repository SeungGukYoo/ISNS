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
} from 'firebase/auth';
import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import app, { db } from 'firebaseApp';
import { PostProps } from '../..';

interface FirebaseClientType {
  gitHubProvider: GithubAuthProvider;
  googleProvider: GoogleAuthProvider;
  getAuthData(): Auth;
  authChanged(callback: React.Dispatch<React.SetStateAction<User | null>>): void;
  createEmailUser(email: string, password: string): Promise<User>;
  loginEmail(email: string, password: string): Promise<User>;
  companyLogin(company: string): Promise<User | undefined>;
  loginGoogle(): Promise<User>;
  loginGithub(): Promise<User>;
  logoutUser(): Promise<void>;
  getDocData(): DocumentReference<DocumentData, DocumentData>;
  getPostsObserver(callBack: React.Dispatch<React.SetStateAction<PostProps[]>>): void;
  getPost(pstId: string): Promise<DocumentSnapshot<DocumentData, DocumentData>>;
  addPost(data: Omit<PostProps, 'id'>): Promise<DocumentReference<DocumentData, DocumentData>>;
  updatePost(postId: string, postData: Omit<PostProps, 'id'>): Promise<unknown>;
  deletePost(postId: string): Promise<void>;
}

class FirebaseClient implements FirebaseClientType {
  gitHubProvider: GithubAuthProvider;
  googleProvider: GoogleAuthProvider;
  constructor() {
    this.googleProvider = new GoogleAuthProvider();
    this.gitHubProvider = new GithubAuthProvider();
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
    return updateDoc(docRef, { ...postData });
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
