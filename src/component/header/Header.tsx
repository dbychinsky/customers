import React from 'react';
import "./Header.scss";
import AuthPlace from "../auth/AuthPlace";
import {observer} from "mobx-react";
import Navigation from "../navigation/Navigation";

const Header = observer(() => {
    return (
        <div className="header">
            <div className="logotype">
                <span>Customer</span>
                <span>Care & Service</span>
            </div>
            <Navigation/>
            <AuthPlace/>
        </div>
    );
});

export default Header;