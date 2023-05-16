import React, {useContext} from 'react';
import {StoreContext} from "../../../App";
import {Conversation} from "../../../utility/Conversation";
import {observer} from "mobx-react";
import "./CustomerListReminder.scss";
import {useNavigate} from "react-router";
import H2 from "../../header/H2";

const CustomerListReminder = observer(() => {

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
        <div className="customerListReminder">
            <H2 text="Список элементов нотификации"/>
            {customerStore.customerListNotificationActive.map(
                ({
                     id,
                     organization,
                     contactFace,
                     phone,
                     description,
                     reminder,
                     reminderDate
                 }) => (
                    <div key={id} className="customer" onClick={() => update(id)}>
                        <div className="organization">{organization}</div>
                        <div className="contactFace">{contactFace}</div>
                        <div className="phone">{phone}</div>
                        <div className="description">{description}</div>
                        <div className="reminder">{Conversation.checkboxBoolToString(reminder)}</div>
                        <div className="reminderDate">{Conversation.dateToStrUTC(reminderDate)}</div>
                    </div>


                ))}
        </div>
    );
});

export default CustomerListReminder;