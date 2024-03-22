import React, {useContext, useEffect} from 'react';
import {StoreContext} from '../../App';
import {observer} from 'mobx-react';
import CheckboxField from '../checkboxField/CheckboxField';
import {InputFieldEnum} from 'components/inputField/types';
import {InputField} from 'components/inputField/InputField';
import {Label} from 'components/label/Label';

const Search = observer(() => {
    const contactStore = useContext(StoreContext).contactStore;

    const sortListName = (fieldName: string) => {
        contactStore.sortContactListName(fieldName);
    }

    useEffect(() => {
        contactStore.searchOrgField();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contactStore.searchOrganization])

    useEffect(() => {
        contactStore.searchContactFaceField();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contactStore.searchContactFace])

    useEffect(() => {
        contactStore.searchProductField();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contactStore.searchProduct])

    useEffect(() => {
        contactStore.searchPhoneField();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contactStore.searchPhone])

    return (
        <div className='search'>

            <div className='headerColumn organization'>
                <InputField value={contactStore.searchOrganization}
                            changeHandler={contactStore.handleChangeSearchOrganization}
                            name='organization'
                            type={InputFieldEnum.text}
                            placeHolder='организация'
                />
                <Label text='Организация'
                    // /*/       onClick={() => sortListName('organization')}
                />
            </div>

            <div className='headerColumn contactFace'>
                <InputField value={contactStore.searchContactFace}
                            changeHandler={contactStore.handleChangeSearchContactFace}
                            name='contactFace'
                            type={InputFieldEnum.text}
                            placeHolder='ФИО'/>
                <Label text='ФИО'
                    // onClick={() => sortListName('contactFace')}
                />
            </div>

            <div className='headerColumn contacts'>
                <InputField value={contactStore.searchPhone}
                            changeHandler={contactStore.handleChangeSearchPhone}
                            name='phone'
                            type={InputFieldEnum.text}
                            placeHolder=''
                            disabled={false}/>
                <Label text='Контакты'/>
            </div>

            <div className='headerColumn products'>
                <InputField value={contactStore.searchProduct}
                            changeHandler={contactStore.handleChangeSearchProduct}
                            name='products'
                            type={InputFieldEnum.text}
                            placeHolder=''/>
                <Label text='Продукция'/>
            </div>

            <div className='headerColumn description'>
                <Label text='Описание'/>
            </div>

            <div className='headerColumn reminder'>
                <Label text='Дата'/>
            </div>

            <div className='actionBar'></div>

            <div className='viewSortData'>
                <CheckboxField id='viewCustomer'
                               name='viewCustomer'
                               value={contactStore.customer}
                               changeHandler={contactStore.handleChangeCheckboxFilterCustomer}
                               text='Заказчики'
                               className='viewCustomer'/>

                <CheckboxField id='viewClient'
                               name='viewClient'
                               value={contactStore.client}
                               changeHandler={contactStore.handleChangeCheckboxFilterClient}
                               text='Потенциальные заказчики'
                               className='viewClient'/>
            </div>
        </div>
    );
});

export default Search;