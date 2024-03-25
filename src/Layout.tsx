import React from 'react';
import {Outlet} from "react-router";
import {useStores} from "store/RootStoreContext";
import {Header} from "view/components/Header/Header";
import {Footer} from "view/components/Footer/Footer";

const Layout = () => {
    const {authStore} = useStores();

    return (
        <>
            <Header authStore={authStore}/>
            <Outlet/>
            <Footer authStore={authStore}/>
        </>
    );
};

export default Layout;