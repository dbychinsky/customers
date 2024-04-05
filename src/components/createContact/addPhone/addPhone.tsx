import React, { useState } from "react";
import styles from "./addPhone.module.scss";
import { InputField } from "components/inputField/InputField";
import { InputFieldEnum } from "components/inputField/types";
import { PhoneTypeListEnum } from "model/types";
import { getIconTypeContact } from "utils/getIconTypeContact";
import { ButtonImage } from "components/buttonImage/ButtonImage";
import { ReactComponent as Add } from "../../../common/assets/icon/add.svg";
import { ReactComponent as Mask } from "../../../common/assets/icon/dominoMask.svg";
import { ReactComponent as Delete } from "../../../common/assets/icon/delete.svg";
import { RadioButtonsPhone } from "components/radioButtonsPhone/RadioButtonsPhone";
import clsx from "clsx";
import { HeadingH2 } from "components/headingH2/headingH2";
import { ContactEditStore } from "store/ContactEditStore";
import { observer } from "mobx-react";

interface IAddPhoneProps {
    contactEditStore: ContactEditStore;
}

/**
 * @description Добавление телефонов.
 */
export const AddPhone = observer(({ contactEditStore }: IAddPhoneProps) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isMask, setIsMask] = useState(true);

    const classWrapperIconMask = clsx(styles.iconMask, { [styles.active]: isMask });

    return (
        <div className={styles.addPhone}>
            <HeadingH2 title="Номера телефонов" />
            <div className={styles.contactFields}>
                <InputField value={phoneNumber}
                            changeHandler={handlerPhoneNumber}
                            name="phoneNumber"
                            type={InputFieldEnum.text}
                            mask={isMask}
                            maxLength={20} />
                <ButtonImage onClick={checkStateMask}
                             image={<Mask />}
                             onlyImage={true}
                             className={classWrapperIconMask} />
                <ButtonImage onClick={onClickAddPhoneNumber}
                             image={<Add />}
                             onlyImage={true}
                             className={styles.iconAdd}
                             variant="add"
                             isDisabled={phoneNumber.length === 0} />
                <div className={styles.selectType}>
                    <RadioButtonsPhone
                        state={contactEditStore.phoneType}
                        setState={handleOptionChange} />
                </div>
            </div>
            <div className={styles.contactList}>
                {contactEditStore.phoneList.map((phone) => (
                    <div key={phone.number}>
                        <div className={styles.typeList}>{getIconTypeContact(phone.typeList)}</div>
                        <div className={styles.number}>{phone.number}</div>
                        <div className={styles.iconActions}>
                            <div role="presentation" onClick={() => handleDelete(phone.number)}><Delete /></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    function handlerPhoneNumber(event: React.ChangeEvent<HTMLInputElement>): void {
        setPhoneNumber(event.target.value);
    }

    function onClickAddPhoneNumber(): void {
        contactEditStore.setPhoneList(phoneNumber);
        setPhoneNumber("");
    }

    function handleOptionChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
        if (changeEvent.target.value === PhoneTypeListEnum.business) {
            contactEditStore.setPhoneType(PhoneTypeListEnum.business);
        } else {
            contactEditStore.setPhoneType(PhoneTypeListEnum.personal);
        }
    }

    function checkStateMask() {
        setPhoneNumber("");
        setIsMask(!isMask);
    }

    function handleDelete(number: string) {
        contactEditStore.deleteFromPhoneList(number);
    }
});
