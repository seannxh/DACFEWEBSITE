const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}`;

const index = async () => {
    try {
        const res = await fetch(`${BASE_URL}/menus`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        return res.json();
    } catch (err) {
        console.log(err)
    }
}

const Show = async (menuId) => {
    try{
        const res = await fetch(`${BASE_URL}/menus/${menuId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        return res.json();
    }catch(err){
        console.log(err)
    }
}

const Create = async (menuFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/menus`, {  // Post to BASE_URL directly
            method: 'POST',
            body: menuFormData,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
                // Do NOT set 'Content-Type' here; fetch will automatically set it for FormData
            },
        });

        if (!res.ok) throw new Error("Failed to create menu");

        return await res.json();
    } catch (error) {
        console.log("Error in Create:", error);
    }
};

const CreateSuggestions = async (menuId, menuFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/menus/${menuId}/suggestions`, {
            method: 'POST',
            body: JSON.stringify(menuFormData),
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        });
        console.log(res)
        return res.json();
    } catch (error) {
        console.log(error)
    }
}

const deleteMenu = async (menuId) => {
    try {
      const res = await fetch(`${BASE_URL}/menus/${menuId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const json = await res.json();
      return json
    } catch (error) {
      console.log(error);
    }
  };

const update = async (menuId, menuFormData)=> {
    try{
        const res = await fetch(`${BASE_URL}/menus/${menuId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(menuFormData)
        })
        const json = await res.json();
        return json
    }catch(err) {
        console.log(err)
    }
}
export { index, Show, Create, CreateSuggestions , deleteMenu, update }

