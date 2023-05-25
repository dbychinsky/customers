import React, {useContext} from 'react';
import {StoreContext} from "../../App";
import {Conversation} from "../../utility/Conversation";
import {observer} from "mobx-react";
import "./Contact.scss";
import {Button} from "../button/Button";
import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import "../reactConfirmAlert/ReactConfirmAlert.scss";
import {useNavigate} from "react-router";
import FeedbackMessage, {FeedbackMessageList} from "../feedbackMessage/FeedbackMessage";

/**
 * контакт
 */
const Contact = observer(() => {
    const contactStore = useContext(StoreContext).contactStore;
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
                        <div className="headerBack"></div>
                        <h1 className="head">Удалить контакт?</h1>
                        <div className="body">
                            <div className="bodyContentOrganization">{organization}</div>
                            <div className="bodyContentContactFace">{contactFace}</div>
                        </div>
                        <div className="foot">

                            <Button onClick={onClose} text="Отмена"/>
                            <Button onClick={() => {
                                contactStore.remove(id);
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
            {contactStore.contactList.map(
                ({
                     id,
                     products,
                     productsArchive,
                     contactFace,
                     organization,
                     phoneList,
                     email,
                     description,
                     reminder,
                     reminderDate
                 }) => (
                    <div key={id} id={id.toString()} className="contact">
                        {id
                            ? <>
                                <div className="organization">{organization}</div>
                                <div className="contactFace">{contactFace}</div>
                                <div className="contacts">
                                    <div className="phone">
                                        {phoneList.map((elem, index
                                            ) => (<div key={index}>
                                                <div>{elem}</div>
                                            </div>)
                                        )}
                                    </div>
                                    <div className="email">{email}</div>
                                </div>

                                <div className="products">
                                    {products.map((elem, index
                                        ) => (<div key={index}>
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
                                    {productsArchive.map((elem, index
                                        ) => (<div key={index}>
                                            <div>{elem}</div>
                                        </div>)
                                    )}
                                </div>
                            </>
                            : <FeedbackMessage message="Отсутствуют данные либо подключение к серверу"
                                               typeMessage={FeedbackMessageList.error}/>}
                    </div>
                ))}
        </>
    );
});

export default Contact;