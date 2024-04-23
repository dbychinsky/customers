import React, { useState } from 'react';
import styles from 'components/contactList/searchingPanel/SearchingPanel.module.scss';
import { InputField } from 'components/inputField/InputField';
import { InputFieldEnum } from 'components/inputField/types';
import { ButtonImage } from 'components/buttonImage/ButtonImage';
import { ReactComponent as PersonAdd } from 'common/assets/icon/addContact.svg';
import { ReactComponent as Mask } from 'common/assets/icon/mask.svg';
import { useNavigateHelper } from 'router/hooks/useNavigateHelper';
import { useStores } from 'store/RootStoreContext';
import { observer } from 'mobx-react';
import clsx from 'clsx';

export const SearchingPanel = observer(() => {
    const { contactListStore } = useStores();
    const { navigateToCreateContactPage } = useNavigateHelper();
    const [isMask, setIsMask] = useState(true);
    const classWrapperIconMask = clsx(styles.iconMask, { [styles.active]: isMask });

    return (
        <div className={styles.searchingPanel}>
            <div className={styles.name}>
                <InputField
                    value={contactListStore.searchOrgFace}
                    changeHandler={contactListStore.handleChangeSearchOrganization}
                    name='searchingOrg'
                    type={InputFieldEnum.text}
                    mask={false}
                    placeHolder='Организация/Контактное лицо'
                />
            </div>
            <div className={styles.phoneListHeader}>
                <InputField
                    value={contactListStore.searchPhoneEmail}
                    changeHandler={contactListStore.handleChangeSearchPhone}
                    name='Poisk'
                    type={InputFieldEnum.text}
                    mask={isMask}
                    placeHolder='Телефон'
                />
                <ButtonImage
                    onClick={checkStateMask}
                    image={<Mask />}
                    onlyImage={true}
                    className={classWrapperIconMask}
                />
            </div>
            <div className={styles.products} />
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

    function onHandleAddContact() {
        navigateToCreateContactPage();
    }

    function checkStateMask() {
        setIsMask(!isMask);
    }
});
