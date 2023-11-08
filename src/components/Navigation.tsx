import { BiUser } from 'react-icons/bi';
import { BsHouse } from 'react-icons/bs';
import { IoIosLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate();
  return (
    <nav className="navigation">
      <div className="navigation__grid">
        <button type="button" onClick={() => navigate('/')}>
          <BsHouse className="navigation__icon" /> Home
        </button>
        <button type="button" onClick={() => navigate('/profile')}>
          <BiUser className="navigation__icon" /> Profile
        </button>
        <button type="button" onClick={() => navigate('/')}>
          <IoIosLogOut className="navigation__icon" />
          Logout
        </button>
      </div>
    </nav>
  );
}
