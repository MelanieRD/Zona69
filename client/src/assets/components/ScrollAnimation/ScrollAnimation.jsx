import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

export const ScrollAnimation = ({ children, delay = 0, direction = 'up' }) => {
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    const getTransform = () => {
        switch(direction) {
            case 'up':
                return 'translateY(100px)';
            case 'down':
                return 'translateY(-100px)';
            case 'left':
                return 'translateX(100px)';
            case 'right':
                return 'translateX(-100px)';
            default:
                return 'translateY(100px)';
        }
    };

    const getFinalTransform = () => {
        switch(direction) {
            case 'up':
            case 'down':
                return 'translateY(0)';
            case 'left':
            case 'right':
                return 'translateX(0)';
            default:
                return 'translateY(0)';
        }
    };

    const animation = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? getFinalTransform() : getTransform(),
        config: {
            tension: 100,
            friction: 30,
            mass: 1.5
        },
        delay: delay
    });

    return (
        <animated.div 
            ref={ref} 
            style={{
                ...animation,
                willChange: 'transform, opacity'
            }}
        >
            {children}
        </animated.div>
    );
}; 