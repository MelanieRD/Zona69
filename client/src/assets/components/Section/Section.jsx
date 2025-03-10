import { Product } from "../Product/Product";
import "./section.css";


export const Section = () =>{

    return (
        <div className="section-container">
            <div className="section-info">
                <p>69 formas de llegar al cielo</p>
            </div>


            <div className="section-content">
                <p>Para ellas</p>
                
                <div className="products-section-container">
                <img src="/client/public/img/products/product_purple.jpg" alt=""/>
                <Product productName={"Pitufino"} imgSrc={"/img/products/product_blue.png"}/>
                <Product productName={"Rosa"} imgSrc={"/img/products/product_pink.png"}/>
                <Product productName={"Purpulito"} imgSrc={"/img/products/product_purple.png"}/>
         
                </div>
                
                
            </div>

            <div className="section-delivery-info">
                <p>Envios nacionales</p>
            </div>
        </div>
    );
}