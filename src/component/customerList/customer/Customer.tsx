import React, {useContext} from 'react';
import {StoreContext} from "../../../App";
import {Conversation} from "../../../utility/Conversation";
import {observer} from "mobx-react";
import "./Customer.scss";
import {Button} from "../../button/Button";
import 'react-notifications/lib/notifications.css';

/**
 * Заказчик
 */
const Customer = observer(() => {
    const customerStore = useContext(StoreContext).customerStore;

    const remove = (idCustomer: number) => {
        customerStore.remove(idCustomer);
    }

    return (
        <>
            {customerStore.customerList.map(
                ({
                     id,
                     organization,
                     contactFace,
                     phone,
                     description,
                     reminder,
                     reminderDate
                 }) => (
                    <div key={id} className="customer">
                        <div className="organization">{organization}</div>
                        <div className="contactFace">{contactFace}</div>
                        <div className="phone">{phone}</div>
                        <div className="description">{description}</div>
                        <div className="reminder">{Conversation.checkboxBoolToString(reminder)}</div>
                        <div className="reminderDate">{Conversation.dateToStrUTC(reminderDate)}</div>
                        <div className="actionBar">
                            <Button onClick={remove} text="Удалить"/>
                        </div>
                    </div>

                ))}

        </>
    );
});

export default Customer;