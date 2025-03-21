import React, { useEffect, useState } from 'react'
import { getWindowDimensions } from '../utils';

export const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState(getWindowDimensions());

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleResize = () => {
        setScreenSize(getWindowDimensions());
    };

    return screenSize;
}