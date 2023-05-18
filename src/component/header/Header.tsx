import React from 'react';
import "./Header.scss";
import AuthPlace from "../auth/AuthPlace";
import {observer} from "mobx-react";
import H4 from "./H4";

interface IHeader {
    title?: string;
}

const Header = observer(({title}: IHeader) => {
    return (
        <div className="header">
            <div className="title">
                <H4 text={title ? title : ''}/>
            </div>
            <AuthPlace/>
        </div>
    );
});

export default Header;