import { CategorySection } from "../../components/CategorySection/CategorySection"
import { Carousel } from "../../components/Carousel/Carousel"
import { Footer } from "../../components/Footer/Footer"
import { Features } from "../../components/Features/Features"
import { Newsletter } from "../../components/Newsletter/Newsletter"
import { Collections } from "../../components/Collections/Collections"
import AboutStore from "../../components/AboutStore/AboutStore"
import { ScrollAnimation } from "../../components/ScrollAnimation/ScrollAnimation"
import { AgeVerification } from "../../components/AgeVerification/AgeVerification"
import "./home.css"
//changed al readyy

export const Home = ()=>{
    const carouselImages = [
        "/images/carousel/girl3.jpg",
        "/images/carousel/girl7.png",
        "/images/carousel/girl2.jpg",
        "/images/carousel/girl8.png",
       "/images/carousel/girl1.jpg",
       
      
    
     /*   "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1585487000128-7c0044e295dc?q=80&w=1000&auto=format&fit=crop"*/
    ];

    const handleNewsletterSubmit = (email) => {
        // Here you can implement your newsletter subscription logic
        console.log("Newsletter subscription:", email);
    };

    return (
        <main className="home-page">
            <AgeVerification />
            <section className="hero-section">
                <Carousel imgsURLS={carouselImages}/>
            </section>

            <ScrollAnimation direction="up">
                <AboutStore />
            </ScrollAnimation>

            <ScrollAnimation direction="right" delay={200}>
                <Features />
            </ScrollAnimation>

            <ScrollAnimation direction="left" delay={400}>
                <section className="categories-section">
                    <CategorySection/>
                </section>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={600}>
                <Collections />
            </ScrollAnimation>

            <ScrollAnimation direction="down" delay={800}>
                <Newsletter onSubmit={handleNewsletterSubmit} />
            </ScrollAnimation>

            <Footer/>
        </main>
    )
}