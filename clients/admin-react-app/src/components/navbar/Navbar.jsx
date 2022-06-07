import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav id='navbar'>
      <NavLink to='/'>
        <h1 className='logo'>
          <span className='text-primary'>
            <i className='fa-solid fa-graduation-cap'></i> Westcoast
          </span>
          Education
        </h1>
      </NavLink>

      <ul>
        <li>
          <NavLink to='/courses'>Kurser</NavLink>
          <NavLink to='/subjects'>Kategorier</NavLink>
          <NavLink to='/students'>Studenter</NavLink>
          <NavLink to='/teachers'>Lärare</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;