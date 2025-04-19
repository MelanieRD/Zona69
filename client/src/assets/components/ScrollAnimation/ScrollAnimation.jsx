import { useEffect, useRef, useState } from "react";
import "./ScrollAnimation.css";

export const ScrollAnimation = ({ children, direction = "up", delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                }
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [delay]);

    return (
        <div
            ref={elementRef}
            className={`scroll-animation-container ${isVisible ? "visible" : ""} ${direction}`}
        >
            {children}
        </div>
    );
}; 