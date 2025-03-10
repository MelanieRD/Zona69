import { Carousel } from "../../components/Carousel/Carousel"
import { Footer } from "../../components/Footer/Footer"
import { Nav } from "../../components/Nav/Nav";
import { Section } from "../../components/Section/Section";
import { VideoLoop } from "../../VideoLoop/VideoLoop";

export const Home = ()=>{


    return (
        <>
        <div className="head">
        <Nav/>
        </div>
        <VideoLoop/>
        
            
            <Section/>
            <Footer/>
        </>
    )
}