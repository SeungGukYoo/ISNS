import { BiUser } from 'react-icons/bi';
import { BsHouse } from 'react-icons/bs';
import { IoIosLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate();
  return (
    <footer>
      <div className="footer__grid">
        <button type="button" onClick={() => navigate('/')}>
          <BsHouse /> Home
        </button>
        <button type="button" onClick={() => navigate('/profile')}>
          <BiUser /> Profile
        </button>
        <button type="button" onClick={() => navigate('/')}>
          <IoIosLogOut />
          Logout
        </button>
      </div>
    </footer>
  );
}
