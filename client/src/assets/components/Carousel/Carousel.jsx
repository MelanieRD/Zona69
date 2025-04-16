import { useEffect, useRef, useState } from "react";
import "./carousel.css";
import "./img-slider.css"
import { BsCircle, BsCircleFill } from "react-icons/bs";
import { Button } from "../Button/Button";
import { FaArrowRight } from "react-icons/fa";

export const Carousel = ({imgsURLS}) => {

 const [imageIndex, setImageIndex] = useState(0);
 const [isReversed, setIsReversed] = useState(false);
 const carouselRef = useRef(null);
 const [isHovered, setIsHovered] = useState(false);

 useEffect(() => {
   if (isHovered) return;

   const timer = setTimeout(() => {
        setImageIndex(index => {
            if (isReversed) {
                if (index === 0) {
                    setIsReversed(false);
                    return 1;
                }
                return index - 1;
            } else {
                if (index === imgsURLS.length - 1) {
                    setIsReversed(true);
                    return index - 1;
                }
                return index + 1;
            }
        })
    }, 5000);

    return () => {
        clearTimeout(timer);
    }   
 }, [imageIndex, isHovered, isReversed, imgsURLS.length]);


 function showNextImg () {

    setImageIndex(index => {
        if (index === imgsURLS.length - 1) {
            setIsReversed(true);
            return index - 1;
        }
        return index + 1;
    })
 }

 function  showPrevImg  ()  {
     setImageIndex(index =>{
         if (index === 0) {
             setIsReversed(false);
             return 1;
         }
         return index - 1;
     })
 }

    



        


    return (
        <div 
            className="carousel-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={carouselRef}
        >
           <div className="carousel">
            <div className="carousel-img-container" style={{transform: `translateX(${imageIndex * -100}%)`}}>
                {imgsURLS.map((url, index) =>(
                    <img 
                        key={url} 
                        src={url} 
                        className="img-slider"
                        alt={`Slide ${index + 1}`}
                        loading={index === 0 ? "eager" : "lazy"}
                    />
                ))}
            </div>
                
                
                <div className="carousel-info-container">
                <div className="info">
                    <h2>Descubre zona 69</h2>
                    <p>
                       69 formas para llegar al cielo, una experiencia celestial para los sentidos. 
                    </p>
                    <div className="carousel-buttons">
                        <Button 
                            variant="primary" 
                            size="large"
                            icon={<FaArrowRight />}
                            iconPosition="right"
                        >
                            Descubrir
                        </Button>
                        <Button 
                            variant="outline" 
                            size="large"
                        >
                            Mas información
                        </Button>
                    </div>
                </div>
                </div>  

          
           </div>

           <div className="carousel-middle-buttons">
                    {imgsURLS.map((_, index) => (
                        <button 
                            key={index} 
                            className={`dot-button ${index === imageIndex ? 'active' : ''}`}
                            onClick={() => {
                                setImageIndex(index);
                                setIsReversed(index < imageIndex);
                            }}
                            aria-label={`Go to slide ${index + 1}`}
                        >
                            {index === imageIndex ?  <BsCircleFill/> : <BsCircle/>}
                        </button>
                    ))}
                </div>
        </div>
    )
}