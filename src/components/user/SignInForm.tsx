import useLanguage from 'hooks/useLanguage';
import useSignin from 'hooks/useSignin';
import { Link } from 'react-router-dom';

const SignInForm = () => {
  const { email, password, error, setLanguage, onChangeValue, onSubmitForm, webLogin } =
    useSignin();
  return (
    <form onSubmit={onSubmitForm} className="form form-lg">
      <div className="form__title">{setLanguage('SIGN_IN')}</div>
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
      <div className="form__block error-msg">{error}</div>
      <div className="form__block">
        {setLanguage('SIGNIN_TEXT')}
        <Link to="/signup">{setLanguage('SIGNIN_TEXT_BTN')}</Link>
      </div>

      <div className="form__block">
        <button type="submit" className="form__btn-submit">
          {setLanguage('SIGN_IN')}
        </button>
      </div>
      <div className="form__block" onClick={webLogin}>
        <div className="form__company-btn">
          <button type="button" className="form__btn-submit google-btn" name="google">
            Google
          </button>
          <button type="button" className="form__btn-submit github-btn" name="github">
            Github
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
