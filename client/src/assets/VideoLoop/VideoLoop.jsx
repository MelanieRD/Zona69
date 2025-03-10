
import "./videoLoop.css";

export const VideoLoop = ()=>{


    return (
    
    <>
        <div className="fullscreen-video-container">
            <div className="fullscreen-video-content">
                <h1>Zona 69</h1>
                
            </div>
            
            <video src="/img/carousel/iaVideo.mp4" loop autoPlay muted></video>
        </div>
    
    </>
    
    );
}