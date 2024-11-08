import React, { useEffect, useState } from 'react';
const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}`;

const ViewMenu = ({ handleDeleteMenu, isAdmin }) => {
    const [menus, setMenus] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedDishType, setSelectedDishType] = useState("");
    const [filterMenu, setFilteredMenu] = useState([]);
    const [editingMenuId, setEditingMenuId] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await fetch(`${BASE_URL}/menus`);
                if (!response.ok) throw new Error("Error fetching menus");

                const menuData = await response.json();
                setMenus(menuData);
                setFilteredMenu(menuData);
            } catch (error) {
                console.error("Error fetching menus:", error);
            }
        };

        fetchMenus();

        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const handleEditClick = (menu) => {
        setEditingMenuId(menu._id);
        setEditFormData({ ...menu });
        setImagePreview(`${BASE_URL}${menu.foodImg}`);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const getFile = e.target.files[0];
    
        if (getFile) {
            setEditFormData((prevData) => ({
                ...prevData,
                foodImg: getFile,
            }));
    
            const imageUrl = URL.createObjectURL(getFile);
            setImagePreview(imageUrl);
        }
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setSelectedDishType(value);

        if (value === "") {
            setFilteredMenu(menus);
        } else {
            const filteredItems = menus.filter(menu => menu.dishType === value);
            setFilteredMenu(filteredItems);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
    
        const data = new FormData();
        data.append("name", editFormData.name);
        data.append("description", editFormData.description);
        data.append("price", editFormData.price);
        data.append("dishType", editFormData.dishType);
    
        if (editFormData.foodImg) {
            data.append("foodImg", editFormData.foodImg);
        }
    
        try {
            const response = await fetch(`${BASE_URL}/menus/${editingMenuId}`, {
                method: 'PUT',
                body: data,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error('Error updating menu');
            }
            const updatedMenu = await response.json();
            setMenus((prevMenus) => 
                prevMenus.map((menu) =>
                    menu._id === updatedMenu._id ? updatedMenu : menu
                )
            );
            setFilteredMenu((prevMenus) => 
                prevMenus.map((menu) =>
                    menu._id === updatedMenu._id ? updatedMenu : menu
                )
            );
            setEditingMenuId(null);
        } catch (error) {
            console.error('Error submitting menu:', error);
        }
    };

    return (
        <div>
            <label htmlFor="menus-select">View Menu</label>
            <select
                required
                name="menus-select"
                id="menus-select"
                value={selectedDishType}
                onChange={handleChange}
            >
                <option value="">View All</option>
                <option value="APPETIZER">APPETIZER</option>
                <option value="BANH MI">BANH MI</option>
                <option value="SOUPS & SALADS">SOUPS & SALADS</option>
                <option value="MAIN">MAIN</option>
                <option value="ENTREES">ENTREES</option>
                <option value="PHO NOODLE SOUPS">PHO NOODLE SOUPS</option>
                <option value="VIETNAMESE RICE PLATTERS">VIETNAMESE RICE PLATTERS</option>
                <option value="NOODLES">NOODLES</option>
                <option value="V-BOWLS VERMICELLI">V-BOWLS VERMICELLI</option>
                <option value="FRIED RICE">FRIED RICE</option>
                <option value="SIDE">SIDE</option>
                <option value="MAIN">MAIN</option>
                <option value="DRINK">DRINK</option>
                <option value="RED WINE">RED WINE</option>
                <option value="WHITE WINE">WHITE WINE</option>
                <option value="SPARKLING WINE">SPARKLING WINE</option>
                <option value="DOMESTIC BEER">DOMESTIC BEER</option>
                <option value="HOUSE WINE">HOUSE WINE</option>
                <option value="IMPORTED BEER">IMPORTED BEER</option>
                <option value="SAKE">SAKE</option>
                <option value="DESSERT">DESSERT</option>
                <option value="COCKTAIL">COCKTAIL</option>
                <option value="CATERING">CATERING SOUP % ENTREE</option>
            </select>
            <div>
                <h2>Welcome to our Menu!</h2>
                {filterMenu.map(menu => (
                    <div key={menu._id} style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '10px' }}>
                        {editingMenuId === menu._id ? (
                            <>
                                <h2>Edit Menu</h2>
                                <form onSubmit={handleEditSubmit}>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editFormData.name}
                                        onChange={handleFormChange}
                                        placeholder="Name"
                                    /><br />
                                    <textarea
                                        name="description"
                                        value={editFormData.description}
                                        onChange={handleFormChange}
                                        placeholder="Description"
                                        rows="4"
                                        cols="50"
                                    ></textarea><br />
                                    <input
                                        type="number"
                                        name="price"
                                        value={editFormData.price}
                                        onChange={handleFormChange}
                                        placeholder="Price"
                                    /><br />
                                    <label htmlFor="foodImg-input">Food Image</label>
                                    <input
                                        type="file"
                                        name="foodImg"
                                        id="foodImg-input"
                                        onChange={handleFileChange}
                                    /><br />
                                    {imagePreview && (
                                        <img 
                                            src={imagePreview} 
                                            alt=""
                                            style={{ width: '200px', height: 'auto' }} 
                                        />
                                    )}
                                    <button type="submit">Save</button><br />
                                    <button type="button" onClick={() => setEditingMenuId(null)}>
                                        Cancel
                                    </button>
                                </form>
                            </>
                        ) : (
                            <>
                                <h4>{menu.name}</h4>
                                <p>Description: {menu.description}</p>
                                <p>Price: ${menu.price}</p>
                                <img src={`${BASE_URL}${menu.foodImg}`} alt ="" style={{ width: '200px', height: 'auto' }} />
                                <br /><br />
                                Ingredients:
                                <div>
                                    {Array.isArray(menu.ingredients) ? (
                                        menu.ingredients.map((ingredient, index) => (
                                            <p key={index}>{ingredient}</p>
                                        ))
                                    ) : (
                                        <p>No ingredients available</p>
                                    )}
                                </div>
                                <div>
                                    {isAdmin && (
                                        <>
                                            <button onClick={() => handleEditClick(menu)}>
                                                Edit
                                            </button>
                                            <button onClick={() => handleDeleteMenu(menu._id)}>
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewMenu;
