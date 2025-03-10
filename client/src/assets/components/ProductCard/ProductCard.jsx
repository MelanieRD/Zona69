import "./productCard.css";

export const ProductCard = ({imgSrc, title, desc}) =>{
    

    return (

                <div className="product">
                    <div className="top">
                        {/* <img src="/client/public/img/home/beachsex.jpg" alt="" class="img-product"/> */}
                         <img src={imgSrc} alt="" class="img-product"/> 
                    </div>

                    <div class="bottom">
                        <h3 class="product-name">{title}</h3>
                        <h4 class="product-desc">{desc}</h4>
                    </div>
                </div>

     );

}