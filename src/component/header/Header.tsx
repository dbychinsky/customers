import React from 'react';
import "./Header.scss";
import AuthPlace from "../auth/AuthPlace";
import {observer} from "mobx-react";
import Navigation from "../navigation/Navigation";
import CurrencyRate from "../currencyRate/CurrencyRate";

interface IHeader {
    title?: string;
}

const Header = observer(({title}: IHeader) => {
    return (
        <div className="header">
            <div className="logotype">
                <span>Contact</span>
                <span>Care & Service</span>
            </div>
            <Navigation/>
            <CurrencyRate/>
            <AuthPlace/>
        </div>
    );
});

export default Header;