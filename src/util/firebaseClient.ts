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
import app from 'firebaseApp';

interface FirebaseClientType {
  getAuthData(): Auth;
  createEmailUser(email: string, password: string): Promise<User>;
  loginEmail(email: string, password: string): Promise<User>;
  companyLogin(company: string): Promise<User | undefined>;
  loginGoogle(): Promise<User>;
  loginGithub(): Promise<User>;
  authChanged(callback: (user: User | null) => void): void;
  logoutUser(): Promise<void>;
}

class FirebaseClient implements FirebaseClientType {
  async companyLogin(company: string): Promise<User | undefined> {
    let userInfo: User | undefined;
    if (company === 'google') userInfo = await this.loginGoogle();
    else if (company === 'github') userInfo = await this.loginGithub();

    if (userInfo) return userInfo;
    throw new Error('일치하지 않음');
  }
  loginGoogle() {
    const auth = this.getAuthData();
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider).then(result => {
      const user = result.user;
      return user;
    });
  }
  loginGithub(): Promise<User> {
    const auth = this.getAuthData();
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider).then(result => {
      const user = result.user;
      return user;
    });
  }
  logoutUser() {
    const auth = this.getAuthData();
    return signOut(auth);
  }
  authChanged(callback: (user: User | null) => void) {
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
