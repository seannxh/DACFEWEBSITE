import React, { useEffect, useState } from 'react';
const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}`;

const ViewMenu = ({ handleDeleteMenu, handleUpdateMenu, isAdmin }) => {
    const [menus, setMenus] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [file, setFile] = useState(null);
    const [editingMenuId, setEditingMenuId] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await fetch(`${BASE_URL}/menus`);
                if (!response.ok) throw new Error("Error fetching menus");

                const menuData = await response.json();
                setMenus(menuData);
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
            setEditingMenuId(null);
        } catch (error) {
            console.error('Error submitting menu:', error);
        }
    };
    return (
        <div>
            <h2>View Menu</h2>

            <h3>Main</h3>
            <ul>
                {menus.filter(menu => menu.dishType === "Main").map(menu => (
                    <li key={menu._id}>
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
                                        <div>
                                            <img src={imagePreview} alt="Food Preview" style={{ width: '200px', height: 'auto' }} />
                                        </div>
                                    )}
                                    <button type="submit">Save</button><br />
                                    <button type="button" onClick={() => setEditingMenuId(null)}>
                                        Cancel
                                    </button>
                                </form>
                            </>
                        ) : (
                            <>
                                <h2>{menu.name}</h2>
                                <p>Description: {menu.description}</p>
                                <p>Price: ${menu.price}</p>
                                <img src={`${BASE_URL}${menu.foodImg}`} alt={menu.name} style={{ width: '100px', height: '100px' }} />
                                <br /><br />
                                Ingredients:
                                <ul>
                                    {Array.isArray(menu.ingredients) ? (
                                        menu.ingredients.map((ingredient, index) => (
                                            <li key={index}>{ingredient}</li>
                                        ))
                                    ) : (
                                        <p>No ingredients available</p>
                                    )}
                                </ul>
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
                    </li>
                ))}
            </ul>

            <h3>Appetizer</h3>
            <ul>
                {menus.filter(menu => menu.dishType === "Appetizer").map(menu => (
                    <li key={menu._id}>
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
                                        <div>
                                            <img src={imagePreview} alt="Food Preview" style={{ width: '200px', height: 'auto' }} />
                                        </div>
                                    )}
                                    <button type="submit">Save</button><br />
                                    <button type="button" onClick={() => setEditingMenuId(null)}>
                                        Cancel
                                    </button>
                                </form>
                            </>
                        ) : (
                            <>
                                <h2>{menu.name}</h2>
                                <p>Description: {menu.description}</p>
                                <p>Price: ${menu.price}</p>
                                <img src={`${BASE_URL}${menu.foodImg}`} alt={menu.name} style={{ width: '100px', height: '100px' }} />
                                <br /><br />
                                Ingredients:
                                <ul>
                                    {Array.isArray(menu.ingredients) ? (
                                        menu.ingredients.map((ingredient, index) => (
                                            <li key={index}>{ingredient}</li>
                                        ))
                                    ) : (
                                        <p>No ingredients available</p>
                                    )}
                                </ul>
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
                    </li>
                ))}
            </ul>

            <h3>Dessert</h3>
            <ul>
                {menus.filter(menu => menu.dishType === "Dessert").map(menu => (
                    <li key={menu._id}>
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
                                        <div>
                                            <img src={imagePreview} alt="Food Preview" style={{ width: '200px', height: 'auto' }} />
                                        </div>
                                    )}
                                    <button type="submit">Save</button><br />
                                    <button type="button" onClick={() => setEditingMenuId(null)}>
                                        Cancel
                                    </button>
                                </form>
                            </>
                        ) : (
                            <>
                                <h2>{menu.name}</h2>
                                <p>Description: {menu.description}</p>
                                <p>Price: ${menu.price}</p>
                                <img src={`${BASE_URL}${menu.foodImg}`} alt={menu.name} style={{ width: '100px', height: '100px' }} />
                                <br /><br />
                                Ingredients:
                                <ul>
                                    {Array.isArray(menu.ingredients) ? (
                                        menu.ingredients.map((ingredient, index) => (
                                            <li key={index}>{ingredient}</li>
                                        ))
                                    ) : (
                                        <p>No ingredients available</p>
                                    )}
                                </ul>
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
                    </li>
                ))}
            </ul>

            <h3>Side</h3>
            <ul>
                {menus.filter(menu => menu.dishType === "Side").map(menu => (
                    <li key={menu._id}>
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
                                        <div>
                                            <img src={imagePreview} alt="Food Preview" style={{ width: '200px', height: 'auto' }} />
                                        </div>
                                    )}
                                    <button type="submit">Save</button><br />
                                    <button type="button" onClick={() => setEditingMenuId(null)}>
                                        Cancel
                                    </button>
                                </form>
                            </>
                        ) : (
                            <>
                                <h2>{menu.name}</h2>
                                <p>Description: {menu.description}</p>
                                <p>Price: ${menu.price}</p>
                                <img src={`${BASE_URL}${menu.foodImg}`} alt={menu.name} style={{ width: '100px', height: '100px' }} />
                                <br /><br />
                                Ingredients:
                                <ul>
                                    {Array.isArray(menu.ingredients) ? (
                                        menu.ingredients.map((ingredient, index) => (
                                            <li key={index}>{ingredient}</li>
                                        ))
                                    ) : (
                                        <p>No ingredients available</p>
                                    )}
                                </ul>
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
                    </li>
                ))}
            </ul>

            <h3>Drink</h3>
            <ul>
                {menus.filter(menu => menu.dishType === "Drink").map(menu => (
                    <li key={menu._id}>
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
                                        <div>
                                            <img src={imagePreview} alt="Food Preview" style={{ width: '200px', height: 'auto' }} />
                                        </div>
                                    )}
                                    <button type="submit">Save</button><br />
                                    <button type="button" onClick={() => setEditingMenuId(null)}>
                                        Cancel
                                    </button>
                                </form>
                            </>
                        ) : (
                            <>
                                <h2>{menu.name}</h2>
                                <p>Description: {menu.description}</p>
                                <p>Price: ${menu.price}</p>
                                <img src={`${BASE_URL}${menu.foodImg}`} alt={menu.name} style={{ width: '100px', height: '100px' }} />
                                <br /><br />
                                Ingredients:
                                <ul>
                                    {Array.isArray(menu.ingredients) ? (
                                        menu.ingredients.map((ingredient, index) => (
                                            <li key={index}>{ingredient}</li>
                                        ))
                                    ) : (
                                        <p>No ingredients available</p>
                                    )}
                                </ul>
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
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewMenu;
