import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Signup from "./components/Signup/signup.jsx"
import Signin from './components/Signin/signin.jsx'
import { getUser, isAdmin } from "./services/authService.js"
import AdminRoute from './components/Protects/AdminRoute.jsx';
import NavBar from './components/NavBar/navbar.jsx'
import MenuForm from './components/Menuform/Menuform.jsx';
import { index, Create , deleteMenu, update } from "./services/menuService.js"


const App = () => {
  const [token, setToken] = useState(getUser());
  const [adminStatus, setAdminStatus] = useState(false);
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();

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

  const handleAddTrack = async (menuFormData) => {
    try {
      const newItem = await Create(menuFormData);
      setMenus([newItem, ...menus]);
      navigate("/menu");
    } catch (err) {
      console.error("Error Adding Item:", err);
    }
  };

  const handleDeleteMenu = async (menuId) => {
    try {
      await deleteMenu(menuId);
      setTracks(menus.filter((menu) => menu._id !== menuId));
      navigate("/menu");
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
      navigate("/tracks");
    } catch (err) {
      console.error("Error updating track:", err);
    }
  };

  return (
    <>
      <NavBar token={token} setToken={setToken}/>
      <Routes>
        <Route path="/users/signup" element={<Signup setToken={setToken}/>}/>
        <Route path="/users/signin" element={<Signin setToken={setToken}/>}/>

        {/* ADMIN ROUTING */}
        <Route path="/menuform" element={
          <AdminRoute isAdmin={adminStatus}>
        <MenuForm/>
        </AdminRoute>}/>
      </Routes>
    </>
  )
}

export default App
