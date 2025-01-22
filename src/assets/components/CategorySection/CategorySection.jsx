import { Product } from "../Product/Product";
import "./categorySection.css";

export const CategorySection = () => {

    return (
    <div className="categories-container">
        {/* <h2>Best Sellers</h2> */}
        <div className="categories">

            <div className="leftColumn">
            <Product addClass={"bigger"} productName={"Woman"} productDesc={"Woman clothes"} 
            buttonTxt={"Check it out!"} hideHeartIcon={true} imgSrc={"https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg"}/>
         
            <Product productName={"Man"} productDesc={"Men clothes "} 
            buttonTxt={"Check it out!"}  hideHeartIcon={true} imgSrc={"https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/20778408/2024/3/15/6c82bb4b-6605-423a-82d0-967074e16fd61710477304711-RESIST-EYEWEAR-Adults-Green-Lens--Black-Aviator-Sunglass-wit-6.jpg"}/>
            </div>
            
            <div className="rightColumn">
            <Product  productName={"Accesories"} productDesc={"Girl clothes and accesories"} 
            buttonTxt={"Check it out!"}  hideHeartIcon={true} imgSrc={"https://m.media-amazon.com/images/I/51wwVl2r-WL._AC_UY1100_.jpg"}/>
            <Product addClass={"Sun glasses"} productName={"Woman"} productDesc={"Girl clothes and accesories"} 
            buttonTxt={"Check it out!"}  hideHeartIcon={true} imgSrc={"https://static.gisela.com/assets/img/suj-push-up-11231/small/top-bikini-push-up1709720206871602527.jpeg"}/>
          

            </div>
          
           
            

        </div>


        
    </div>)
}