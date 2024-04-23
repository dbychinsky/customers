import React from 'react';
import { Contact } from 'model/Contact';
import styles from 'components/contacts/Contacts.module.scss';
import { NoRecords } from 'components/noRecords/NoRecords';
import { ReactComponent as IconMail } from 'common/assets/icon/mail.svg';
import { ReactComponent as IconAddress } from 'common/assets/icon/address.svg';
import { HeadingH2 } from 'components/headingH2/headingH2';
import { Description } from 'components/description/Description';
import 'react-toastify/dist/ReactToastify.css';
import { copyToClipboard } from 'utils/copyToClipboard';
import { Flip, toast, ToastContainer } from 'react-toastify';
import clsx from 'clsx';
import { getIconTypeContact } from 'utils/getIconTypeContact';

interface PhoneListProps {
    activeContact: Contact;
    className?: string;
}

/**
 * @description Компонент отображения списка телефонов.
 */
export function Contacts({ activeContact, className }: PhoneListProps) {
    const classWrapperPhoneList = clsx(styles.phoneList, className);

    return (
        <div className={classWrapperPhoneList}>
            <div className={styles.contacts}>
                <HeadingH2 title='Контакты' />
                {activeContact?.phoneList.length || activeContact?.emailList.length || activeContact?.address.length ? (
                    <>
                        {activeContact?.phoneList.map((phone) => (
                            <div
                                key={phone.number}
                                className={styles.number}
                                onClick={() => copyClipboard(phone.number, 'Телефон скопирован')}
                                role='presentation'
                            >
                                <div className={styles.icon}>{getIconTypeContact(phone.typeList)}</div>
                                <div>{phone.number}</div>
                            </div>
                        ))}
                        {activeContact?.emailList.map((email) => (
                            <div
                                key={email.email}
                                className={styles.email}
                                onClick={() => copyClipboard(email.email, 'Email скопирован')}
                                role='presentation'
                            >
                                <div className={styles.icon}>
                                    <IconMail />
                                </div>
                                <div>{email.email}</div>
                            </div>
                        ))}
                        {activeContact.address ? (
                            <div
                                className={styles.address}
                                onClick={() => copyClipboard(activeContact.address, 'Адрес скопирован')}
                                role='presentation'
                            >
                                <div className={styles.icon}>
                                    <IconAddress />
                                </div>
                                <div>{activeContact.address}</div>
                            </div>
                        ) : null}
                    </>
                ) : (
                    <NoRecords text='Контакты отсутствуют' variantFontSize='small' variantAlign='left' />
                )}
            </div>

            <div className={styles.comment}>
                <HeadingH2 title='Комментарий к заказчику' />
                {activeContact?.description.length !== 0 ? (
                    <Description activeContact={activeContact} />
                ) : (
                    <NoRecords text='Комментарий отсутствуют' variantFontSize='small' variantAlign='left' />
                )}
            </div>
            <ToastContainer />
        </div>
    );

    function copyClipboard(value: string, title: string) {
        copyToClipboard(value).then(() =>
            toast.success(title, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                transition: Flip,
            }),
        );
    }
}
