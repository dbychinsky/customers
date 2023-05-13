import React, {useContext} from 'react';
import {StoreContext} from "../../../App";
import {Conversation} from "../../../utility/Conversation";
import {observer} from "mobx-react";
import "./Customer.scss";
import {Button} from "../../button/Button";
import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

/**
 * Заказчик
 */
const Customer = observer(() => {
    const customerStore = useContext(StoreContext).customerStore;

    const remove = (id: number, organization: String) => {
        confirmAlert({
            title: `Удалить ${organization}?`,
            message: 'Подтвердите действие',
            buttons: [
                {
                    label: 'Да',
                    onClick: () => customerStore.remove(id)
                },
                {
                    label: 'Нет'
                }
            ]
        });
    };

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
                            <Button onClick={() => remove(id, organization)} text="Удалить"/>
                        </div>
                    </div>

                ))}
        </>
    );
});

export default Customer;