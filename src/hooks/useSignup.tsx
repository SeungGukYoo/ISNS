import { AuthContext } from 'context/authContext';
import { FirebaseError } from 'firebase/app';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useSignup = () => {
  const navigate = useNavigate();
  const { firebaseClient } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
      if (value.length < 8) {
        setError('비밀번호는 8자리 이상으로 입력해주세요.');
      } else if (value.length >= 0 && confirmPassword !== value) {
        setError('비밀번호와 비밀번호 확인 값이 서로 다릅니다. 다시 확인해주세요.');
      } else {
        setError(null);
      }
    }
    if (name === 'confirm_password') {
      setConfirmPassword(value);
      if (value.length < 8) {
        setError('비밀번호는 8자리 이상으로 입력해주세요.');
      } else if (value !== password) {
        setError('비밀번호와 비밀번호 확인 값이 서로 다릅니다. 다시 확인해주세요.');
      } else {
        setError(null);
      }
    }
  };

  const onSubmitForm = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (firebaseClient) {
        const response = await toast.promise(firebaseClient?.createEmailUser(email, password), {
          pending: '잠시만 기다려주세요',
          success: '환영합니다.',
          error: '예기치 못한 에러가 발생했습니다.',
        });

        if (response) {
          navigate('/signin');
        }
      }
    } catch (error) {
      if ((error as FirebaseError).code === 'auth/email-already-in-use') {
        setError('해당 계정이 이미 존재합니다.');
      }
    }
  };
  return { email, password, confirmPassword, error, onChangeValue, onSubmitForm };
};

export default useSignup;
