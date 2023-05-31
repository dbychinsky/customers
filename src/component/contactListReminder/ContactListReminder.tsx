import React, {useContext} from 'react';
import {StoreContext} from "../../App";
import {observer} from "mobx-react";
import "./ContactListReminder.scss";
import {useNavigate} from "react-router";

const ContactListReminder = observer(() => {
    const contactStore = useContext(StoreContext).contactStore;
    const navigate = useNavigate();

    /**
     * Обновление записи
     * @param id
     */
    const update = (id: number) => {
        navigate((id).toString());
    }

    return (
        <div className="contactListReminder">

            <div className="head">
                <div className="organization">ОРГАНИЗАЦИЯ</div>
                <div className="contactFace">ФИО</div>
                <div className="phone">телефон</div>
                <div className="products">ПРОДУКЦИЯ</div>
                <div className="productsArchive">архив</div>
                <div className="description">ОПИСАНИЕ</div>
            </div>
            <div className="body">
                {contactStore.contactListNotificationActive.map(
                    ({
                         id,
                         organization,
                         contactFace,
                         products,
                         productsArchive,
                         phoneList,
                         email,
                         description
                     }) => (
                        <div key={id} className="contact" onClick={() => update(id)}>
                            <div className="organization">{organization}</div>
                            <div className="contactFace">{contactFace}</div>
                            <div className="phone">
                                {/*{phoneList.map((elem*/}
                                {/*    ) => (<div key={elem}>*/}
                                {/*        <div>{elem}</div>*/}
                                {/*    </div>)*/}
                                {/*)}*/}
                            </div>
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

export default ContactListReminder;