import { getAuth } from 'firebase/auth';
import app from 'firebaseApp';

class FirebaseClient {
  constructor() {}

  getAuthData() {
    return getAuth(app);
  }
}

export default FirebaseClient;
