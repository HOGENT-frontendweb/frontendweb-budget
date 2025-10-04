// src/components/Navbar.jsx
import { NavLink, Link } from 'react-router';
import { useState } from 'react';
import { BsFillPiggyBankFill } from 'react-icons/bs';

const NavItem = ({ to, children, options}) => {
  return (
    <li className="mb-1">
      <NavLink className={`text-gray-400 rounded  aria-[current=page]:text-blue-800 ${options}`}
        to={to}>{children}</NavLink>
    </li>
  );
};

const Logo = () => {
  return (
    <Link to="/transactions" className="mr-auto flex items-center space-x-2 text-blue-600 hover:text-blue-800">
      <BsFillPiggyBankFill size={28} className="text-blue-600" />
      <span className="font-semibold text-lg">Budget</span>
    </Link>
  );
};

export default function Navbar() {

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <>
      <nav className="relative px-4 py-4 flex justify-between items-center bg-gray-200">

        <div className="flex items-center">
          <Logo />
        </div>

        <div className="lg:hidden">
          <button className="navbar-burger flex items-center text-blue-600 p-3" onClick={toggleNavbar}>
            <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden absolute top-1/2 left-1/2
        transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
          <NavItem to="/transactions">Transactions</NavItem>
          <NavItem to="/places">Places</NavItem>
          <NavItem to="/about">About</NavItem>
        </ul>
      </nav>
      <div className={`navbar-menu relative z-50 ${isNavbarOpen ? 'block' : 'hidden'}`}>
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6
        max-w-sm py-6 px-6 bg-white border-r overflow-y-auto space-between">
          <div className="flex items-center mb-8">
            <Logo/>
            <button onClick={toggleNavbar} className="navbar-close" >
              <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div>
            <ul>
              <NavItem to="/transactions" options="block p-4 text-sm font-semibold">Transactions</NavItem>
              <NavItem to="/places" options="block p-4 text-sm font-semibold">Places</NavItem>
              <NavItem to="/about" options="block p-4 text-sm font-semibold">About</NavItem>             
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
