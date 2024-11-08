import { Link, Navigate } from 'react-router-dom';
import { signout } from "../../services/authService";
import logo from '../../assets/brandlogo.jpg';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const NavBar = (props) => {
  return (
    <Disclosure as="nav" className="bg-black text-white shadow-lg font-nova w-full">
      {({ open }) => (
        <>
          <div className="flex items-center justify-between w-full pt-10 pb-10 px-0">

            <div className="absolute left-0 flex items-center pl-4">
              <Link to="/home">
                <img src={logo} alt="Don's Asian Cuisine Logo" className="h-15 w-auto" />
              </Link>
            </div>

            <div className="hidden custom-md:flex items-center space-x-10 text-2xl ml-auto pr-4">
              {props.token ? (
                <>
                  <Link to="/home" className="hover:text-red-500 font-bold">HOME</Link>
                  <Link to="/viewmenu" className="hover:text-red-500 font-bold">MENU</Link>
                  <Link to="/contactus" className="hover:text-red-500 font-bold">CONTACT</Link>
                  {props.isAdmin && (
                    <Link to="/menuform" className="hover:text-red-500 font-bold">ADMIN FORM</Link>
                  )}
                  <Link
                    onClick={() => {
                      signout();
                      props.setToken(null);
                      Navigate('/home');
                    }}
                    className="hover:text-red-500 cursor-pointer font-bold"
                  >
                    SIGN OUT
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/home" className="hover:text-red-500 font-bold">Home</Link>
                  <Link to="/users/signup" className="hover:text-red-500 font-bold">Sign Up</Link>
                  <Link to="/users/signin" className="hover:text-red-500 font-bold">Sign In</Link>
                  <Link to="/contactus" className="hover:text-red-500 font-bold">Contact</Link>
                </>
              )}
            </div>

            <div className="custom-md:hidden flex items-center ml-auto pr-4">
              <Disclosure.Button className="text-gray-400 hover:text-white focus:outline-none">
                {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </Disclosure.Button>
            </div>
          </div>

          <Disclosure.Panel className="custom-md:hidden">
            <div className="px-4 pb-3 space-y-2 text-white text-center">
              {props.token ? (
                <>
                  <Link to="/home" className="block hover:text-red-500 font-bold">Home</Link><hr/>
                  <Link to="/viewmenu" className="block hover:text-red-500 font-bold">Menu</Link><hr/>
                  <Link to="/contactus" className="block hover:text-red-500 font-bold">Contact</Link><hr/>
                  {props.isAdmin && (
                    <Link to="/menuform" className="block hover:text-red-500 font-bold">Admin Menu Form</Link>
                  )}<hr/>
                  <Link
                    onClick={() => {
                      signout();
                      props.setToken(null);
                      Navigate('/home');
                    }}
                    className="block hover:text-red-500 cursor-pointer font-bold"
                  >
                    Sign Out
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/home" className="block hover:text-red-500">Home</Link>
                  <Link to="/users/signup" className="block hover:text-red-500">Sign Up</Link>
                  <Link to="/users/signin" className="block hover:text-red-500">Sign In</Link>
                  <Link to="/contactus" className="block hover:text-red-500">Contact</Link>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
