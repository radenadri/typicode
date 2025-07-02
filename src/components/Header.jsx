import { Link } from 'react-router';

import logo from '../assets/logo.svg';

export default function Header() {
  return (
    <header>
      <img src={logo} height={25} width={25} alt="Logo" />
      <ul>
        <li>
          <Link to="/">All Posts</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </header>
  );
}
