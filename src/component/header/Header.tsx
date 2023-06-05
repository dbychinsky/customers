import React from 'react';
import "./Header.scss";
import {observer} from "mobx-react";

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
            {/*<Navigation/>*/}
            {/*<CurrencyRate/>*/}
            {/*<AuthPlace/>*/}
        </div>
    );
});

export default Header;