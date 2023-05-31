import React, {useContext, useState} from 'react';
import CheckboxField from "../checkboxField/CheckboxField";
import InputTextField from "../inputField/InputField";
import {StoreContext} from "../../App";
import {observer} from "mobx-react";
import {Button} from "../button/Button";
import Label from "../label/Label";
import "./inputPhoneNumber.scss";


const InputPhoneNumber = observer(() => {
    /**
     * Рабочий или личный
     */
    const [typeNumber, setTypeNumber] = useState<boolean>(false);
    const [isViberNumber, setIsViberNumber] = useState<boolean>(false);
    const [isTelegramNumber, setIsTelegramNumber] = useState<boolean>(false);

    const contactStore = useContext(StoreContext).contactStore;

    const addPhone = () => {
        if (typeNumber) {
            contactStore.addToListAtrPhone('work')
        } else {
            contactStore.addToListAtrPhone('personal')
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
                <div className="rowType">
                    <Label text="Персональный/Рабочий"/>
                    <CheckboxField id="typeNumber"
                                   value={typeNumber}
                                   changeHandler={() => setTypeNumber(!typeNumber)}
                                   name="typeNumber"/>
                </div>

                <div className="rowViber">
                    <Label text="Viber"/>
                    <CheckboxField id="isViberNumber"
                                   value={isViberNumber}
                                   changeHandler={() => setIsViberNumber(!isViberNumber)}
                                   name="isViberNumber"/>
                </div>
                <div className="rowTelegram">
                    <Label text="Telegram"/>
                    <CheckboxField id="isTelegramNumber"
                                   value={isTelegramNumber}
                                   changeHandler={() => setIsTelegramNumber(!isTelegramNumber)}
                                   name="isTelegramNumber"/>
                </div>
            </div>
            <div className="actionBar">
                <Button onClick={addPhone} text="Добавить"/>
            </div>
        </div>
    );
});

export default InputPhoneNumber;