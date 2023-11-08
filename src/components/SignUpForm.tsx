import useSignup from 'hooks/useSignup';
import React from 'react';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
  const { email, password, confirmPassword, error, onChangeValue, onSubmitForm } = useSignup();

  return (
    <form className="form form-lg" onSubmit={onSubmitForm}>
      <div className="form__title">회원가입</div>
      <div className="form__block">
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={onChangeValue}
          required
        />
      </div>
      <div className="form__block">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={onChangeValue}
          required
        />
      </div>
      <div className="form__block">
        <label htmlFor="confirm_password">비밀번호</label>
        <input
          type="password"
          name="confirm_password"
          id="confirm_password"
          value={confirmPassword}
          onChange={onChangeValue}
          required
        />
      </div>
      <div className="from__block">
        <div className="form__error">{error}</div>
      </div>
      <div className="form__block">
        계졍이 있으신가요?
        <Link to="/signin">로그인하기</Link>
      </div>
      <div className="form__block">
        <button type="submit" className="form__btn-submit">
          회원가입
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
