import React from 'react';
import styles from 'components/createContact/addNameContact/AddNameContact.module.scss';
import { HeadingH2 } from 'components/headingH2/headingH2';
import { ContactEditStore } from 'store/ContactEditStore';
import { InputFieldEnum } from 'components/inputField/types';
import { observer } from 'mobx-react';
import { TextAreaField } from 'components/textAreaField/TextAreaField';
import { FormRow } from 'components/formRow/FormRow';

interface AddNameContactProps {
    contactEditStore: ContactEditStore;
}

/**
 * @description Добавление Организации, контактного лица.
 */
export const AddNameContact = observer(({ contactEditStore }: AddNameContactProps) => (
    <div className={styles.addNameContact}>
        <HeadingH2 title='Данные контакта' />
        <div className={styles.content}>
            <FormRow
                inputValue={contactEditStore.contact.organization}
                inputName='organization'
                inputChangeHandler={contactEditStore.handleChangeFieldContact}
                inputType={InputFieldEnum.text}
                placeHolder='Организация'
                errorList={contactEditStore.errorList}
                labelText=''
                className={styles.field}
                mask={false}
            />
            <FormRow
                inputValue={contactEditStore.contact.contactFace}
                inputName='contactFace'
                inputChangeHandler={contactEditStore.handleChangeFieldContact}
                inputType={InputFieldEnum.text}
                placeHolder='Контактное лицо'
                errorList={contactEditStore.errorList}
                labelText=''
                className={styles.field}
                mask={false}
            />
            <TextAreaField
                value={contactEditStore.contact.description}
                changeHandler={contactEditStore.handleChangeFieldContact}
                name='description'
                placeHolder='Комментарий к контакту'
                className={styles.fieldArea}
            />
        </div>
    </div>
));
