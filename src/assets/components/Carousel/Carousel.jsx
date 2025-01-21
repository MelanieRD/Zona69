import { useEffect, useRef, useState } from "react";
import { Button } from "../Button/Button";
import "./carousel.css";
import { use } from "react";

export const Carousel = ({img1, img2, img3}) => {

 const [imageIndex, setImageIndex] = useState(1);
 const carouselCenter = useRef(null); 



 useEffect(() => {
        const carousel = document.querySelector(".carousel");
        const carouselItems = document.querySelectorAll(".carousel-item");
        const carouselCenter = document.querySelector(".carousel-center");
        const carouselInfo = document.querySelector(".carousel-info-container");

        const carouselItemsLength = carouselItems.length;
        console.log(carouselItemsLength);

        
       // carouselCenter.style.transform = `translateX(${carouselPosition * 100})`;

     
    }, [ carouselCenter]);

        


    return (
        <div className="carousel-container">
           <div className="carousel">
           <div className="carousel-center" ref={carouselCenter}>

                <div className="carousel-item">
                    <img src="https://assets.teenvogue.com/photos/608935ccbfd50693032bb974/16:9/w_2560%2Cc_limit/TeenVoguexWisdomKaye_HEADER.jpg" alt="img1" />
                </div>
                <div className="carousel-item">
                    <img src="https://www.mrporter.com/content/images/cms/ycm/resource/blob/5077082/f136193ea5385582166b75913470cc6a/openerv2-jpg-data.jpg/w800_q80.jpg" alt="img2" />
                </div>
                <div className="carousel-item">
                    <img src="https://www.advantour.com/img/kazakhstan/culture/kazakh-clothes.jpg" alt="img3" />

                </div>
            </div>
           </div>
           
           < div className="carousel-info-container">
        
            <h2>Los mejores en calidad </h2>
            <p>Nueva linea de productos para blablabla
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam at voluptatibus perferendis. !
            </p>
            <Button text="Shop Now" />

           </div>
        </div>
    )
}