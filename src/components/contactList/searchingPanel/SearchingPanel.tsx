import React, { useState } from "react";
import styles from "components/contactList/searchingPanel/SearchingPanel.module.scss";
import { InputField } from "components/inputField/InputField";
import { InputFieldEnum } from "components/inputField/types";
import { ButtonImage } from "components/buttonImage/ButtonImage";

import { ReactComponent as PersonAdd } from "../../../common/assets/icon/person_add.svg";

export const SearchingPanel = () => {
    const [value, setValue] = useState<string>("");

    function changeHandler() {
        setValue(value);
    }

    return (
        <div className={styles.searchingPanel}>
            <div className={styles.name}>
                <InputField value={value}
                            changeHandler={changeHandler}
                            name="Poisk"
                            type={InputFieldEnum.text} />
            </div>
            <div className={styles.contacts}>
                <InputField value={value}
                            changeHandler={changeHandler}
                            name="Poisk"
                            type={InputFieldEnum.text} />
            </div>
            <div className={styles.products}></div>
            <div className={styles.reminder}>
                <ButtonImage onClick={() => {
                }}
                             image={<PersonAdd />}
                             onlyImage={true}
                             className={styles.buttonAddContact} />
            </div>
        </div>
    );
};
