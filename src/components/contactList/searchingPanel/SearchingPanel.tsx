import React, { useState } from 'react';
import styles from 'components/contactList/searchingPanel/SearchingPanel.module.scss';
import { InputField } from 'components/inputField/InputField';
import { InputFieldEnum } from 'components/inputField/types';
import { ButtonImage } from 'components/buttonImage/ButtonImage';
import { ReactComponent as PersonAdd } from 'common/assets/icon/addContact.svg';
import { useNavigateHelper } from 'router/hooks/useNavigateHelper';

export function SearchingPanel() {
    const [value, setValue] = useState<string>('');
    const { navigateToCreateContactPage } = useNavigateHelper();

    return (
        <div className={styles.searchingPanel}>
            <div className={styles.name}>
                <InputField
                    value={value}
                    changeHandler={changeHandler}
                    name='Poisk'
                    type={InputFieldEnum.text}
                    mask={false}
                />
            </div>
            <div className={styles.contacts}>
                <InputField
                    value={value}
                    changeHandler={changeHandler}
                    name='Poisk'
                    type={InputFieldEnum.text}
                    mask={false}
                />
            </div>
            <div className={styles.products}>sdsds</div>
            <div className={styles.reminder}>
                <ButtonImage
                    onClick={onHandleAddContact}
                    image={<PersonAdd />}
                    onlyImage={true}
                    className={styles.buttonAddContact}
                />
            </div>
        </div>
    );

    function changeHandler() {
        setValue(value);
    }

    function onHandleAddContact() {
        navigateToCreateContactPage();
    }
}
