import React from "react";
import { Contact } from "model/Contact";
import { HeadingH2 } from "common/components/headingH2/headingH2";
import styles from "./PhoneList.module.scss";
import { Description } from "view/components/ContactDescription/Description/Description";
import { PhoneTypeListEnum } from "model/types";
import iconCopy from "../../../../common/assets/icon/file_copy.svg";
import iconWork from "../../../../common/assets/icon/work.svg";
import iconHome from "../../../../common/assets/icon/home.svg";
import iconMail from "../../../../common/assets/icon/mail.svg";

interface IPhoneListProps {
    activeContact: Contact | undefined;
}

/**
 * @description Компонент отображения списка телефонов.
 */
export const PhoneList = ({ activeContact }: IPhoneListProps) => {
    const getIcon = (type: string) => {
        if (type === PhoneTypeListEnum.business) {
            return iconWork;
        } else return iconHome;
    };

    return (
        <div className={styles.phoneList}>
            <div className={styles.contacts}>
                <HeadingH2 title="Контакты" icon={iconCopy} />
                {activeContact ? activeContact.phoneList.map((phone) => (
                    <div key={phone.number} className={styles.number}>
                        <div className={styles.icon}>
                            <img src={getIcon(phone.typeList)} alt="icon" />
                        </div>
                        {phone.number}
                    </div>
                )) : null}
                {activeContact?.email ? <div className={styles.email}>
                    <div className={styles.icon}>
                        <img src={iconMail} alt="icon" />
                    </div>
                    {activeContact.email}</div> : null}
            </div>
            <div className={styles.comment}>
                <HeadingH2 title="Комментарий к заказчику" />
                <Description activeContact={activeContact} />
            </div>
        </div>
    );
};
