import React from 'react';
import FormRow from "../formRow/FormRow";
import {ActionListType, Field} from "../form/Form";
import {observer} from "mobx-react";

/**
 * Интерфейс формы
 */
interface ICustomFormEditCustomer {
    fieldList: Field[],
    actionList: ActionListType[]
}


const CustomFormEditCustomer = observer(({
                                             fieldList,
                                             actionList
                                         }: ICustomFormEditCustomer) => {
    return (
        <form className="form" onSubmit={(event) => event.preventDefault()}>
            {fieldList.map(({name, label, field}) =>
                <FormRow name={name}
                         label={label}
                         field={field}
                         key={name}
                />
            )}
            {actionList.map(({name, action}) =>
                <div className="actionBar" key={name}>
                    {action}
                </div>
            )}
        </form>
    );
});

export default CustomFormEditCustomer;