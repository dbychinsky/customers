import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react";
import {StoreContext} from "./App";
import {RoutersProject} from "./router/RouterList";
import Navigation from "./component/navigation/Navigation";
import Header from "./component/header/Header";

const AppWrapperInAuth = observer(() => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={`appWrapperAuth ${authStore.isAuth ? 'logIn' : 'logOut'} ${isScrolling ? 'scroll' : ''}`}>
            <Header/>
            <RoutersProject/>
        </div>
    );
});

export default AppWrapperInAuth;
