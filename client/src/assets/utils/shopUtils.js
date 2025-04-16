const API_URL = import.meta.env.VITE_API_URL;

export const getListItems = async ()=>{
    try {
        const response =  await fetch(`${API_URL}/app/products/all`);
        if(!response.ok){
            throw new Error('Error al obtener todos los datos ');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getProductsWithLimit = async (skip, limit, filters)=>{
    //console.log(JSON.stringify({ skip, limit, filters}));
    try {
        const response =  await fetch(`${API_URL}/app/products/limit`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ skip, limit, filters})
        });

        if(!response.ok){
            throw new Error('Error al obtener los datos con limite');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
        return [];

    }}

export const getProductById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/app/products/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener los detalles del producto');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product details:', error);
        return null;
    }
};
