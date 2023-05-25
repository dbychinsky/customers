import React, {useContext, useEffect} from 'react';
import InputTextField from "../inputField/InputField";
import {StoreContext} from "../../App";
import "./Search.scss";
import Label from "../label/Label";
import {observer} from "mobx-react";
import CheckboxField from "../checkboxField/CheckboxField";

const Search = observer(() => {
    const contactStore = useContext(StoreContext).contactStore;

    const sortListName = (fieldName: string) => {
        contactStore.sortContactListName(fieldName);
    }

    useEffect(() => {
        contactStore.searchOrgField();
    }, [contactStore.searchOrganization])

    useEffect(() => {
        contactStore.searchContactFaceField();
    }, [contactStore.searchContactFace])

    useEffect(() => {
        contactStore.searchProductField();
    }, [contactStore.searchProduct])

    useEffect(() => {
        contactStore.searchPhoneField();
    }, [contactStore.searchPhone])

    return (
        <div className="search">

            <div className="headerColumn organization">
                <InputTextField value={contactStore.searchOrganization}
                                changeHandler={contactStore.handleChangeSearchOrganization}
                                name="organization"
                                type="text"
                                placeHolder="..."
                />
                <Label text="Организация"
                       onClick={() => sortListName('organization')}/>
            </div>

            <div className="headerColumn contactFace">
                <InputTextField value={contactStore.searchContactFace}
                                changeHandler={contactStore.handleChangeSearchContactFace}
                                name="contactFace"
                                type="text"
                                placeHolder="..."/>
                <Label text="ФИО"
                       onClick={() => sortListName('contactFace')}/>
            </div>

            <div className="headerColumn contacts">
                <InputTextField value={contactStore.searchPhone}
                                changeHandler={contactStore.handleChangeSearchPhone}
                                name="phone"
                                type="text"
                                placeHolder="..."/>
                <Label text="Контакты"/>
            </div>

            <div className="headerColumn products">
                <InputTextField value={contactStore.searchProduct}
                                changeHandler={contactStore.handleChangeSearchProduct}
                                name="products"
                                type="text"
                                placeHolder="..."/>
                <Label text="Продукция"/>
            </div>

            <div className="headerColumn description">
                <Label text="Описание"/>
            </div>

            <div className="headerColumn reminder">
                <Label text="Дата"/>
            </div>

            <div className="actionBar"></div>

            <div className="viewSortData">
                <CheckboxField id="viewCustomer"
                               name="viewCustomer"
                               value={contactStore.customer}
                               changeHandler={contactStore.handleChangeCheckboxFilterCustomer}
                               text="Заказчики"
                               className="viewCustomer"/>

                <CheckboxField id="viewClient"
                               name="viewClient"
                               value={contactStore.client}
                               changeHandler={contactStore.handleChangeCheckboxFilterClient}
                               text="Потенциальные заказчики"
                               className="viewClient"/>
            </div>
        </div>
    );
});

export default Search;