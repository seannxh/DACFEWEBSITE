import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Show } from "../../services/menuService.js"


const MenuForm = (props) => {
  const { menuId } = useParams();
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    if (menuId) {
      const fetchTrack = async () => {
        try {
          const menuData = await Show(menuId);
          setFormData(menuData);
        } catch (err) {
          console.log(err);
        }
      };
      fetchTrack();
    }
  }, [menuId]);

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (menuId) {
      props.handleUpdateTrack(menuId, formData);
    } else {
      props.handleAddTrack(formData);
    }
  };

    return(
        <main>
            <form onSubmit={handleSubmit}>
            <h1>{menuId ? 'Edit Menu' : 'New Menu'}</h1>
                <label htmlFor="type-input">Type</label>
                <input 
                    required
                    type="text"
                    name="type"
                    id="type-input"
                    value={formData.type}
                    onChange={handleChange}                    
                />
                <label htmlFor="name-input">Artist</label>
                <input 
                    required
                    type="text"
                    name="name"
                    id="name-input"
                    value={formData.name} 
                    onChange={handleChange}                    
                />
                <label htmlFor="description-input">Description</label>
                <input 
                    required
                    type="text"
                    name="description"
                    id="description-input"
                    value={formData.description} 
                    onChange={handleChange}                    
                />
                <label htmlFor="price-input">Price</label>
                <input 
                    required
                    type="Number"
                    name="price"
                    id="price-input"
                    value={formData.price} 
                    onChange={handleChange}                    
                />
                <button type="submit">Submit</button>
            </form>
        </main>
    )
};

export default MenuForm;
