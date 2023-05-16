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

    /**
     * Удаление записи
     * @param id
     * @param organization
     */
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

    /**
     * Обновление записи
     * @param id
     */
    const update = (id: number) => {
        navigate((id).toString());
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
                     reminderDate,
                     activeReminder
                 }) => (
                    <div key={id} className={`customer ${activeReminder ? 'activeReminder' : ''}`}>
                        <div className="companyName">
                            <div className="organization">{organization}</div>
                            <div className="contactFace">{contactFace}</div>
                        </div>
                        <div className="contact">
                            <div className="phone">{phone}</div>
                            <div className="email">{email}</div>
                        </div>
                        <pre className="description">{description}</pre>
                        <div className="rem">
                            <div className="reminder">{Conversation.checkboxBoolToString(reminder)}</div>
                            <div className="reminderDate">{Conversation.dateToStrUTC(reminderDate)}</div>
                        </div>
                        <div className="actionBar">
                            <Button onClick={() => remove(id, organization)}
                                    text="Удалить"
                                    classname="imgBtn delete"/>
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