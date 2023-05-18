import React, {useContext} from 'react';
import {StoreContext} from "../../App";
import {Conversation} from "../../utility/Conversation";
import {observer} from "mobx-react";
import "./Customer.scss";
import {Button} from "../button/Button";
import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import {useNavigate} from "react-router";
import FeedbackMessage from "../feedbackMessage/FeedbackMessage";

/**
 * Заказчик
 */
const Customer = observer(() => {
    const customerStore = useContext(StoreContext).customerStore;
    const navigate = useNavigate();

    /**
     * Удаление записи
     * @param id
     * @param products
     */
    const remove = (id: number, products: String) => {
        confirmAlert({
            title: `Удалить ${products}?`,
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
                     products,
                     contactFace,
                     phone,
                     email,
                     description,
                     reminder,
                     reminderDate
                 }) => (
                    <div key={id} className="customer">
                        {id
                            ? <>
                                <div className="products">{products}</div>
                                <div className="contactFace">{contactFace}</div>
                                <div className="phone">{phone}</div>
                                <div className="email">{email}</div>
                                <pre className="description">{description}</pre>
                                <div className="reminder">{Conversation.checkboxBoolToString(reminder)}</div>
                                <div className="reminderDate">{Conversation.dateToStrUTC(reminderDate)}</div>

                                <div className="actionBar">
                                    <Button onClick={() => remove(id, products)}
                                            text="Удалить"
                                            classname="imgBtn delete"/>
                                    <Button onClick={() => update(id)}
                                            text="Редактировать"
                                            classname={'imgBtn edit'}
                                            title="Редактировать"/>
                                </div>
                            </>
                            : <FeedbackMessage message="Отсутствуют данные либо подключение к серверу"/>}
                    </div>
                ))}
        </>
    );
});

export default Customer;