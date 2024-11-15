import { Link, useNavigate } from "react-router-dom";
import { signout } from "../../services/authService";
import logo from "../../assets/brandlogo.jpg";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const NavBar = (props) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signout();
    props.setToken(null);
    props.setAdminStatus(false);
    navigate("/home");
  };

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
              <Link to="/home" className="hover:text-red-700 font-bold">Home</Link>
              <Link to="/viewmenu" className="hover:text-red-700 font-bold">View Menu</Link>
              <Link to="/contactus" className="hover:text-red-700 font-bold">Contact Us</Link>
              {props.isAdmin && (
                <Link to="/menuform" className="hover:text-red-700 font-bold">Admin Form</Link>
              )}
              {props.token && (
                <button onClick={handleSignOut} className="hover:text-red-700 cursor-pointer font-bold">
                  Sign Out
                </button>
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
              <Link to="/home" className="block hover:text-red-700 font-bold">Home</Link>
              <hr />
              <Link to="/viewmenu" className="block hover:text-red-700 font-bold">View Menu</Link>
              <hr />
              <Link to="/contactus" className="block hover:text-red-700 font-bold">Contact Us</Link>
              <hr />
              {props.isAdmin && (
                <Link to="/menuform" className="block hover:text-red-700 font-bold">Admin Menu Form</Link>
              )}
              <hr />
              {props.token && (
                <Link onClick={handleSignOut} className="block hover:text-red-700 cursor-pointer font-bold">
                  Sign Out
                </Link>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
