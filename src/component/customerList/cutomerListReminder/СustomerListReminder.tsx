import React, {useContext} from 'react';
import {StoreContext} from "../../../App";

const СustomerListReminder = () => {

    const customerStore = useContext(StoreContext).customerStore;

    return (
        <div className="customerListReminder">

        </div>
    );
};

export default СustomerListReminder;