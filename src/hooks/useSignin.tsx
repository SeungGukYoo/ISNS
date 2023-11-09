import { AuthContext } from 'context/authContext';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';

const useSignin = () => {
  const { firebaseClient } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<null | string>(null);
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
      const validationEmailRegex = /^[a-zA-Z0-9]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!email.match(validationEmailRegex)) {
        setError('이메일 형식이 올바르지 않습니다.');
      } else {
        setError(null);
      }
    }
    if (name === 'password') {
      setPassword(value);
      if (password.length < 7) setError('비밀번호는 8자리 이상으로 입력해주세요.');
      else setError(null);
    }
  };

  const onSubmitForm = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (firebaseClient) {
        const response = await toast.promise(firebaseClient?.loginEmail(email, password), {
          pending: '로그인중입니다.',
          success: '환영합니다.',
          error: '예기치 못한 에러가 발생했습니다.',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { email, password, error, onChangeValue, onSubmitForm };
};

export default useSignin;
