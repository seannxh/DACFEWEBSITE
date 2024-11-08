import { useState, useEffect, createContext } from 'react'
import { Route, Routes, useNavigate, Navigate, useParams } from 'react-router-dom';
import Signup from "./components/Signup/signup.jsx"
import Signin from './components/Signin/signin.jsx'
import { getUser, isAdmin } from "./services/authService.js"
import AdminRoute from './components/Protects/AdminRoute.jsx';
import ProtectedRoute from './components/Protects/ProtectedRoutes.jsx';
import NavBar from './components/NavBar/navbar.jsx'
import ContactUs from './components/ContactUs/Contactus.jsx';
import MenuForm from './components/Menuform/Menuform.jsx';
import Home from "./components/Home/Home.jsx"
import ViewMenu from './components/ViewMenu/Viewmenu.jsx';
import Footer from './components/Footer/Footer.jsx'
import { index, Create , deleteMenu, update } from "./services/menuService.js"
import "./index.css"
const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}`;


const App = () => {
  const [token, setToken] = useState(getUser());
  const [adminStatus, setAdminStatus] = useState(isAdmin());
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();

  const AuthedUserContext = createContext(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const menuData = await index();
        setMenus(menuData);
      } catch (err) {
        console.log('Error Fetching Menu:', err);
      }
    };

    if (token) setAdminStatus(isAdmin());
    fetchMenus();
  }, [token]);
  

  const handleAddMenu = async (menuFormData) => {
    try {
      const response = await fetch(`${BASE_URL}/menus`, {
        method: 'POST',
        body: menuFormData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      if (!response.ok) throw new Error("Error creating menu");
  
      const newItem = await response.json();
      setMenus([newItem, ...menus]);
      navigate("/viewmenu");
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
  };
  

  const handleDeleteMenu = async (menuId) => {
    try {
      await deleteMenu(menuId);
      setMenus(menus.filter((menu) => menu._id !== menuId));
      navigate("/viewmenu");
    } catch (err) {
      console.error("Error Adding Item:", err);
    }
  };

  const handleUpdateMenu = async (menuId, menuFormData) => {
    try {
        const updatedMenu = await update(menuId, menuFormData);

        if (!updatedMenu) {
            console.error("Update failed: No data returned");
            return;
        }

        const updatedMenus = menus.map((menu) =>
            menu._id === menuId ? updatedMenu : menu
        );

        setMenus(updatedMenus);
        navigate("/viewmenu");
    } catch (err) {
        console.error("Error updating track:", err);
    }
};

 

  return (
    <>
      <AuthedUserContext.Provider value={token}>
        <NavBar token={token} setToken={setToken} isAdmin={adminStatus} setAdminStatus={setAdminStatus}/>
        <Routes>
          {token ? (
            <>
              <Route path="/home" element={<Home token={token}/>}/>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/menuform" element={
                <AdminRoute isAdmin={adminStatus}  setAdminStatus={setAdminStatus}>
                  <MenuForm handleUpdateMenu={handleUpdateMenu} handleAddMenu={handleAddMenu}/>
                </AdminRoute>}/>
              <Route path="/viewmenu" element={<ViewMenu handleDeleteMenu={handleDeleteMenu} handleUpdateMenu={handleUpdateMenu} isAdmin={adminStatus} setAdminStatus={setAdminStatus}/>}/>
              <Route path="/contactus" element={<ContactUs/>}/>
            </>
          ) : (
            <>
              <Route path="/home" element={<Home/>}/>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/contactus" element={<ContactUs/>}/>
            </>
          )}
          <Route path="/users/signup" element={<Signup setToken={setToken}/>}/>
          <Route path="/users/signin" element={<Signin setToken={setToken}/>}/>
        </Routes>
        <Footer/>
      </AuthedUserContext.Provider>
    </>
  );
}

export default App
