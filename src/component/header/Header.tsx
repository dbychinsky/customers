import React from 'react';
import "./Header.scss";
import AuthPlace from "../auth/AuthPlace";
import {observer} from "mobx-react";
import H4 from "./H4";
import Navigation from "../navigation/Navigation";

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
            {/*<div className="title">*/}
            {/*    <H4 text={title ? title : ''}/>*/}
            {/*</div>*/}
            <Navigation/>
            <AuthPlace/>
        </div>
    );
});

export default Header;