import { User, onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import FirebaseClient from 'util/firebaseClient';
import { Props } from '../..';

export const AuthContext = createContext({
  firebaseClient: null as FirebaseClient | null,
  user: null as User | null,
  init: false,
});

const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<null | User>(null);
  const [init, setInit] = useState(false);
  const firebaseClient = new FirebaseClient();

  useEffect(() => {
    firebaseClient.authChanged(setUser);
  }, [firebaseClient, user]);

  return (
    <AuthContext.Provider value={{ firebaseClient, user, init }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
