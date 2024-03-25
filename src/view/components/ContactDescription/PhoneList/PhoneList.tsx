import React from 'react';
import {Contact} from "model/Contact";

interface IPhoneListProps {
    activeContact: Contact | undefined;
}

/**
 * @description Компонент отображения списка телефонов.
 */
export const PhoneList = ({activeContact}: IPhoneListProps) => {
    return (
        <div>
            {activeContact ? activeContact.phoneList.map((phone) => (
                <div key={phone.number}>
                    <div>{phone.number} - {phone.typeList}</div>
                </div>
            )) : null}
        </div>
    );
};
