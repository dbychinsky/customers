import React, {useContext, useState} from 'react';
import InputTextField from "../inputField/InputField";
import {StoreContext} from "../../App";
import {observer} from "mobx-react";
import {Button} from "../button/Button";
import "./inputPhoneNumber.scss";
import CheckboxNormal from "../checkboxNormal/CheckboxNormal";

/**
 * Кастомный компонент для телефона
 */
const InputPhoneNumber = observer(() => {

    const [isPersonalNumber, setIsPersonalNumber] = useState<boolean>(false);
    const [isWorkNumber, setIsWorkNumber] = useState<boolean>(true);
    const [isViberNumber, setIsViberNumber] = useState<boolean>(false);
    const [isTelegramNumber, setIsTelegramNumber] = useState<boolean>(false);

    const contactStore = useContext(StoreContext).contactStore;

    const addPhone = () => {
        if (isPersonalNumber) {
            contactStore.addToListAtrPhone('personal')
        }

        if (isWorkNumber) {
            contactStore.addToListAtrPhone('work')
        }

        if (isViberNumber) {
            contactStore.addToListAtrPhone('viber')
        }

        if (isTelegramNumber) {
            contactStore.addToListAtrPhone('telegram')
        }

        contactStore.addPhoneInList();
    }

    return (
        <div className="inputPhoneNumber">

            <InputTextField value={contactStore.phone}
                            changeHandler={contactStore.handleChangePhone}
                            type="text"
                            name="typeNumber"/>
            <div className="rowCheck">

                <div className="columnType">
                    <p>Тип номера</p>
                    <CheckboxNormal id="isWorkNumber"
                                    value={isWorkNumber}
                                    changeHandler={() => {
                                        setIsWorkNumber(!isWorkNumber);
                                        setIsPersonalNumber(!isPersonalNumber)
                                    }}
                                    name="isWorkNumber"
                                    text="Рабочий"/>

                    <CheckboxNormal id="isPersonalNumber"
                                    value={isPersonalNumber}
                                    changeHandler={() => {
                                        setIsPersonalNumber(!isPersonalNumber);
                                        setIsWorkNumber(!isWorkNumber);
                                    }}
                                    name="isPersonalNumber"
                                    text="Личный"/>
                </div>
                <div className="columnMessenger">
                    <p>Доступность в месенджерах</p>
                    <div className="rowViber">
                        <CheckboxNormal id="isViberNumber"
                                        value={isViberNumber}
                                        changeHandler={() => setIsViberNumber(!isViberNumber)}
                                        name="isViberNumber"
                                        text="Viber"/>
                    </div>
                    <div className="rowTelegram">
                        <CheckboxNormal id="isTelegramNumber"
                                        value={isTelegramNumber}
                                        changeHandler={() => setIsTelegramNumber(!isTelegramNumber)}
                                        name="isTelegramNumber"
                                        text="Telegram"/>
                    </div>
                </div>

            </div>
               <div className="actionBar">
                   <Button onClick={addPhone} text="Добавить"/>
               </div>
        </div>
    );
});

export default InputPhoneNumber;