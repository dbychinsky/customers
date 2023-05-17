import React from 'react';
import "./Header.scss";
import AuthPlace from "../auth/AuthPlace";
import {observer} from "mobx-react";

const Header = observer(() => {
    return (
        <div className="header">
            <AuthPlace/>
        </div>
    );
});

export default Header;