import { User } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import FirebaseClient from 'util/firebaseClient';
import { Props } from '../..';

export const AuthContext = createContext({
  firebaseClient: null as FirebaseClient | null,
  user: null as User | null,
});

const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<null | User>(null);
  const firebaseClient = new FirebaseClient();

  useEffect(() => {
    const auth = firebaseClient.getAuthData();
    auth.currentUser && setUser(auth.currentUser);
  }, [firebaseClient]);
  return <AuthContext.Provider value={{ firebaseClient, user }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
