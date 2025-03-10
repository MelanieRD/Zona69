import "./productCard.css";

export const ProductCard = ({imgSrc}) =>{
    

    return (

                <div className="product">
                    <div className="top">
                        {/* <img src="/client/public/img/home/beachsex.jpg" alt="" class="img-product"/> */}
                         <img src={imgSrc} alt="" class="img-product"/> 
                    </div>

                    <div class="bottom">
                        <h3 class="product-name">Vibradores</h3>
                        <h4 class="product-desc">Explore in-depth analyses of top adult toys, helping you make informed purchasing decisions.</h4>
                    </div>
                </div>

     );

}