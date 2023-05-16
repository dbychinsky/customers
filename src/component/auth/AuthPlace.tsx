import React, {useContext} from 'react';
import "./AuthPlace.scss";
import {Link} from "react-router-dom";
import {RouterPathList} from "../../router/RouterPathList";
import {StoreContext} from "../../App";

const AuthPlace = () => {

    const authStore = useContext(StoreContext).authStore;

    const exit = () => {
        authStore.clearSessionStorage();
    }

    return (
        <div className="authPlace">
            <div className="info">
                <div>Sofi</div>
                <div className="avatar"></div>
            </div>
            <Link to={RouterPathList.ROOT_PATH}
                  title="exit"
                  onClick={exit}>exit</Link>
        </div>
    );
};

export default AuthPlace;