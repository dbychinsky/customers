import React from 'react';
import "./Header.scss";
import AuthPlace from "../auth/AuthPlace";
import {observer} from "mobx-react";
import H3 from "./H3";

interface IHeader {
    title?: string;
}

const Header = observer(({title}: IHeader) => {
    return (
        <div className="header">
            <div className="title">
                <H3 text={title ? title : ''}/>
            </div>
            <AuthPlace/>
        </div>
    );
});

export default Header;