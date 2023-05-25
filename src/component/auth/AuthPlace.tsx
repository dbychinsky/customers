import React from 'react';
import "./AuthPlace.scss";
import {observer} from "mobx-react";

const AuthPlace = observer(() => {

    return (
        <div className="authPlace">
            <div className="info">
                <div>Sofi</div>
                <div className="avatar"></div>
            </div>
        </div>
    );
});

export default AuthPlace;