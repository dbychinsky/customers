import React, { useState } from "react";
import styles from "./AddReminder.module.scss";
import { ContactEditStore } from "store/ContactEditStore";
import { TextAreaField } from "components/textAreaField/TextAreaField";
import { CheckBoxReminder } from "components/checkBoxReminder/CheckBoxReminder";
import { HeadingH2 } from "components/headingH2/headingH2";
import clsx from "clsx";


interface AddReminderProps {
    contactEditStore: ContactEditStore;
}

/**
 * @description Добавление напоминания.
 */
export function AddReminder({ contactEditStore }: AddReminderProps) {
    const [checkBox, setCheckBox] = useState(false);
    const classWrapperAddReminder = clsx(styles.addReminder, { [styles.active]: checkBox });

    return (
        <div className={classWrapperAddReminder}>
            <div className={styles.header}>
                <HeadingH2 title="Напоминание" />
                <CheckBoxReminder id="addReminderCheckbox"
                                  value={checkBox}
                                  changeHandler={handleClick}
                                  name="bell" />
            </div>
            <TextAreaField
                value={contactEditStore.productFields.productComment}
                changeHandler={contactEditStore.handleChangeFieldsProduct}
                name="productComment"
                placeHolder="Комментарий к напоминанию"
                className={styles.fieldArea}
                isDisabled={!checkBox} />
        </div>
    );

    function handleClick() {
        setCheckBox(!checkBox);
    }
}
