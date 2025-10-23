// src/components/Navbar.jsx
import { NavLink, Link } from 'react-router';
import { useState } from 'react';
import { BsFillPiggyBankFill } from 'react-icons/bs';
import { IoMoonSharp, IoSunny } from 'react-icons/io5';
import { useTheme } from '../contexts';

const NavItem = ({ to, children, options}) => {
  return (
    <li className="mb-1">
      <NavLink className={`text-gray-400 dark:text-white rounded  aria-[current=page]:text-blue-800 ${options}`}
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

const ThemeToggle = () => {
  const { darkmode, toggleDarkmode } = useTheme(); 
  return (  <button
    type='button'
    onClick={toggleDarkmode}
    className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
  >
    {darkmode ? <IoMoonSharp color='white' size={20}/> : <IoSunny size={20}/>}
  </button>);
};

export default function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <>
      <nav className="relative px-4 py-4 flex justify-between items-center bg-white dark:bg-gray-900 dark:text-gray-100
      border-b border-gray-200 dark:border-gray-700">

        <div className="flex items-center">
          <Logo />
        </div>

        <div className="lg:hidden">
          <button className="flex items-center text-blue-600 p-3" onClick={toggleNavbar}>
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
        <div className="hidden lg:flex lg:items-center lg:space-x-4">
          <ThemeToggle />
        </div>
      </nav>
      <div className={`relative z-50 ${isNavbarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6
        max-w-sm py-6 px-6 bg-white border-r overflow-y-auto space-between dark:bg-black">
          <div className="flex items-center mb-8">
            <Logo/>
            <ThemeToggle />
            <button onClick={toggleNavbar} >
              <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500 dark:text-white"
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
