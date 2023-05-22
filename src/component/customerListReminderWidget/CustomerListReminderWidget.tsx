import React, {useContext} from 'react';
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
                     contactFace,
                    organization
                 }) => (
                    <div key={id} className="customer" onClick={() => update(id)}>
                        <div className="organization">{organization}</div>
                        <div className="contactFace">{contactFace}</div>
                    </div>


                ))}
        </div>
    );
});

export default CustomerListReminderWidget;