import React, {useContext, useEffect} from 'react';
import {StoreContext} from "../../App";
import {useNavigate} from "react-router";
import "./CustomerListReminderWidget.scss";
import {observer} from "mobx-react";

const CustomerListReminderWidget = observer(() => {
    const customerStore = useContext(StoreContext).customerStore;
    const navigate = useNavigate();

    /**
     * Обновление записи
     * @param id
     */
    const update = (id: number) => {
        navigate((id).toString());
    }
    return (
        <div className="customerListReminderWidget">
            {customerStore.customerListNotificationActive.map(
                ({
                     id,
                     products,
                     contactFace,
                     phone
                 }) => (
                    <div key={id} className="customer" onClick={() => update(id)}>
                        <div className="products">{products}</div>
                        <div className="contactFace">{contactFace}</div>
                        <div className="phone">{phone}</div>
                    </div>


                ))}
        </div>
    );
});

export default CustomerListReminderWidget;