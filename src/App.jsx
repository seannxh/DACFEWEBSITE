import { useState, useEffect, createContext } from 'react'
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Signup from "./components/Signup/signup.jsx"
import Signin from './components/Signin/signin.jsx'
import { getUser } from "./services/authService.js"
import NavBar from './components/NavBar/navbar.jsx'
import ContactUs from './components/ContactUs/Contactus.jsx';
import MenuForm from './components/Menuform/Menuform.jsx';
import Home from "./components/Home/Home.jsx"
import ViewMenu from './components/ViewMenu/Viewmenu.jsx';
import { index, Create , deleteMenu, update } from "./services/menuService.js"


const App = () => {
const [token, setToken] = useState(getUser());
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();

  const AuthedUserContext = createContext(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const menuData = await index();
        console.log("MenuData: ", menuData);
        setTracks(menuData);
      } catch (err) {
        console.log("Error Fetching Menu:", err);
      }
    };
    fetchTracks();
  }, []);

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
      <AuthedUserContext.Provider value={token}>
        <NavBar token={token} setToken={setToken}/>
        <Routes>
          {token ? (
            <>
              <Route path="/home" element={<Home token={token}/>}/>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/menuform" element={<MenuForm/>}/>
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
