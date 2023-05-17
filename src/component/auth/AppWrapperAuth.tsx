import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react";
import {StoreContext} from "../../App";
import {RoutersProject} from "../../router/RouterList";
import Navigation from "../navigation/Navigation";

const AppWrapperAuth = observer(() => {
    const authStore = useContext(StoreContext).authStore;

    const [isScrolling, setIsScrolling] = useState<boolean>(false)
    /**
     * Отслеживание положения скролла
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

    useEffect(() => {
        authStore.checkAuth();
    }, [])

    return (
        <div className={`appWrapperAuth ${authStore.isAuth ? 'logIn' : 'logOut'} ${isScrolling ? 'scroll' : ''}`}>
            <Navigation/>
            <RoutersProject/>
        </div>
    );
});

export default AppWrapperAuth;