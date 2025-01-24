import "./shop.css";
import "./shop-products-List.css";
import { Product } from "../../components/Product/Product";
import { useContext, useEffect, useState } from "react";
import { set } from "mongoose";
import { getProductsWithLimit } from "../../utils/shopUtils";
export const Shop = ({dataShop})=>{

    const [productPage, setProductPage] = useState(0); 
    const [productsDataLimited, setProductsDataLimited] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
   
    const productsPerPage = 6;
    const pages = totalProducts/productsPerPage;
    const paginationBottons = [];

    //FILTERS 
    const [filters, setFilters] = useState({});

    

     const colors = [
        {colorCss:"white", colorDatabaseValue:"blanco"},
        {colorCss:"gray", colorDatabaseValue:"gris"},
        {colorCss:"black", colorDatabaseValue:"negro"},
        {colorCss:"red", colorDatabaseValue:"rojo"}, 
        {colorCss:"blue", colorDatabaseValue:"azul"}, 
        {colorCss:"green", colorDatabaseValue:"green"}, 
        {colorCss:"yellow", colorDatabaseValue:"amarillo"}
    ];

    const sizes = [
        {sizeName:"XS", sizeDatabaseValue:"XS"},
        {sizeName:"S", sizeDatabaseValue:"S"},
        {sizeName:"L", sizeDatabaseValue:"L"},
        {sizeName:"XXL", sizeDatabaseValue:"XXL"},
    ];

    const categories = [
        {CategoryName:"Shirts", CategoryDatabaseValue:"Shirts"},
        {CategoryName:"Pants", CategoryDatabaseValue:"Pants"},
        {CategoryName:"Sweet", CategoryDatabaseValue:"Sweet"},
        {CategoryName:"Sour", CategoryDatabaseValue:"Sour"},

    ];

    const handleColorFilter = (value)=> {
        if(value.length > 0){
            const newColorFilter = {...filters, color:value};
            setFilters(newColorFilter);
        } else {
            const { color, ...newFilters } = filters; 
            setFilters(newFilters); 
        }

        setProductPage(0);
    }

    const handleSizeFilter = (value)=> {
        if(value.length > 0){
            const newSizeFilter = {...filters, size:value}
            setFilters(newSizeFilter);
        } else {
            const { Size, ...newFilters } = filters;
            setFilters(newFilters);
        }
        setProductPage(0)
    }

    const handleCategoryFilter = (value)=> {
        if(value.length > 0){
            const newCategoryFilter = {...filters, categoryTags:value}
            setFilters(newCategoryFilter);
        } else {
            const { categoryTags, ...newFilters } = filters;
            setFilters(newFilters);
        }
         setProductPage(0)
    }
    
    




    // GET PRODUCTS WITH LIMIT
    const getLimitNumOfProducts = async ()=> {
        const dataProducts = await getProductsWithLimit(productPage * productsPerPage, productsPerPage, filters );  
        setProductsDataLimited(dataProducts.products);
        setTotalProducts(dataProducts.totalProducts);
    }

    // PAGINATION
    const handleProductPage = (num)=> {
        setProductPage(num);
    }
    const handlePrevProductPage = ()=> {
        if(productPage > 0){
            setProductPage(productPage - 1);
        }
        console.log(productPage);  
    }
    const handleNextProductPage = ()=> {
        if(productPage < pages-1){
            setProductPage(productPage + 1);
        }
        console.log(productPage);
    }

    const handlePagination = () => {
        let counter = 0;

        while(counter <= pages){
            let page = counter; 
            paginationBottons.push(<div className={ counter == productPage ? "navigation-list-btn active" : " navigation-list-btn "} key={counter} onClick={()=>{handleProductPage(page)}}>{counter+1}</div>);
            counter++;
        }
        return paginationBottons;
    };

            // END PRODUCTS PAGINATION //

    useEffect(() => {
        getLimitNumOfProducts();
    }, [productPage, filters]);

return (
    <>
        <div className="shop-container">
            <div className="shop-products-filters">
               
                <h5>colors</h5>
                <div className="section-filter colors-filter">
               
                <div className="color-filter-circle multicolor"  onClick={()=>handleColorFilter("")}></div>
                    {colors.map((color, index) => {
                        return <div key={index} className="color-filter-circle" style={{backgroundColor: color.colorCss}} onClick={()=>handleColorFilter(color.colorDatabaseValue)}></div>
                    })}
                </div>
               
                 <h5>size</h5>
                 <hr />
                 <div className="section-filter size-filter">
                     <h6 onClick={()=>{handleSizeFilter("")}}>All Sizes</h6>
                    {sizes.map((size, index) => {
                        return <h6 key={index} onClick={()=>{handleSizeFilter(size.sizeDatabaseValue)}}>{size.sizeName}</h6>;
                    })}
                    
                 </div>
                 <h5>price</h5>
                 <hr />
                <div className="section-filter">
                    <input type="range" />
                </div>
                <h5>categories</h5>
                <hr />
                <div className="section-filter">

                <h6 onClick={()=>{handleCategoryFilter("")}}>All</h6>

                    {categories.map((category, index) => {
                        return <h6 key={index} onClick={()=>{handleCategoryFilter(category.CategoryDatabaseValue)}}>{category.CategoryName}</h6>;
                    })}
                 
                </div>
                         
            </div>
            <div className="shop-products-list">
                <div className="products-list">  

                    {productsDataLimited.map((product, index) => {
                        return <Product key={index} productName={product.name} productPrice={product.price} productDesc={product.description} imgSrc={product.imgSrc}/>
                    })}   
                 
                </div>
                <div className="navegation-list-products"> 
                    <div className="navigation-list-btn prev" onClick={handlePrevProductPage}>previous</div>
                      {handlePagination()}
                    <div className="navigation-list-btn next" onClick={handleNextProductPage}>next</div>                   
                </div>
            </div>
        
        </div>
    </>
)
};