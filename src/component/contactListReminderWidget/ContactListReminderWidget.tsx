import React, {useContext} from 'react';
import {StoreContext} from "../../App";
import {useNavigate} from "react-router";

import {observer} from "mobx-react";

const ContactListReminderWidget = observer(() => {
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
        <div className="contactListReminderWidget">
            {contactStore.contactListNotificationActive.map(
                ({
                     id,
                     contactFace,
                     organization
                 }) => (
                    <div key={id} className="contact" onClick={() => update(id)}>
                        <span className="bell"><div className="ring"></div></span>
                        <div className="organization">{organization}</div>
                        <div className="contactFace">{contactFace}</div>
                    </div>


                ))}
        </div>
    );
});

export default ContactListReminderWidget;