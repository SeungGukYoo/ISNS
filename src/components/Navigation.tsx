import { AuthContext } from 'context/authContext';
import { useContext } from 'react';
import { BiUser } from 'react-icons/bi';
import { BsHouse } from 'react-icons/bs';
import { IoIosLogIn, IoIosLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Navigation() {
  const navigate = useNavigate();
  const { user, firebaseClient } = useContext(AuthContext);
  const onLogout = async () => {
    try {
      if (firebaseClient) {
        await toast.promise(firebaseClient.logoutUser(), {
          pending: '잠시만 기다려주세요.',
          success: '로그아웃이 되었습니다.',
          error: '예기치 못한 에러가 발생했습니다.',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <nav className="navigation">
      <div className="navigation__grid">
        <button type="button" onClick={() => navigate('/')}>
          <BsHouse className="navigation__icon" /> Home
        </button>
        <button type="button" onClick={() => navigate('/profile')}>
          <BiUser className="navigation__icon" /> Profile
        </button>
        {user ? (
          <button type="button" onClick={onLogout}>
            <IoIosLogOut className="navigation__icon" />
            Logout
          </button>
        ) : (
          <button type="button" onClick={() => navigate('/signin')}>
            <IoIosLogIn className="navigation__icon" />
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
