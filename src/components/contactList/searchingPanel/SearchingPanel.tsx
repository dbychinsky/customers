import React, { ReactElement, useState } from 'react';
import styles from 'components/contactList/searchingPanel/SearchingPanel.module.scss';
import { InputField } from 'components/inputField/InputField';
import { InputFieldEnum } from 'components/inputField/types';
import { ButtonImage } from 'components/buttonImage/ButtonImage';
import { ReactComponent as PersonAdd } from 'common/assets/icon/addContact.svg';
import { ReactComponent as Restart } from 'common/assets/icon/restart.svg';
import { ReactComponent as Mask } from 'common/assets/icon/mask.svg';
import { ReactComponent as NoSorting } from 'common/assets/icon/noSorted.svg';
import { ReactComponent as SortingAZ } from 'common/assets/icon/sortAZ.svg';
import { ReactComponent as SortingZA } from 'common/assets/icon/sortZA.svg';
import { useNavigateHelper } from 'router/hooks/useNavigateHelper';
import { useStores } from 'store/RootStoreContext';
import { observer } from 'mobx-react';
import clsx from 'clsx';

export enum SortEnum {
    NO_SORTED = 'noSorted',
    SORTED_AZ = 'sortedAZ',
    SORTED_ZA = 'sortedZA',
}

export const SearchingPanel = observer(() => {
    const { contactListStore } = useStores();
    const { navigateToCreateContactPage } = useNavigateHelper();
    const [isMask, setIsMask] = useState(true);
    const classWrapperIconMask = clsx(styles.iconMask, { [styles.active]: isMask });
    const [sortState, setSortState] = useState<SortEnum>(SortEnum.NO_SORTED);

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
                    onClick={() => sorting(sortState)}
                    image={getSortingIcon(sortState)}
                    onlyImage={true}
                    variant='sort'
                />
                <ButtonImage
                    onClick={getContactList}
                    image={<Restart />}
                    onlyImage={true}
                    className={styles.buttonAddContact}
                />
                <ButtonImage
                    onClick={onHandleAddContact}
                    image={<PersonAdd />}
                    onlyImage={true}
                    className={styles.buttonAddContact}
                />
            </div>
        </div>
    );

    function getContactList() {
        contactListStore.getContactList();
    }

    function onHandleAddContact() {
        navigateToCreateContactPage();
    }

    function checkStateMask() {
        setIsMask(!isMask);
    }

    function getSortingIcon(type: SortEnum): ReactElement {
        if (type === SortEnum.SORTED_AZ) {
            return <SortingAZ />;
        }
        if (type === SortEnum.SORTED_ZA) {
            return <SortingZA />;
        }

        return <NoSorting />;
    }

    function sorting(state: SortEnum) {
        if (state === SortEnum.SORTED_AZ) {
            setSortState(SortEnum.SORTED_ZA);
        }
        if (state === SortEnum.SORTED_ZA) {
            setSortState(SortEnum.NO_SORTED);
        }
        if (state === SortEnum.NO_SORTED) {
            setSortState(SortEnum.SORTED_AZ);
        }
        contactListStore.handleChangeSortingOrganization(state);
    }
});
