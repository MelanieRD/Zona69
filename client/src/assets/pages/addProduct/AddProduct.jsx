import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiX } from "react-icons/hi";
import "./addProduct.css";

export const AddProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        imageUrl: "",
        color: "none",
        material: "",
        size: ["One Size"],
        categoryTags: [],
    });

    const availableSizes = ["One Size", "XS", "S", "M", "L"];
    const availableCategories = [
        "Vibradores", "Lubricantes", "Accesorios", "Preservativos",
        "Inflables", "Juguetes", "Realistas", "Dildos", "Baterías",
        "Cremas", "Vaginas", "Masajeadores", "Consumibles"
    ];

    const availableColors = [
        { colorCss: "none", colorDatabaseValue: "none", label: "None" },
        { colorCss: "white", colorDatabaseValue: "blanco", label: "White" },
        { colorCss: "gray", colorDatabaseValue: "gris", label: "Gray" },
        { colorCss: "black", colorDatabaseValue: "negro", label: "Black" },
        { colorCss: "red", colorDatabaseValue: "red", label: "Red" },
        { colorCss: "blue", colorDatabaseValue: "azul", label: "Blue" },
        { colorCss: "green", colorDatabaseValue: "Green", label: "Green" },
        { colorCss: "yellow", colorDatabaseValue: "yellow", label: "Yellow" },
        { colorCss: "brown", colorDatabaseValue: "brown", label: "Brown" },
        { colorCss: "purple", colorDatabaseValue: "Grape", label: "Purple" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSizeChange = (size) => {
        setFormData(prev => {
            let newSizes;
            
            if (size === "One Size") {
                newSizes = ["One Size"];
            } else {
                newSizes = prev.size.includes(size)
                    ? prev.size.filter(s => s !== size)
                    : [...prev.size.filter(s => s !== "One Size"), size];
            }

            console.log("Nuevas tallas seleccionadas:", newSizes);
            return {
                ...prev,
                size: newSizes
            };
        });
    };

    const handleCategoryChange = (category) => {
        setFormData(prev => ({
            ...prev,
            categoryTags: prev.categoryTags.includes(category)
                ? prev.categoryTags.filter(c => c !== category)
                : [...prev.categoryTags, category]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Datos del formulario antes de enviar:", formData);
            
            // Asegurarse de que al menos una talla esté seleccionada
            if (!formData.size || formData.size.length === 0) {
                alert('Por favor, selecciona al menos una talla');
                return;
            }

            // Preparar los datos para enviar
            const dataToSend = {
                ...formData,
                size: formData.size.join(',')
            };

            console.log("Datos a enviar al backend:", dataToSend);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/app/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(dataToSend)
            });

            if (response.ok) {
                navigate('/shop');
            } else {
                const errorData = await response.json();
                console.error("Error del servidor:", errorData);
                alert(errorData.message || 'Error al crear el producto');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al crear el producto');
        }
    };

    const handleClose = () => {
        navigate('/shop');
    };

    const handleModalClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    // Asegurarse de que el estado inicial tenga "One Size" seleccionado
    useEffect(() => {
        if (!formData.size || formData.size.length === 0) {
            setFormData(prev => ({
                ...prev,
                size: ["One Size"]
            }));
        }
    }, []);

    return (
        <div className="modal-overlay" onClick={handleModalClick}>
            <div className="add-product-container">
                <div className="modal-header">
                    <h2>Agregar Nuevo Producto</h2>
                    <button className="close-button" onClick={handleClose}>
                        <HiX size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="add-product-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Nombre del Producto</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Ingresa el nombre del producto"
                            />
                        </div>
                        <div className="form-group">
                            <label>Precio</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Descripción</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            placeholder="Describe el producto"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>URL de la Imagen</label>
                            <input
                                type="url"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                required
                                placeholder="https://ejemplo.com/imagen.jpg"
                            />
                        </div>
                        <div className="form-group">
                            <label>Material</label>
                            <input
                                type="text"
                                name="material"
                                value={formData.material}
                                onChange={handleChange}
                                required
                                placeholder="Ej: Silicona, Metal, etc."
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Color</label>
                        <div className="color-options">
                            {availableColors.map(({ colorCss, colorDatabaseValue, label }) => (
                                <button
                                    key={colorDatabaseValue}
                                    type="button"
                                    className={`color-button ${formData.color === colorDatabaseValue ? 'selected' : ''}`}
                                    style={{ backgroundColor: colorCss === 'none' ? 'transparent' : colorCss }}
                                    onClick={() => setFormData(prev => ({ ...prev, color: colorDatabaseValue }))}
                                    title={label}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Tallas Disponibles</label>
                        <div className="options-container">
                            {availableSizes.map(size => (
                                <button
                                    key={size}
                                    type="button"
                                    className={`option-button ${formData.size.includes(size) ? 'selected' : ''}`}
                                    onClick={() => handleSizeChange(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Categorías</label>
                        <div className="options-container">
                            {availableCategories.map(category => (
                                <button
                                    key={category}
                                    type="button"
                                    className={`option-button ${formData.categoryTags.includes(category) ? 'selected' : ''}`}
                                    onClick={() => handleCategoryChange(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-button">
                            Crear Producto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}; 