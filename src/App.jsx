import { useState, useEffect, createContext } from 'react'
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
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
import { index, Create , deleteMenu, update } from "./services/menuService.js"


const App = () => {
  const [token, setToken] = useState(getUser());
  const [adminStatus, setAdminStatus] = useState(false);
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();

  const AuthedUserContext = createContext(null);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      const admin = await isAdmin();
      setAdminStatus(admin);
    };

    if (token) fetchAdminStatus();

    const fetchMenus = async () => {
      try {
        const menuData = await index();
        setMenus(menuData);
      } catch (err) {
        console.log('Error Fetching Menu:', err);
      }
    };
    fetchMenus();
  }, [token]);

  const handleAddMenu = async (menuFormData) => {
    try {
      const newItem = await Create(menuFormData);
      setMenus([newItem, ...menus]);
      navigate("/viewmenu");
    } catch (err) {
      console.error("Error Adding Item:", err);
    }
  };

  const handleDeleteMenu = async (menuId) => {
    try {
      await deleteMenu(menuId);
      setTracks(menus.filter((menu) => menu._id !== menuId));
      navigate("/viewmenu");
    } catch (err) {
      console.error("Error Adding Item:", err);
    }
  };

  const handleUpdateMenu = async (menuId, menuFormData) => {
    try {
      const updatedMenu = await update(menuId, menuFormData);
      const updatedMenus = menus.map((menu) =>
        menu._id === menuId ? updatedMenu : menu
      );
      setMenus(updatedMenus)
      navigate("/viewmenu");
    } catch (err) {
      console.error("Error updating track:", err);
    }
  };

  return (
    <>
      <AuthedUserContext.Provider value={token}>
        <NavBar token={token} setToken={setToken} isAdmin={adminStatus}/>
        <Routes>
          {token ? (
            <>
              <Route path="/home" element={<Home token={token}/>}/>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/menuform" element={
                <AdminRoute isAdmin={adminStatus}>
<<<<<<< HEAD
                  <MenuForm handleUpdateMenu={handleUpdateMenu} handleAddMenu={handleAddMenu}/>
=======
                <MenuForm/>
>>>>>>> 200ee43628b1c62a351246143d9441aef94a1bdf
                </AdminRoute>}/>
              <Route path="/viewmenu" element={<ViewMenu/>}/>
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
      </AuthedUserContext.Provider>
    </>
  );
}

export default App
