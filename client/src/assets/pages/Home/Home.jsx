import { CategorySection } from "../../components/CategorySection/CategorySection"
import { Carousel } from "../../components/Carousel/Carousel"
import { Footer } from "../../components/Footer/Footer"

export const Home = ()=>{
    const img1 = "https://img.freepik.com/free-photo/shopping-concept-close-up-portrait-young-beautiful-attractive-redhair-girl-smiling-looking-camera_1258-126800.jpg";
    const img2 = "https://img.freepik.com/free-photo/excited-girl-scream-joy-making-fist-pump-holding-shopping-bag-rejoicing-standing-dress-ove_1258-120529.jpg";
    const img3 = "https://www.shutterstock.com/image-photo/trendy-beautiful-young-asian-woman-260nw-1590685858.jpg";

    const images = [img1, img2, img3];

    return (
        <>
            <Carousel imgsURLS={images}/>
            <CategorySection/>
            <Footer/>
        </>
    )
}