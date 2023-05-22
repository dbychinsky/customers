import React, {useContext} from 'react';
import {StoreContext} from "../../App";
import {Conversation} from "../../utility/Conversation";
import {observer} from "mobx-react";
import "./CustomerListReminder.scss";
import {useNavigate} from "react-router";
import H3 from "../header/H3";

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

            <div className="head">
                <div className="organization">ОРГАНИЗАЦИЯ</div>
                <div className="contactFace">ФИО</div>
                <div className="products">ПРОДУКЦИЯ</div>
                <div className="productsArchive">архив</div>
                <div className="phone">телефон</div>
                <div className="email">email</div>
                <div className="description">ОПИСАНИЕ</div>
                <div className="reminderDate">ДАТА</div>
            </div>
            <div className="body">
                {customerStore.customerListNotificationActive.map(
                    ({
                         id,
                         organization,
                         contactFace,
                         products,
                         productsArchive,
                         phone,
                         email,
                         description,
                         reminder,
                         reminderDate
                     }) => (
                        <div key={id} className="customer" onClick={() => update(id)}>
                            <div className="organization">{organization}</div>
                            <div className="contactFace">{contactFace}</div>
                            <div className="products">
                                {products.map((
                                        {id, name}
                                    ) => (<div key={id}>
                                        <div>{name}</div>
                                    </div>)
                                )}
                            </div>
                            <div className="productsArchive">
                                {productsArchive.map((
                                        {id, name}
                                    ) => (<div key={id}>
                                        <div>{name}</div>
                                    </div>)
                                )}
                            </div>
                            <div className="phone">{phone}</div>
                            <div className="email">{email}</div>
                            <div className="description">{description}</div>
                            <div className="reminderDate">{Conversation.dateToStrUTC(reminderDate)}</div>
                        </div>


                    ))}
            </div>
        </div>
    );
});

export default CustomerListReminder;