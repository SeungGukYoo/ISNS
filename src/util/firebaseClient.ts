import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import app from 'firebaseApp';

class FirebaseClient {
  constructor() {}

  getAuthData() {
    return getAuth(app);
  }
  createEmailUser(email: string, password: string) {
    const auth = getAuth(app);

    return createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
      const user = userCredential.user;
      return user;
    });
  }
}

export default FirebaseClient;
