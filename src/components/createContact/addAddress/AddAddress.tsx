import React, { useState } from 'react';
import styles from 'components/createContact/addAddress/AddAddress.module.scss';
import { InputField } from 'components/inputField/InputField';
import { InputFieldEnum } from 'components/inputField/types';
import { observer } from 'mobx-react';
import { HeadingH2 } from 'components/headingH2/headingH2';
import { ButtonImage } from 'components/buttonImage/ButtonImage';
import { ReactComponent as Add } from 'common/assets/icon/add.svg';
import { ReactComponent as Delete } from 'common/assets/icon/delete.svg';
import { ContactEditStore } from 'store/ContactEditStore';

interface AddEmailProps {
    contactEditStore: ContactEditStore;
}

/**
 * @description Добавление телефонов, емейла, адреса
 */
export const AddAddress = observer(({ contactEditStore }: AddEmailProps) => {
    const [email, setEmail] = useState('');

    return (
        <div className={styles.addAddress}>
            <HeadingH2 title='Адреса' />
            <div className={styles.contactFields}>
                <InputField
                    value={contactEditStore.contact.address}
                    changeHandler={contactEditStore.handleChangeFieldContact}
                    name='address'
                    type={InputFieldEnum.text}
                    mask={false}
                    maxLength={50}
                    placeHolder='Физический адрес'
                    className={styles.address}
                />
                <InputField
                    value={email}
                    changeHandler={handlerEmail}
                    name='email'
                    type={InputFieldEnum.text}
                    mask={false}
                    maxLength={50}
                    placeHolder='@Email'
                />
                <ButtonImage
                    onClick={onClickAddEmail}
                    image={<Add />}
                    onlyImage={true}
                    className={styles.iconAdd}
                    variant='add'
                    isDisabled={email.length === 0}
                />
            </div>
            <div className={styles.emailList}>
                {contactEditStore.emailList.map((email) => (
                    <div key={email.email}>
                        <div className={styles.email}>{email.email}</div>
                        <div className={styles.iconActions}>
                            <div role='presentation' onClick={() => handleDelete(email.email)}>
                                <Delete />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    function handlerEmail(event: React.ChangeEvent<HTMLInputElement>): void {
        setEmail(event.target.value);
    }

    function onClickAddEmail(): void {
        contactEditStore.setEmailList(email);
        setEmail('');
    }

    function handleDelete(emailProps: string) {
        contactEditStore.deleteFromEmailList(emailProps);
    }
});
