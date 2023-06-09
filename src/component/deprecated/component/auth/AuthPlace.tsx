import React from 'react';
import "./AuthPlace.scss";
import {observer} from "mobx-react";

/**
 * Плашка с отображением пользователя
 */
const AuthPlace = observer(() => {

    return (
        <div className="authPlace">
            <div className="info">
                <div className="avatar"></div>
                <div className="userName">Sofi</div>
            </div>
        </div>
    );
});

export default AuthPlace;