import useSignup from 'hooks/useSignup';
import React from 'react';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
  const { email, password, confirmPassword, error, setLanguage, onChangeValue, onSubmitForm } =
    useSignup();

  return (
    <form className="form form-lg" onSubmit={onSubmitForm}>
      <div className="form__title">{setLanguage('SIGN_UP')}</div>
      <div className="form__block">
        <label htmlFor="email">{setLanguage('EMAIL')}</label>
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
        <label htmlFor="password">{setLanguage('PASSWORD')}</label>
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
        <label htmlFor="confirm_password">{setLanguage('PASSWORD_COMFIRM')}</label>
        <input
          type="password"
          name="confirm_password"
          id="confirm_password"
          value={confirmPassword}
          onChange={onChangeValue}
          required
        />
      </div>
      <div className="form__block error-msg">{error}</div>
      <div className="form__block">
        {setLanguage('SIGNUP_TEXT')}
        <Link to="/signin">{setLanguage('SIGNUP_TEXT_BTN')}</Link>
      </div>
      <div className="form__block">
        <button type="submit" className="form__btn-submit" disabled={!!error}>
          {setLanguage('SIGN_UP')}
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
