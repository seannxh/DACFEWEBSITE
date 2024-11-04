const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`;

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        return res.json();
    } catch (err) {
        console.log(err)
    }
}

const Show = async (menuId) => {
    try{
        const res = await fetch(`${BASE_URL}/${menuId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        return res.json();
    }catch(err){
        console.log(err)
    }
}

 const Create = async (menuFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            body: JSON.stringify(menuFormData),
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        });

        return res.json();
    } catch (error) {
        console.log(error)
    }
}
const CreateMenu = async (menuId, menuFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${menuId}/comments`, {
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
      const res = await fetch(`${BASE_URL}/${menuId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

const update = async (menuId, menuFormData)=> {
    try{
        const res = await fetch(`${BASE_URL}/${menuId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(menuFormData)
        })
    }catch(err) {
        console.log(err)
    }
}
export { index, Show, Create, CreateMenu , deleteMenu, update }

