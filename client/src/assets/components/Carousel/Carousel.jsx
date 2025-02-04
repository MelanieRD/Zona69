import { useEffect, useRef, useState } from "react";
import "./carousel.css";
import "./img-slider.css"
import { BsCircle, BsCircleFill, BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { Button } from "../Button/Button";

export const Carousel = ({imgsURLS}) => {

 const [imageIndex, setImageIndex] = useState(0);

 useEffect(() => {
   const timer = setTimeout(() => {
        setImageIndex(index => {
            if(index === imgsURLS.length - 1){
                return 0;
            }
            return index + 1;
        })
    }, 15000);

    return () => {
        clearTimeout(timer);
    }   
 }, [imageIndex]);


 function showNextImg () {

    setImageIndex(index => {
        if(index === imgsURLS.length - 1){
            return 0;
        }
        return index + 1;
    })
 }

 function  showPrevImg  ()  {
     setImageIndex(index =>{
         if(index === 0){
             return imgsURLS.length - 1;
         }
         return index - 1;
     })
 }

    



        


    return (
        <div className="carousel-container">
           <div className="carousel">
            <div className="carousel-img-container" style={{translate: `${imageIndex * -100}%`}}>
                {imgsURLS.map(url =>(
                    <img key={url} src={url} className="img-slider"/>
                ))}
            </div>
                
                
                {/* <button onClick={showPrevImg} className="img-slider-btn left-slider-btn"> <BsFillArrowLeftCircleFill/> </button>
                <button onClick={showNextImg} className="img-slider-btn right-slider-btn"> <BsFillArrowRightCircleFill/> </button> */}

                
                
                < div className="carousel-info-container">
                <div className="info">
                    <h2>Los mejores en calidad </h2>
                    <p>Nueva linea de productos para blablabla
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam at voluptatibus perferendis. !
                    </p>
                    <Button text="Shop Now" />  
                      </div>
                </div>  

          
           </div>

           <div className="carousel-middle-buttons">
                    {imgsURLS.map((_, index) => (
                        <button className="dot-button" key={index} onClick={()=>setImageIndex(index)}>
                            {index === imageIndex ?  <BsCircleFill/> : <BsCircle/>}
                        </button>
                    ))}
                </div>
        </div>
    )
}