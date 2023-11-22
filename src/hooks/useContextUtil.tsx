import { AuthContext } from 'context/authContext';

import { useContext } from 'react';

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === null) throw Error('인증 콘텍스트가 유효하지 않습니다.');
  return context;
};
