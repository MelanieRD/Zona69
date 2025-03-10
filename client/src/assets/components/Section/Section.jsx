import { Product } from "../Product/Product";
import { ProductCard } from "../ProductCard/ProductCard";
import "./section.css";
import "./carousel-letters.css";


export const Section = () =>{

    return (
        <div className="section-container">
            <div className="image-section">
                {/* <img src="\img\side-view-woman-bdsm-aesthetics.jpg" alt="" /> */}
            </div>

            <div className="title-section"><h1>69 formas de llegar al cielo</h1>

            </div>
             <div className="products-container">
                
                <ProductCard imgSrc={"/img/close-up-cleaning-sex-toys.jpg"} title={"Vibradores"} desc={"Amplia gama de vibradores de diferentes tama;os y formas"}/>
                <ProductCard imgSrc={"/img/home/bedtoys.jpg"} title={"Accesorios"} desc={"Visita nuestra gama de accesorios"}/>
                <ProductCard imgSrc={"/img/home/expertguides.jpg"}/>
                <ProductCard imgSrc={"/img/high-angle-condoms-wrappers-yellow-background.jpg"}/>
            </div>
            {/* holaa */}

            <div className="image-section2">

            </div>


            <div className="carousel-letters">
                <ul>
                    <li>SEX</li>
                    <li>GAMES</li>
                    <li>PARTY</li>
                    <li>FRIENDS</li>
                    <li>69</li>
                    <li>FUN</li>
                    <li>SEXY</li>
                    <li>LOVE</li>
                    <li>NIGHT</li>
                    <li>HOT</li>
                    <li>WILD</li>
                    <li>PLAY</li>
                    <li>KISS</li>
                    <li>VIBES</li>
                    <li>DANCE</li>
                    <li>FLIRT</li>
                     <li>MOOD</li>
                    <li>DATE</li>
                    <li>HEAT</li>
                    <li>HUGS</li>
                    <li>DESIRE</li>
                    <li>FIRE</li>
                    <li>CRUSH</li>
                    <li>FANTASY</li>
                    <li>ENERGY</li>
                    <li>PASSION</li>
                    <li>RISK</li>
                    <li>SPICY</li>
                    <li>HONEY</li>
                    <li>NIGHTS</li>
                    <li>THRILL</li> 
                </ul>         
            </div>
            
           

      
       
       
       
       
        </div>
    );
}