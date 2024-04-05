import React from "react";
import styles from "./AddNameContact.module.scss";
import { HeadingH2 } from "components/headingH2/headingH2";
import { ContactEditStore } from "store/ContactEditStore";
import { InputField } from "components/inputField/InputField";
import { InputFieldEnum } from "components/inputField/types";
import { observer } from "mobx-react";

interface IAddNameContactProps {
    contactEditStore: ContactEditStore;
}

/**
 * @description Добавление Организации, контактного лица.
 */
export const AddNameContact = observer(({ contactEditStore }: IAddNameContactProps) => {
    return (
        <div className={styles.addNameContact}>
            <HeadingH2 title="Организация, контактное лицо" />
            <InputField value={contactEditStore.contact.organization}                // changeHandler={(value) => addOrganization(value)}
                        changeHandler={contactEditStore.handleChangeField}
                        name="organization"
                        type={InputFieldEnum.text}
                        mask={false} />
        </div>
    );
});
