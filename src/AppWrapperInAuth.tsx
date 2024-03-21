import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react";
import {RoutersProject} from "router/RouterList";

const AppWrapperInAuth = observer(() => {
    const [isScrolling, setIsScrolling] = useState<boolean>(false)
    /**
     * @description Отслеживание положения скролла
     */
    const handleScroll = () => {
        const scrollPositionLocal = window.scrollY; // => scroll position
        if (scrollPositionLocal > 0) {
            setIsScrolling(true);
        } else {
            setIsScrolling(false);
        }
    }

    useEffect(() => {
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <RoutersProject/>
    );
});

export default AppWrapperInAuth;
