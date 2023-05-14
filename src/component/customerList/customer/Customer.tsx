import React, {useContext} from 'react';
import {StoreContext} from "../../../App";
import {Conversation} from "../../../utility/Conversation";
import {observer} from "mobx-react";
import "./Customer.scss";
import {Button} from "../../button/Button";
import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import {useNavigate} from "react-router";

/**
 * Заказчик
 */
const Customer = observer(() => {
    const customerStore = useContext(StoreContext).customerStore;
    const navigate = useNavigate();

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

    const update = (id: number) => {
        navigate(id);
    }


    return (
        <>
            {customerStore.customerList.map(
                ({
                     id,
                     organization,
                     contactFace,
                     phone,
                     email,
                     description,
                     reminder,
                     reminderDate
                 }) => (
                    <div key={id} className="customer">
                        <div className="organization">{organization}</div>
                        <div className="contactFace">{contactFace}</div>
                        <div className="phone">{phone}</div>
                        <div className="email">{email}</div>
                        <pre className="description">{description}</pre>
                        <div className="reminder">{Conversation.checkboxBoolToString(reminder)}</div>
                        <div className="reminderDate">{Conversation.dateToStrUTC(reminderDate)}</div>
                        <div className="actionBar">
                            <Button onClick={() => remove(id, organization)} text="Удалить"/>
                            <Button onClick={() => update(id)}
                                    text="Редактировать"
                                    classname={'imgBtn edit'}
                                    title="Редактировать"/>
                        </div>
                    </div>
                ))}
        </>
    );
});

export default Customer;