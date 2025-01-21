import { Product } from "../Product/Product";
import "./categorySection.css";

export const CategorySection = () => {

    return (
    <div className="bestseller-container">
        {/* <h2>Best Sellers</h2> */}
        <div className="bestseller">

            <div className="leftColumn">
            <Product addClass={"bigger"} productName={"Woman"} productDesc={"Woman clothes"} 
            buttonTxt={"Check it out!"} hideHeartIcon={true} imgSrc={"https://vivolabs.es/wp-content/uploads/2022/03/perfil-mujer-vivo.png"}/>
         
            <Product productName={"Man"} productDesc={"Men clothes "} 
            buttonTxt={"Check it out!"}  hideHeartIcon={true} imgSrc={"https://media.istockphoto.com/id/1335941248/es/foto/foto-de-un-joven-guapo-de-pie-sobre-un-fondo-gris.jpg?s=612x612&w=0&k=20&c=UK8BGVVCSmHen0sJAgxoZ6sBLrs0ld4TuCwczZZ89AY="}/>
            </div>
            <div className="rightColumn">
            <Product  productName={"Accesories"} productDesc={"Girl clothes and accesories"} 
            buttonTxt={"Check it out!"}  hideHeartIcon={true} imgSrc={"https://westwoodhart.com/cdn/shop/articles/mens-wardrobe-essentials.webp?v=1700459311&width=1456"}/>
            <Product addClass={"Sun glasses"} productName={"Woman"} productDesc={"Girl clothes and accesories"} 
            buttonTxt={"Check it out!"}  hideHeartIcon={true} imgSrc={"https://www.cabionline.com/wp-content/uploads/2023/07/s23-jewelry-2-1.jpg"}/>
          

            </div>
          
           
            

        </div>


        
    </div>)
}