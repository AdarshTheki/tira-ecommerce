import React, { useState, useEffect, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';

const LazyImage = ({ src, className = '', alt = 'img', ...props }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        if (!src || !imgRef.current) return;

        const imgElement = imgRef.current;
        const observer = new IntersectionObserver(([entry], obs) => {
            if (entry.isIntersecting) {
                imgElement.src = src;
                imgElement.onload = () => setIsLoaded(true);
                obs.unobserve(imgElement);
            }
        });

        observer.observe(imgElement);

        return () => observer.disconnect();
    }, [src]);

    if (!src) {
        return <Skeleton borderRadius='5%' width={'100%'} height={'100%'} />;
    }

    return (
        <img
            ref={imgRef}
            alt={alt}
            {...props}
            className={`lazy-image rounded-xl ${className} ${isLoaded ? 'loaded' : ''}`}
            style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }}
        />
    );
};

export default LazyImage;
