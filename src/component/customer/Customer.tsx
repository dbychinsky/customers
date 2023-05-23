import React, {useContext} from 'react';
import {StoreContext} from "../../App";
import {Conversation} from "../../utility/Conversation";
import {observer} from "mobx-react";
import "./Customer.scss";
import {Button} from "../button/Button";
import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import "../reactConfirmAlert/ReactConfirmAlert.scss";
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
     * @param organization
     * @param contactFace
     */
    const remove = (id: number, organization: string, contactFace: string) => {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div className='custom-ui'>
                        <h1 className="head">Удалить контакт?</h1>
                        <div className="body">
                            <div className="bodyHead">Вы собираетесь удалить:</div>
                            <div className="bodyContent">организация - <span>{organization}</span></div>
                            <div className="bodyContent">фио - <span>{contactFace}</span></div>
                        </div>
                        <div className="foot">

                            <Button onClick={onClose} text="Отмена"/>
                            <Button onClick={() => {
                                customerStore.remove(id);
                                onClose();
                            }} autoFocus={true}
                                    text="Удалить"
                                    classname="deleteAction"/>
                        </div>
                    </div>
                );
            }
        });
    };

    /**
     *
     */
    const moreViewInformation = (id: string) => {
        const element = document.getElementById(id);
        if (element !== null) {
            element.classList.toggle('more');
        }
    }
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
                     productsArchive,
                     contactFace,
                     organization,
                     phone,
                     email,
                     description,
                     reminder,
                     reminderDate
                 }) => (
                    <div key={id} id={id.toString()} className="customer">
                        {id
                            ? <>
                                <div className="organization">{organization}</div>
                                <div className="contactFace">{contactFace}</div>
                                <div className="contacts">
                                    <div className="phone">{phone}</div>
                                    <div className="email">{email}</div>
                                </div>
                                <div className="products">
                                    {products.map((elem
                                        ) => (<div key={elem}>
                                            <div>{elem}</div>
                                        </div>)
                                    )}
                                </div>
                                <pre className="description">{description}</pre>


                                <div className={`reminder ${Conversation.checkboxBoolToString(reminder)}`}>
                                    <div className="icon">
                                        <span>{Conversation.checkboxBoolToString(reminder)}</span>
                                    </div>
                                    <div className="reminderDate">
                                        {/*{Conversation.dateToStrUTC(reminderDate)}</div>*/}
                                        {Conversation.dateToStrUTC(reminderDate)}</div>
                                </div>

                                <div className="actionBar">

                                    <Button onClick={() => moreViewInformation(id.toString())}
                                            text="Подробнее"
                                            classname={'imgBtn eye'}
                                            title="Подробнее"/>
                                    <Button onClick={() => update(id)}
                                            text="Редактировать"
                                            classname={'imgBtn edit'}
                                            title="Редактировать"/>
                                    <Button onClick={() => remove(id, organization, contactFace)}
                                            text="Удалить"
                                            classname="imgBtn delete"/>
                                </div>

                                <div className="archiveProductList">
                                    {productsArchive.map((elem
                                        ) => (<div key={elem}>
                                            <div>{elem}</div>
                                        </div>)
                                    )}
                                </div>
                            </>
                            : <FeedbackMessage message="Отсутствуют данные либо подключение к серверу"/>}
                    </div>
                ))}
        </>
    );
});

export default Customer;