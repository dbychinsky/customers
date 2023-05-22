import React, {useContext, useEffect} from 'react';
import InputTextField from "../inputField/InputField";
import {StoreContext} from "../../App";
import "./Search.scss";
import Label from "../label/Label";
import {observer} from "mobx-react";

const Search = observer(() => {
    const customerStore = useContext(StoreContext).customerStore;

    const sortListName = (fieldName: string) => {
        customerStore.sortCustomerListName(fieldName);
    }

    useEffect(() => {
        customerStore.searchOrgField();
    }, [customerStore.searchOrganization])

    useEffect(() => {
        customerStore.searchContactFaceField();
    }, [customerStore.searchContactFace])

    return (
        <div className="search">

            <div className="headerColumn organization">
                <InputTextField value={customerStore.searchOrganization}
                                changeHandler={customerStore.handleChangeSearchOrganization}
                                name="organization"
                                type="text"
                                placeHolder="..."
                />
                <Label text="Организация"
                       onClick={() => sortListName('organization')}/>
            </div>

            <div className="headerColumn contactFace">
                <InputTextField value={customerStore.searchContactFace}
                                changeHandler={customerStore.handleChangeSearchContactFace}
                                name="contactFace"
                                type="text"
                                placeHolder="..."/>
                <Label text="ФИО"
                       onClick={() => sortListName('contactFace')}/>
            </div>

            <div className="headerColumn products">

                <Label text="Продукция"/>
            </div>

            <div className="headerColumn contacts">

                <Label text="Контакты"/>
            </div>

            <div className="headerColumn description">
                <Label text="Описание"/>
            </div>

            <div className="headerColumn reminder">
                <Label text="Дата"/>
            </div>

            <div className="actionBar"></div>
        </div>
    );
});

export default Search;