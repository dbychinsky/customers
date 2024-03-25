import React, {useState} from 'react';
import {InputField} from "common/components/inputField/InputField";
import {InputFieldEnum} from "common/components/inputField/types";
import styles from "./Searching.module.scss";

export const Searching = () => {
    const [value, setValue] = useState<string>('');

    function changeHandler() {
        setValue(value);
    }

    return (
        <div className={styles.searching}>
            <InputField value={value}
                        changeHandler={changeHandler}
                        name="Poisk"
                        type={InputFieldEnum.text}
                        className={styles.organization}/>
            <InputField value={value}
                        changeHandler={changeHandler}
                        name="Poisk"
                        type={InputFieldEnum.text}
                        className={styles.contactFace}/>
            <InputField value={value}
                        changeHandler={changeHandler}
                        name="Poisk"
                        type={InputFieldEnum.text}
                        className={styles.phoneList}/>
            <div className={styles.reminder}></div>
        </div>
    );
};
