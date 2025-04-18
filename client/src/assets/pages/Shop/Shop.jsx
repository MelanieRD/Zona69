import "./shop.css";
import "./shop-products-List.css";
import { Product } from "../../components/Product/Product";
import { useContext, useEffect, useState } from "react";
import { set } from "mongoose";
import { getProductsWithLimit } from "../../utils/shopUtils";
import { FaFilter, FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AgeVerification } from "../../components/AgeVerification/AgeVerification";

export const Shop = () => {
    const [productPage, setProductPage] = useState(0);
    const [productsDataLimited, setProductsDataLimited] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAgeVerified, setIsAgeVerified] = useState(false);
    const navigate = useNavigate();
   
    const productsPerPage = 6;
    const pages = Math.ceil(totalProducts / productsPerPage);

    const handleProductDeleted = (deletedProductId) => {
        setProductsDataLimited(prevProducts => 
            prevProducts.filter(product => product._id !== deletedProductId)
        );
        setTotalProducts(prev => prev - 1);

        if (productsDataLimited.length === 1 && productPage > 0) {
            setProductPage(prev => prev - 1);
        } else {
            getLimitNumOfProducts();
        }
    };

    // FILTERS 
    const [filters, setFilters] = useState({});

    const colors = [
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

    const sizes = [
        { sizeName: "One Size", sizeDatabaseValue: "one size" },
        { sizeName: "XS", sizeDatabaseValue: "XS" },
        { sizeName: "S", sizeDatabaseValue: "S" },
        { sizeName: "M", sizeDatabaseValue: "M" },
        { sizeName: "L", sizeDatabaseValue: "L" },
        { sizeName: "XXL", sizeDatabaseValue: "XXL" },
    ];

    const categories = [
        { CategoryName: "Vibradores", CategoryDatabaseValue: "Vibrador" },
        { CategoryName: "Lubricantes", CategoryDatabaseValue: "Lubricador" },
        { CategoryName: "Accesorios", CategoryDatabaseValue: "Accesorio" },
        { CategoryName: "Preservativos", CategoryDatabaseValue: "Preservativos" },
        { CategoryName: "Inflables", CategoryDatabaseValue: "Inflable" },
        { CategoryName: "Juguetes", CategoryDatabaseValue: "Juguete" },
        { CategoryName: "Realistas", CategoryDatabaseValue: "Realista" },
        { CategoryName: "Dildos", CategoryDatabaseValue: "Dildo" },
        { CategoryName: "Baterías", CategoryDatabaseValue: "Batería" },
        { CategoryName: "Cremas", CategoryDatabaseValue: "Cremas" },
        { CategoryName: "Vaginas", CategoryDatabaseValue: "Vagina" },
        { CategoryName: "Masajeadores", CategoryDatabaseValue: "Masajeador" },
        { CategoryName: "Consumibles", CategoryDatabaseValue: "Consumible" },
    ];

    const handleColorFilter = (value) => {
        setFilters(prev => {
            if (value) {
                return { ...prev, color: value };
            } else {
                const { color, ...rest } = prev;
                return rest;
            }
        });
        setProductPage(0);
    };

    const handleSizeFilter = (value) => {
        setFilters(prev => {
            if (value) {
                return { ...prev, size: value };
            } else {
                const { size, ...rest } = prev;
                return rest;
            }
        });
        setProductPage(0);
    };

    const handleCategoryFilter = (value) => {
        setFilters(prev => {
            if (value) {
                return { ...prev, categoryTags: value };
            } else {
                const { categoryTags, ...rest } = prev;
                return rest;
            }
        });
        setProductPage(0);
    };

    const getLimitNumOfProducts = async () => {
        setIsLoading(true);
        try {
            const dataProducts = await getProductsWithLimit(
                productPage * productsPerPage,
                productsPerPage,
                filters
            );
            setProductsDataLimited(dataProducts.products);
            setTotalProducts(dataProducts.totalProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
            setProductsDataLimited([]);
            setTotalProducts(0);
        } finally {
            setIsLoading(false);
        }
    };

    const handleProductPage = (num) => {
        setProductPage(num);
    };

    const handlePrevProductPage = () => {
        if (productPage > 0) {
            setProductPage(prev => prev - 1);
        }
    };

    const handleNextProductPage = () => {
        if (productPage < pages - 1) {
            setProductPage(prev => prev + 1);
        }
    };

    useEffect(() => {
        const verified = localStorage.getItem('ageVerified');
        if (verified === 'true') {
            setIsAgeVerified(true);
            getLimitNumOfProducts();
        }
    }, []);

    useEffect(() => {
        if (isAgeVerified) {
            getLimitNumOfProducts();
        }
    }, [productPage, filters, isAgeVerified]);

    useEffect(() => {
        // Verificar si el usuario es administrador
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const user = JSON.parse(userData);
                setIsAdmin(user.role === 'admin' || user.role === 'superadmin');
            } catch (error) {
                console.error('Error parsing user data:', error);
                setIsAdmin(false);
            }
        }
    }, []);

    const handleAddProduct = () => {
        navigate('/product/new');
    };

    // Añadir listener para el evento productsUpdated
    useEffect(() => {
        const handleProductsUpdated = () => {
            getLimitNumOfProducts();
        };

        window.addEventListener('productsUpdated', handleProductsUpdated);

        return () => {
            window.removeEventListener('productsUpdated', handleProductsUpdated);
        };
    }, [productPage, filters]);

    if (!isAgeVerified) {
        return <AgeVerification onVerified={() => setIsAgeVerified(true)} />;
    }

    return (
        <div className="shop-page">
            <div className="shop-header">
                <br />
                <div className="header-actions">
                    <button 
                        className="filter-toggle"
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                        <FaFilter /> Filters
                    </button>

                    {isAdmin && (
                        <button 
                            className="add-product-button"
                            onClick={handleAddProduct}
                        >
                            <FaPlus /> Add Product
                        </button>
                    )}
                </div>
            </div>

            <div className="shop-container">
                <div className={`shop-products-filters ${isFilterOpen ? 'open' : ''}`}>
                    <div className="filter-section">
                        <h5>Colores</h5>
                        <div className="section-filter colors-filter">
                            <div
                                className={`color-filter-circle multicolor ${!filters.color ? 'active' : ''}`}
                                onClick={() => handleColorFilter("")}
                            ></div>
                            {colors.map((color, index) => (
                                <div
                                    key={index}
                                    className={`color-filter-circle ${filters.color === color.colorDatabaseValue ? 'active' : ''}`}
                                    style={{ backgroundColor: color.colorCss }}
                                    onClick={() => handleColorFilter(color.colorDatabaseValue)}
                                    title={color.label}
                                ></div>
                            ))}
                        </div>
                    </div>

                    <div className="filter-section">
                        <h5>Tamaños</h5>
                        <div className="section-filter size-filter">
                            <button
                                className={!filters.size ? 'active' : ''}
                                onClick={() => handleSizeFilter("")}
                            >
                                Todo
                            </button>
                            {sizes.map((size, index) => (
                                <button
                                    key={index}
                                    className={filters.size === size.sizeDatabaseValue ? 'active' : ''}
                                    onClick={() => handleSizeFilter(size.sizeDatabaseValue)}
                                >
                                    {size.sizeName}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="filter-section">
                        <h5>Categorias</h5>
                        <div className="section-filter categories-filter">
                            <button
                                className={!filters.categoryTags ? 'active' : ''}
                                onClick={() => handleCategoryFilter("")}
                            >
                                Todas
                            </button>
                            {categories.map((category, index) => (
                                <button
                                    key={index}
                                    className={filters.categoryTags === category.CategoryDatabaseValue ? 'active' : ''}
                                    onClick={() => handleCategoryFilter(category.CategoryDatabaseValue)}
                                >
                                    {category.CategoryName}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                

                <div className="shop-products-list">
                    {isLoading ? (
                        <div className="loading-spinner">Loading...</div>
                    ) : productsDataLimited.length > 0 ? (
                        <>
                            <div className="products-grid">
                                {productsDataLimited.map((product) => (
                                    <Product
                                        key={product._id}
                                        productName={product.name}
                                        productPrice={product.price}
                                        productDesc={product.description}
                                        imgSrc={product.imageUrl}
                                        id={product._id}
                                        onProductDeleted={handleProductDeleted}
                                    />
                                ))}
                            </div>

                            <div className="pagination">
                                <button
                                    className="pagination-btn prev"
                                    onClick={handlePrevProductPage}
                                    disabled={productPage === 0}
                                >
                                    <FaChevronLeft /> Previous
                                </button>
                                
                                <div className="pagination-numbers">
                                    {Array.from({ length: pages }, (_, i) => (
                                        <button
                                            key={i}
                                            className={`pagination-btn ${productPage === i ? 'active' : ''}`}
                                            onClick={() => handleProductPage(i)}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    className="pagination-btn next"
                                    onClick={handleNextProductPage}
                                    disabled={productPage === pages - 1}
                                >
                                    Next <FaChevronRight />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="no-products">No products found</div>
                    )}
                </div>
            </div>
        </div>
    );
};