import React, { useState } from "react";
import styles from "./AddEmail.module.scss";
import { ContactViewStore } from "store/ContactViewStore";
import { InputField } from "components/inputField/InputField";
import { InputFieldEnum } from "components/inputField/types";
import { Button } from "components/button/Button";
import { PhoneListType, PhoneTypeListEnum } from "model/types";

interface IAddEmailProps {
    contactViewStore: ContactViewStore;
}


/**
 * @description Добавление телефонов, емейла, адреса
 */
export const AddEmail = ({ contactViewStore }: IAddEmailProps) => {
    const [emailList, setEmailList] = useState<PhoneListType[]>([]);
    const [email, setEmail] = useState("");

    return (
        <div className={styles.addEmail}>
            <InputField value={email}
                        changeHandler={handlerPhoneNumber} name="phoneNumber"
                        type={InputFieldEnum.text}
                        mask={false} />
            <Button text="ADD" onClick={onClickADdPhoneNumber} />

            {emailList.map((phone) => (
                <div key={phone.number}>{phone.typeList}{phone.number}</div>
            ))}
        </div>
    );

    function handlerPhoneNumber(event: React.ChangeEvent<HTMLInputElement>): void {
        setEmail(event.target.value);
    }

    function onClickADdPhoneNumber(): void {
        setEmailList([...emailList, { number: email, typeList: PhoneTypeListEnum.business }]);
        setEmail("");
    }
};
