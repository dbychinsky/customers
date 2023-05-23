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
                <div className="phone">телефон</div>
                <div className="products">ПРОДУКЦИЯ</div>
                <div className="productsArchive">архив</div>
                <div className="description">ОПИСАНИЕ</div>
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
                         description
                     }) => (
                        <div key={id} className="customer" onClick={() => update(id)}>
                            <div className="organization">{organization}</div>
                            <div className="contactFace">{contactFace}</div>
                            <div className="phone">{phone}</div>
                            <div className="products">
                                {products.map((elem
                                    ) => (<div key={elem}>
                                        <div>{elem}</div>
                                    </div>)
                                )}
                            </div>
                            <div className="productsArchive">
                                {productsArchive.map((elem
                                    ) => (<div key={elem}>
                                        <div>{elem}</div>
                                    </div>)
                                )}
                            </div>
                            <div className="description">{description}</div>
                        </div>


                    ))}
            </div>
        </div>
    );
});

export default CustomerListReminder;