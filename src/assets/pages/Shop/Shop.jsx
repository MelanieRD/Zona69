import "./shop.css";
import "./shop-products-List.css";
import { Product } from "../../components/Product/Product";
export const Shop = ()=>{
    const colors = [ "black", "white", "gray", "orange", "purple", "pink", "red", "blue", "green", "yellow", "brown", "gold"];
return (
    <>
        <div className="shop-container">
            <div className="shop-products-filters">
               
                <h5>colors</h5>
                <div className="section-filter colors-filter">
                    {colors.map((color, index) => {
                        return <div key={index} className="color-filter-circle" style={{backgroundColor: color}}></div>
                    })}
                </div>
                
                 <h5>size</h5>
                 <hr />
                 <div className="section-filter size-filter">
                     <h6>One size</h6>
                    <h6>XS</h6>
                    <h6>S</h6>
                    <h6>M</h6>
                    <h6>L</h6>
                    <h6>XL</h6>
                 </div>
                 <h5>price</h5>
                 <hr />
                <div className="section-filter">
                    <input type="range" />
                </div>
                <h5>categories</h5>
                <hr />
                <div className="section-filter">
                    <h6>Shirts</h6>
                    <h6>Pants</h6>
                    <h6>Shoes</h6>
                    <h6>Accesories</h6>
                </div>
                
                
            </div>
            <div className="shop-products-list">
                <div className="products-list">
                   
                    <Product productName={"Guantelete de Kratos"} productPrice={"200$"} hideHeartIcon={true}/>
                    <Product/>
                    <Product />
                    <Product/> 
                    <Product />
                    <Product/>

                </div>

                <div className="navegation-list-products"> 
                    <div className="navigation-list-btn prev">previous</div>
                    <div className="navigation-list-btn">1</div>
                    <div className="navigation-list-btn">2</div>
                    <div className="navigation-list-btn">3</div>
                    <div className="navigation-list-btn next">next</div>
                    
                   
                </div>
            </div>
        
        </div>
    </>
)
};